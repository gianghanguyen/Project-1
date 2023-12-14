from flask import Flask,request
from flask_cors import CORS
from solver import Puzzle, Solver, Node
import json

app = Flask(__name__)
CORS(app)

@app.route('/bfs-solver', methods=['GET'])
def home():
    raw_input = request.args.get('pntdata').split(',')
    numbers = list(map(int, raw_input))

    board = [numbers[i:i+3] for i in range(0, len(numbers), 3)]
    puzzle = Puzzle(board)
    s = Solver(puzzle)
    path = s.solve()
    steps = 0
    return ([node.puzzle.board for node in path])


if __name__ == "__main__":
    app.run(host='0.0.0.0')
