from flask import Flask,request
from flask_cors import CORS
from solver import Puzzle, Solver, Node
import time

app = Flask(__name__)
CORS(app)

def convertInput(raw_input):
    numbers = list(map(int, raw_input))
    board = [numbers[i:i+3] for i in range(0, len(numbers), 3)]
    return board

def convertOutput(nested_list):
    return [element for sublist in nested_list for element in sublist]

@app.route('/astar-solver', methods=['GET'])
def solve1():
    raw_input = request.args.get('pntdata').split(',')
    puzzle = Puzzle(convertInput(raw_input))
    solvable = puzzle.isSolvable()
    # print('manhattan'+str(puzzle.manhattan))

    if solvable:
        tic=time.perf_counter()
        s = Solver(puzzle)
        path = s.astar()
        toc = time.perf_counter()
        print("Total amount of time in astar-search: {:.9f} second(s)".format(toc - tic))
        return ([convertOutput(node.puzzle.board) for node in path])
    else:
        return "Unable to solve", 400

@app.route('/dfs-solver', methods=['GET'])
def solve2():
    raw_input = request.args.get('pntdata').split(',')
    puzzle = Puzzle(convertInput(raw_input))
    solvable = puzzle.isSolvable()

    if solvable:
        tic=time.perf_counter()
        s = Solver(puzzle)
        depthLimit = int(request.args.get('depth_limit', default=0))
        nodeLimit = int(request.args.get('node_limit', default=1000000))
        dfs_path = s.dfs(depthLimit, nodeLimit)
        toc = time.perf_counter()
        print("Total amount of time in dfs-search: {:.9f} second(s)".format(toc - tic))
        if dfs_path != None:
            return ([convertOutput(node.puzzle.board) for node in dfs_path])
        else: 
            return "Cant find solution with depth " + str(depthLimit)
    else:
        return "Unable to solve", 400


@app.route('/bfs-solver', methods=['GET'])
def solve3():
    raw_input = request.args.get('pntdata').split(',')
    puzzle = Puzzle(convertInput(raw_input))
    solvable = puzzle.isSolvable()

    if solvable:
        tic=time.perf_counter()
        s = Solver(puzzle)
        depthLimit = int(request.args.get('depth_limit', default=0))
        nodeLimit = int(request.args.get('node_limit', default=1000000))
        bfs_path = s.bfs(depthLimit, nodeLimit)
        toc = time.perf_counter()
        print("Total amount of time in bfs-search: {:.9f} second(s)".format(toc - tic))

        if bfs_path != None:
            return ([convertOutput(node.puzzle.board) for node in bfs_path])

        else: 
            return "Cant find solution with depth " + str(depthLimit)
            
    else:
        return "Unable to solve", 400



if __name__ == "__main__":
    app.run(host='0.0.0.0')
