import React, { useContext } from "react";
import { FieldContext } from "../../context/fieldContext";
import "./Field.css";

const Field: React.FC = () => {
    const { field } = useContext(FieldContext)

    return (
        <div className='field'>
            {field.map((rows, x) =>
                rows.map((col, y) =>
                    <div role='gridcell' key={`${x}-${y}`} className={`cell ${!!field[x][y] && 'alive'}`} />
                )
            )}
        </div>
    )
}

export default Field
