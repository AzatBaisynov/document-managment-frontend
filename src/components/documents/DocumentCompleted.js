import React, {useEffect, useState} from 'react';
import {completeddocument} from '../data/completeddocument';

const DocumentCompleted = () => {
    const [fields, setFields] = useState([])
    useEffect(() => {
        setFields(completeddocument)
    }, [])
    const time = fields.map((el) => (
        <div>
            {el.time}
        </div>
    ))
    const node = fields.map((el) => (
        <div>
            {el.node}
        </div>
    ))
    const operator = fields.map((el) => (
        <div>
            {el.operator}
        </div>
    ))
    const operation = fields.map((el) => (
        <div>
            {el.operation}
        </div>
    ))

    const process = fields.map((el) => (
        <div className="document__completed-col">
                                <span>
                                {el.process.process}
                                </span>
            <span>
                                {el.process.time}
                        </span>
        </div>
    ))

    return (
        <div className="container">
            <div className="document__completed">
                <p> Time</p>
                <p> Node Name </p>
                <p> Operator </p>
                <p> Operation</p>
                <p> Process Opinion </p>
                <div className="document__completed-column">
                    {time}
                </div>
                <div className="document__completed-column">
                    {node}
                </div>
                <div className="document__completed-column">
                    {
                        operator
                    }
                </div>
                <div className="document__completed-column">
                    {
                        operation
                    }
                </div>
                <div className="document__completed-column">
                    {
                        process
                    }
                </div>
            </div>


        </div>
    );
};

export default DocumentCompleted;