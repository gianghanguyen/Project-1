from flask import Flask,request
from flask_cors import CORS
from solver import Puzzle, Solver, Node

app = Flask(__name__)
CORS(app)

def convertInput(raw_input):
    numbers = list(map(int, raw_input))
    for i in range(len(numbers)):
        if numbers[i] == 9:
          numbers[i] = 0
    board = [numbers[i:i+3] for i in range(0, len(numbers), 3)]
    return board


@app.route('/astar-solver', methods=['GET'])
def astar():
    raw_input = request.args.get('pntdata').split(',')
    puzzle = Puzzle(convertInput(raw_input))
    solvable = puzzle.isSolvable()

    if solvable:
        s = Solver(puzzle)
        path = s.solve()
        return ([node.puzzle.board for node in path])
    else:
        return "Unable to solve", 400

@app.route('/dfs-solver', methods=['GET'])
def dfs():
    raw_input = request.args.get('pntdata').split(',')
    puzzle = Puzzle(convertInput(raw_input))
    solvable = puzzle.isSolvable()

    if solvable:
        s = Solver(puzzle)
        depthLimit = int(request.args.get('depth_limit', default=10))
        nodeLimit = int(request.args.get('node_limit', default=10000))

        path = s.dfs(depthLimit, nodeLimit)
        if path != None:
            return ([node.puzzle.board for node in path])
        else: 
            return "Cant find solution with depth " + str(depthLimit)
    else:
        return "Unable to solve", 400

@app.route('/bfs-solver', methods=['GET'])
def bfs():
    raw_input = request.args.get('pntdata').split(',')
    puzzle = Puzzle(convertInput(raw_input))
    solvable = puzzle.isSolvable()

    if solvable:
        s = Solver(puzzle)
        depthLimit = int(request.args.get('depth_limit', default=100))
        nodeLimit = int(request.args.get('node_limit', default=10000))

        path = s.dfs(depthLimit, nodeLimit)
        if path != None:
            return ([node.puzzle.board for node in path])
        else: 
            return "Cant find solution with depth " + str(depthLimit)
    else:
        return "Unable to solve", 400



if __name__ == "__main__":
    app.run(host='0.0.0.0')
