import { countNeighbours, generateField, isCellAlive, updateCell } from "../utils/gameUtils";
import { FIELD_WIDTH } from "../utils/Constants";

let underpopulation
let overcrowding
let reproduction
let nextGen

beforeAll(() => {
    underpopulation = [[0, 0, 0], [0, 1, 0], [0, 0, 0]]
    overcrowding = [[1, 1, 1], [1, 1, 1], [1, 1, 1]]
    reproduction = [[0, 1, 0], [1, 0, 0], [0, 0, 1]]
    nextGen = [[0, 1, 0], [1, 1, 0], [0, 0, 1]]
})

describe('generateField()', () => {
    test('generates field', () => {
        const result = generateField()

        expect(result).toHaveLength(FIELD_WIDTH)
    })
})

describe('countNeighbours()', () => {
    test('counts neighbours for cell surrounded by dead cells', () => {
        const result = countNeighbours(1, 1, underpopulation)

        expect(result).toBe(0)
    })

    test('counts neighbours for cell surrounded by alive cells', () => {
        const result = countNeighbours(1, 1, overcrowding)

        expect(result).toBe(8)
    })
})

describe('isCellAlive()', () => {
    test('returns alive cell', () => {
        // alive cell passed
        const result = isCellAlive(reproduction, 0, 1)

        expect(result).toBe(1)
    })

    test('returns dead cell', () => {
        // dead cell passed
        const result = isCellAlive(reproduction, 1, 1)

        expect(result).toBe(0)
    })
})

describe('updateCell()', () => {
    test('live cell with fewer than two live neighbours dies', () => {
        // alive cell passed
        const result = updateCell(1, 1, underpopulation)

        expect(result).toBe(0)
    })

    test('live cell with more than three live neighbours dies', () => {
        // alive cell passed
        const result = updateCell(1, 1, overcrowding)

        expect(result).toBe(0)
    })

    test('dead cell with exactly three live neighbours becomes a live cell', () => {
        // dead cell passed
        const result = updateCell(1, 1, reproduction)

        expect(result).toBe(1)
    })

    test('live cell with two or three live neighbours lives on to the next generation.', () => {
        // alive cell passed
        const result = updateCell(1, 1, nextGen)

        expect(result).toBe(1)
    })
})



