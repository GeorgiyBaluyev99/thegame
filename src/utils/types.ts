export type MatrixOfNumbers = Array<number[]>

export type SetFieldType = (field: MatrixOfNumbers | ((stateField: MatrixOfNumbers) => Array<number[]>)) => void
