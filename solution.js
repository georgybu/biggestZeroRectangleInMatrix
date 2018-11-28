/**
 * Get random int number
 * @param min
 * @param max
 * @returns {number}
 */
const getRandomInt = (min, max) => Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + Math.ceil(min);

/**
 * Get random matrix - number[maxWidth][maxHeight]
 * Added fill it randomly - 0 or 1
 *
 * @param maxWidth
 * @param maxHeight
 * @returns {Array}
 */
const getRandomMatrix = (maxWidth, maxHeight) => {
    if (maxWidth < 3) {
        throw new Error(`maxWidth should be number and > 2`);
    }
    if (maxHeight < 3) {
        throw new Error(`maxHeight should be number and > 2`);
    }
    const width = getRandomInt(4, maxWidth);
    const height = getRandomInt(4, maxHeight);
    const matrix = [];

    for (let i = 0; i < height; i++) {
        const row = [];
        for (let j = 0; j < width; j++) {
            row.push(Number(Math.random() > 0.5));
        }
        matrix.push(row);
    }

    return matrix;
};

/**
 * Render HTML of matrix.
 * Can be rendered with solution.
 *
 * @param matrix
 * @param solution
 * @returns {HTMLElement}
 */
const getMatrixHTMLElements = (matrix, solution = null) => {
    const html = document.createElement(`ul`);
    matrix.forEach((row, i) => {
        const rowElement = document.createElement(`ul`);
        row.forEach((item, j) => {
            const itemElement = document.createElement(`li`);
            itemElement.innerText = item;
            if (solution) {
                itemElement.className = cellInSolution(i, j, solution) ? 'solution' : '';
            }

            rowElement.appendChild(itemElement);
        });
        html.appendChild(rowElement);
    });
    return html;
};

/**
 * Check if in matrix exist only `0`
 *
 * @param matrix
 * @param startI
 * @param startJ
 * @param size
 * @returns {boolean}
 */
const checkRectangleSubMatrix = (matrix, startI, startJ, size) => {
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (matrix[startI + i][startJ + j] === 1) {
                return false;
            }
        }
    }
    return true;
};

/**
 * Find Biggest `Zero` Rectangle In Matrix of 0 and 1
 * Return all solutions from 2x2 till maxPossibleValue
 *
 * @param matrix
 * @returns {*}
 */
const findSolutions = (matrix) => {
    const maxPossibleValue = Math.min(matrix.length, matrix[0].length);

    const solutions = [];
    for (let size = 2; size <= maxPossibleValue; size++) {
        for (let i = 0; i <= (matrix.length - size); i++) {
            for (let j = 0; j <= (matrix[i].length - size); j++) {
                const isEmptyRectangleMatrix = checkRectangleSubMatrix(matrix, i, j, size);
                if (isEmptyRectangleMatrix) {
                    solutions.push({i, j, size});
                }
            }
        }
    }

    if (solutions.length) {
        return solutions.sort((a, b) => b.size - a.size)[0];
    }
    return null;
};

/**
 * Check matrix item. If cell in solution range
 *
 * @param i
 * @param j
 * @param solution
 * @returns {boolean}
 */
const cellInSolution = (i, j, solution) => {
    if (solution) {
        const iInRange = i >= solution.i && i < (solution.i + solution.size);
        const jInRange = j >= solution.j && j < (solution.j + solution.size);
        return iInRange && jInRange;
    }
    return false;
};

/**
 * Click
 */
document.getElementById('solution').addEventListener('click', () => {
    const container = document.querySelector('.container');
    const matrix = getRandomMatrix(30, 30);
    const solution = findSolutions(matrix);
    container.innerHTML = '';
    container.appendChild(getMatrixHTMLElements(matrix, solution));
    if (!solution) {
        const error = document.createElement('div');
        error.innerText = 'There is no solution';
        error.className = 'error';
        container.appendChild(error);
    }
});
