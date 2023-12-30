import random
import itertools
import collections

class Node:
    def __init__(self, puzzle, parent=None, action=None):
        self.puzzle = puzzle
        self.parent = parent
        self.action = action
        if (self.parent != None):
            self.g = parent.g + 1
        else:
            self.g = 0
    @property
    def score(self):
        return (self.g + self.h)

    @property
    def state(self):
        return str(self)

    @property 
    def path(self):
        node, p = self, []
        while node:
            p.append(node)
            node = node.parent
        yield from reversed(p)

    @property
    def solved(self):
        return self.puzzle.solved

    @property
    def actions(self):
        return self.puzzle.actions

    @property
    def h(self):
        return self.puzzle.manhattan

    @property
    def f(self):
        return self.h + self.g

    def __str__(self):
        return str(self.puzzle)

class Solver:

    def __init__(self, start):
        self.start = start

    def astar(self):
        queue = collections.deque([Node(self.start)])
        seen = set()
        seen.add(queue[0].state)
        visited_node = []
        while queue:
            queue = collections.deque(sorted(list(queue), key=lambda node: node.f))
            node = queue.popleft()
            visited_node.append(node)
            if node.solved:
                return visited_node

            for move, action in node.actions:
                child = Node(move(), node, action)

                if child.state not in seen:
                    queue.appendleft(child)
                    seen.add(child.state)
        return None

    def dfs(self, depth_limit, iteration_limit):
        stack = [Node(self.start)]
        seen = set()
        seen.add(stack[0].state)
        iterations = 0

        while stack and iterations < iteration_limit:
            node = stack.pop()
            iterations += 1

            if node.solved:
                return node.path

            if depth_limit != 0:
                if node.g < depth_limit:
                    for move, action in node.actions:
                        child = Node(move(), node, action)

                        if child.state not in seen:
                            stack.append(child)
                            seen.add(child.state)
            else:
                    for move, action in node.actions:
                        child = Node(move(), node, action)

                        if child.state not in seen:
                            stack.append(child)
                            seen.add(child.state)


        return None 
     
    def bfs(self, depth_limit, iteration_limit):
        queue = collections.deque([Node(self.start)])
        seen = set()
        seen.add(queue[0].state)
        iteration = 0
        visited_node = []

        while queue and iteration < iteration_limit:
            node = queue.popleft()
            visited_node.append(node)
            iteration += 1
            if node.solved:
                return visited_node
            
            if node.g < depth_limit:
                for move, action in node.actions:
                        child = Node(move(), node, action)

                        if child.state not in seen:
                            queue.append(child)
                            seen.add(child.state)
        return None


class Puzzle:
    def __init__(self, board):
        self.width = len(board[0])
        self.board = board

    @property
    def solved(self):
        N = self.width * self.width
        return str(self) == ''.join(map(str, range(1,N))) + '0'

    @property 
    def actions(self):
        def create_move(at, to):
            return lambda: self._move(at, to)

        moves = []
        for i, j in itertools.product(range(self.width),
                                      range(self.width)):
            direcs = {'R':(i, j-1),
                      'L':(i, j+1),
                      'D':(i-1, j),
                      'U':(i+1, j)}

            for action, (r, c) in direcs.items():
                if r >= 0 and c >= 0 and r < self.width and c < self.width and \
                   self.board[r][c] == 0:
                    move = create_move((i,j), (r,c)), action
                    moves.append(move)
        return moves

    @property
    def manhattan(self):
        distance = 0
        for i in range(3):
            for j in range(3):
                if self.board[i][j] != 0:
                    x, y = divmod(self.board[i][j]-1, 3)
                    distance += abs(x - i) + abs(y - j)
        return distance

    def isSolvable(self):
        inversions = 0
        flatten_board = [num for row in self.board for num in row if num != 0]

        for i in range(len(flatten_board)):
            for j in range(i + 1, len(flatten_board)):
                if flatten_board[i] > flatten_board[j]:
                    inversions += 1
        return inversions % 2 == 0

    def copy(self):
        board = []
        for row in self.board:
            board.append([x for x in row])
        return Puzzle(board)

    def _move(self, at, to):
        copy = self.copy()
        i, j = at
        r, c = to
        copy.board[i][j], copy.board[r][c] = copy.board[r][c], copy.board[i][j]
        return copy

    def __str__(self):
        return ''.join(map(str, self))

    def __iter__(self):
        for row in self.board:
            yield from row
