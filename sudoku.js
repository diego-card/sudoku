//Criando a tabela 9x9
let sudoku = [];

for (let i = 0; i <= 8; i++) {
    sudoku.push([]);
    for (let j = 0; j <= 8; j++) {
        sudoku[i].push('');
    };
};

//Populando a tabela com números

/*for(let i=0;i<=8;i++){
    for(let j=0;j<=8;j++){
        if (alea <= 2) {
            sudoku[i][j] = entreNove.toString();
        }
    };
};*/
// sudoku[0][0] = '5';
// sudoku[1][0] = '7';
// sudoku[3][5] = '9';
// sudoku[2][1] = '2';
// sudoku[5][4] = '2';
// sudoku[6][1] = '3';
// sudoku[7][6] = '7';
// sudoku[1][6] = '2';
// sudoku[2][8] = '8';


const puzzles = {
    easy: [
        ['5', '', '', '', '7', '', '3', '', ''],
        ['', '7', '', '', '', '2', '', '4', ''],
        ['', '', '', '', '', '8', '6', '9', '5'],
        ['', '', '', '8', '', '9', '', '5', '2'],
        ['', '', '5', '', '', '', '', '', ''],
        ['2', '9', '', '4', '', '', '8', '6', ''],
        ['9', '', '3', '', '6', '', '', '', ''],
        ['', '', '4', '', '8', '', '', '7', ''],
        ['', '', '', '3', '', '', '', '', '1']
    ],
    medium: [
        ['', '', '2', '', '', '', '7', '9', '8'],
        ['', '', '', '', '9', '', '', '', ''],
        ['4', '7', '', '', '', '', '1', '', ''],
        ['', '', '', '', '', '2', '', '5', ''],
        ['', '1', '', '', '', '', '', '', ''],
        ['7', '', '8', '', '', '', '', '', ''],
        ['6', '', '', '7', '', '8', '', '', ''],
        ['2', '', '', '9', '', '', '', '', ''],
        ['', '', '', '', '', '5', '3', '1', '']
    ],
    hard: [
        ['8', '', '', '', '', '5', '', '', ''],
        ['', '', '6', '9', '', '', '', '', ''],
        ['', '', '', '', '', '', '1', '8', ''],
        ['', '5', '', '', '', '', '4', '', ''],
        ['', '', '', '6', '', '8', '', '', ''],
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '3', '', '1', '', '', ''],
        ['', '1', '4', '', '', '', '', '', ''],
        ['', '', '7', '', '', '', '6', '3', '']
    ]
}

function populateSudokuGrid(difficulty) {
        if (difficulty in puzzles) {
    sudoku = JSON.parse(JSON.stringify(puzzles[difficulty])); // Clone the puzzle
    updateSudokuGrid(); // Update the HTML grid
} else {
    console.log("Invalid difficulty level. Please choose 'easy', 'medium', or 'hard'.");
}
}

// Function to update the HTML Sudoku grid
function updateSudokuGrid() {
    for (let col = 0; col <= 8; col++) {
        for (let row = 0; row <= 8; row++) {
            const input = $(`#c${col}${row}`);
            input.val(sudoku[col][row]);
            input.css({ "color": "black" });
        }
    }
}

// Add click event listeners to the buttons
$(document).ready(function () {
    $("#easyButton").click(function () {
        populateSudokuGrid("easy");
    });
    $("#mediumButton").click(function () {
        populateSudokuGrid("medium");
    });
    $("#hardButton").click(function () {
        populateSudokuGrid("hard");
    });
});

//Deixando a tabela interativa com o HTML, usando JQuery
for (let col = 0; col <= 8; col++) {

    let tr = $('<tr>');
    for (let row = 0; row <= 8; row++) {
        //Para completar o sudoku execute a função abaixo
        // sodokoSolver(sudoku);
        jogoVencido(sudoku);
        let input = $(`<input type="text" id="c${col}${row}" value="${sudoku[col][row]}">`)
        let td = $(`<td>`);
        td.append(input);
        tr.append(td);

        //Quando alterar o input, aplique a função de alterarInput
        input.on('input', alterarInput)

    };
    $('#grade').append(tr);
}
//Função de edição de elementos que reflete no Array
function alterarInput() {
    let el = $(this);
    let _col = el.attr('id')[1];
    let _row = el.attr('id')[2];
    let valor = el.val();

    if (validPlay(sudoku, _col, _row, valor) || $(this).val() == "") {
        $(this).css({ "color": "black" });
        sudoku[_col][_row] = valor;
    } else {
        $(this).css({ "color": "red" });
        console.log("errado");
    };

    // console.log(sudoku);

    if (jogoVencido(sudoku)) {
        alert("Parabéns, você venceu!");
        // console.log("você venceu");
    }
}

function validPlay(tabela, col, row, value) {

    for (let i = 0; i <= 8; i++) {

        //Verificando se o número existe e se ele é entre 1 a 9
        if (!(value && value > 0 && value < 10)) {
            return false;
        };
        //Verificando se é único no row/linha
        if (value == tabela[col][0] || value == tabela[col][i + 1]) {
            return false;
        };
        //Verificando se é único na column/coluna
        if (value == tabela[0][row] || value == tabela[i][row]) {
            return false;
        };

        //Verificando se já estiver presente no mesmo quadrado 3x3
        let r1 = Math.floor(row / 3) * 3;
        let c1 = Math.floor(col / 3) * 3;
        for (let r = r1; r < r1 + 3; ++r) {
            for (let c = c1; c < c1 + 3; ++c) {
                if (tabela[c][r] == value) return false;
            }
        }
    };

    return true;

};

//Resolvedor de Sudoku automático

function sodokoSolver(data) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (data[i][j] == '') {
                for (let k = 1; k <= 9; k++) {
                    if (validPlay(data, i, j, k)) {
                        data[i][j] = `${k}`;
                        if (sodokoSolver(data)) {
                            return true;
                        } else {
                            data[i][j] = '';
                        }
                    }
                }
                return false;
            }
        }
    }
    return true;
}

//Verificação de jogo acabou
function jogoVencido(tabela) {
    for (let i = 0; i <= 8; i++) {
        for (let j = 0; j <= 8; j++) {
            if (tabela[i][j] == '') {
                return false;
            }
        }
    }
    console.log("você venceu");
    return true;
}

//$('#resolva').click(sodokoSolver(sudoku));