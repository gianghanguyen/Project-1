# import random

# def create_initial_state():
#     # Tạo một danh sách chứa các số từ 1 đến 8 và một giá trị rỗng (0) để biểu diễn ô trống
#     numbers = list(range(1, 9)) + [0]

#     # Trộn ngẫu nhiên danh sách để tạo một trạng thái ban đầu ngẫu nhiên
#     random.shuffle(numbers)

#     # Chia danh sách thành một ma trận 3x3 để biểu diễn trạng thái
#     initial_state = [numbers[i:i+3] for i in range(0, 9, 3)]

#     return initial_state

# # In trạng thái ban đầu
# initial_state = create_initial_state()
# for row in initial_state:
#     print(row)
import random

def generate_random_state():
    goal_state = [[1, 2, 3], [4, 5, 6], [7, 8, 0]]  # Trạng thái sắp xếp mong muốn
    current_state = [row.copy() for row in goal_state]

    # Thực hiện một số lượng bước ngẫu nhiên để tạo ra trạng thái ngẫu nhiên
    for _ in range(100):
        possible_moves = get_possible_moves(current_state)
        move = random.choice(possible_moves)
        current_state = make_move(current_state, move)

    return current_state

def get_possible_moves(state):
    empty_row, empty_col = find_empty_tile(state)
    possible_moves = []

    if empty_row > 0:
        possible_moves.append("up")
    if empty_row < 2:
        possible_moves.append("down")
    if empty_col > 0:
        possible_moves.append("left")
    if empty_col < 2:
        possible_moves.append("right")

    return possible_moves

def find_empty_tile(state):
    for i in range(3):
        for j in range(3):
            if state[i][j] == 0:
                return i, j

def make_move(state, move):
    empty_row, empty_col = find_empty_tile(state)
    new_state = [row.copy() for row in state]

    if move == "up":
        new_state[empty_row][empty_col], new_state[empty_row - 1][empty_col] = (
            new_state[empty_row - 1][empty_col],
            new_state[empty_row][empty_col],
        )
    elif move == "down":
        new_state[empty_row][empty_col], new_state[empty_row + 1][empty_col] = (
            new_state[empty_row + 1][empty_col],
            new_state[empty_row][empty_col],
        )
    elif move == "left":
        new_state[empty_row][empty_col], new_state[empty_row][empty_col - 1] = (
            new_state[empty_row][empty_col - 1],
            new_state[empty_row][empty_col],
        )
    elif move == "right":
        new_state[empty_row][empty_col], new_state[empty_row][empty_col + 1] = (
            new_state[empty_row][empty_col + 1],
            new_state[empty_row][empty_col],
        )

    return new_state

# Sử dụng hàm để tạo trạng thái ban đầu ngẫu nhiên
random_state = generate_random_state()
print(random_state)
