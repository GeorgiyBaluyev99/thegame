import { render, screen } from '@testing-library/react';
import { FieldContextProvider } from '../context/fieldContext';
import App from "../App";
import Field from "../components/Field";
import { FIELD_WIDTH, FIELD_HEIGHT } from "../utils/Constants";
import { act } from "react-dom/test-utils";

beforeEach(() => {
    render(
        <FieldContextProvider>
            <App>
                <Field />
            </App>
        </FieldContextProvider>
    );
})

describe('Field Component', () => {
    test("renders cell for each field", () => {
        const cells = screen.getAllByRole('gridcell')

        expect(cells.length).toBe(FIELD_WIDTH * FIELD_HEIGHT)
    });

    test('renders alive cells randomly', () => {
        const cells = screen.getAllByRole('gridcell')

        const aliveCells = cells.filter(item => item.className === 'cell alive')

        expect(aliveCells.length).toBeGreaterThan(0)
    })

    test('field changes after 400ms', () => {
        jest.spyOn(global, 'setTimeout');
        jest.useFakeTimers()

        let button = screen.getByText(/start/i);
        act(() => button.click())

        const aliveCellsBeforeChange = screen.getAllByRole('gridcell').filter(item => item.className === 'cell alive')

        act(() => jest.advanceTimersByTime(400))

        const aliveCellsAfterChange = screen.getAllByRole('gridcell').filter(item => item.className === 'cell alive')

        expect(aliveCellsBeforeChange.length).not.toBe(aliveCellsAfterChange.length)
    })
})
