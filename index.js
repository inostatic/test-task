const readline = require('readline-sync')


function getRandomInt(max){
    return Math.floor(Math.random() * Math.floor(max))
}


function createBoard() {
    const width = 6
    const height = 6
    const matrix = []
    for (let i = 0; i < width; i++) {
        let a = []
        for (let j = 0; j < height; j++) {
            a.push(getRandomInt(2))
        }
        matrix.push(a)
    }
    return matrix
}

function check (row, col) {
    if (row) {
        if (row[col]) {
            return row[col]
        }
        return 0
    }
    return 0
}

function pushEl(index_row, num, newBoard) {
    if (!newBoard[index_row]) {
        newBoard.push([num])
    } else {
        newBoard[index_row].push(num)
    }
}

const updateBoard = (board) => {
    const newBoard = []
    board.forEach((row, index_row) => {
        row.forEach((col, index_col) => {
            const count =
                check(row, index_col - 1)
                + check(row, index_col + 1)
                + check(board[index_row - 1], index_col - 1)
                + check(board[index_row - 1], index_col)
                + check(board[index_row - 1], index_col + 1)
                + check(board[index_row + 1], index_col - 1)
                + check(board[index_row + 1], index_col)
                + check(board[index_row + 1], index_col + 1)
            if(col) {
                if (count === 2 || count === 3) {
                    pushEl(index_row, 1, newBoard)
                } else {
                    pushEl(index_row, 0, newBoard)
                }
            } else {
                if (count === 3) {
                    pushEl(index_row, 1, newBoard)
                } else {
                    pushEl(index_row, 0, newBoard)
                }
            }
        })
    })
    return newBoard
}



/*********start**********/

const index = readline.keyInSelect(['file', 'random'], 'Where to get the initial state?')
let board = index === 0 ? require('./params.json')
    : index === 1 ? createBoard()
        : null

console.log('\x1Bc')
if (board) {
    console.log(board)
    setTimeout(function run() {
        console.log('\x1Bc')
        const newBoard = updateBoard(board)
        console.log(newBoard)
        board = newBoard
        setTimeout(run, 1000, board)
    }, 1000)
}
