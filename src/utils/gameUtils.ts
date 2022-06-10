import { MatrixOfNumbers, SetFieldType } from "./types";
import { FIELD_HEIGHT, FIELD_WIDTH, operations } from "./Constants";

type ProducePropsTypes = {
    field: MatrixOfNumbers,
    callback: (newField: MatrixOfNumbers) => void
}

export const produce = ({field, callback}: ProducePropsTypes): MatrixOfNumbers => {
    const newField = JSON.parse(JSON.stringify(field))
    callback(newField)
    return newField
}

export const countNeighbours = (row: number, col: number, field: MatrixOfNumbers): number => {
    let totalNeighbours = 0

    operations.forEach(([x, y]) => {
        totalNeighbours += isCellAlive(field, row + x, col + y)
    })

    return totalNeighbours
}

export const isCellAlive = (field: MatrixOfNumbers, row: number, col: number) => {
    try {
        return field[row][col]
    } catch {
        return 0
    }
}

export const updateCell = (row: number, col: number, field: MatrixOfNumbers) => {

    const total = countNeighbours(row, col, field)

    if (total > 3 || total < 2) {
        return 0
    }

    else if (field[row][col] === 0 && total === 3) {
        return 1
    }

    else {
        return field[row][col]
    }

}

export const startGameCallback = (onSetField: SetFieldType) => {
    onSetField((stateField: MatrixOfNumbers) => {
        return produce(
            {
                field: stateField,
                callback:
                    (newField: MatrixOfNumbers) => {
                        for (let i = 0; i < FIELD_WIDTH; i++) {
                            for (let j = 0; j < FIELD_HEIGHT; j++) {
                                newField[i][j] = updateCell(i, j, stateField)
                            }
                        }
                    }
            })
    })
}

export const generateField = () => {
    let rows: MatrixOfNumbers = []

    for (let i = 0; i < FIELD_WIDTH; i++) {
        rows[i] = []
        for (let j = 0; j < FIELD_HEIGHT; j++) {
            rows[i][j] = (Math.random() > 0.5) ? 1 : 0
        }
    }

    return rows
}
