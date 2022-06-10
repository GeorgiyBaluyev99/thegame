import React, { useCallback, useRef, useContext } from 'react';
import Field from "./components/Field";
import { FieldContext } from "./context/fieldContext";
import { startGameCallback } from "./utils/gameUtils";
import { useStateCallback } from "./utils/useStateCallback";

const App: React.FC = () => {
    const [isRunning, toggleIsRunning] = useStateCallback(false)

    const { onSetField } = useContext(FieldContext)

    const isRunningRef = useRef(isRunning)
    isRunningRef.current = isRunning

    const startGame = useCallback(() => {
        let timeout
        if (isRunningRef.current) {
            startGameCallback(onSetField)
            timeout = setTimeout(startGame, 400)
        } else {
            clearTimeout(timeout)
        }
    }, [onSetField])

    const toggleGameStart = () => {
        toggleIsRunning((prev: boolean) => !prev, (state: boolean) => {
            isRunningRef.current = state
            startGame()
        })
    }

    return (
        <div>
            <button onClick={toggleGameStart}>
                {isRunning ? 'Stop' : 'Start'}
            </button>
            <Field />
        </div>
    );
}

export default App;
