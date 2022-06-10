import React, { createContext, useState, useEffect } from "react";
import { MatrixOfNumbers, SetFieldType } from "../utils/types";
import { generateField } from "../utils/gameUtils";

type ProviderPropsType = {
    children: React.ReactNode
}

type ContextType = {
    field: MatrixOfNumbers,
    onSetField: SetFieldType,
    updateField: () => void,
}

export const FieldContext = createContext<ContextType>(
    {
        field: [],
        onSetField: (a) => {},
        updateField: () => {}
    })

export const FieldContextProvider = (props: ProviderPropsType) => {
    const [field, setField] = useState<MatrixOfNumbers>([])

    const updateField = () => {
        const rows = generateField()
        setField(rows)
    }

    useEffect(() => {
        updateField()
    }, [])

    const contextValue = {
        field,
        onSetField: setField,
        updateField,
    }

    return <FieldContext.Provider value={contextValue}>{props.children}</FieldContext.Provider>
}
