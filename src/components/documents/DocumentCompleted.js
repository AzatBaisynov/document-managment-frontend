import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { completeddocument } from '../data/completedocument';
import { address } from '../data/data';

const DocumentCompleted = () => {
    const [fields, setFields] = useState([])
    const { id } = useParams()
    useEffect(() => {
        const config = {
            method: 'get',
            url: `${address.use}/v1/api/document/logs/${id}`,
            headers: {
                'Authorization': localStorage.getItem("token")
            }
        };

        axios(config)
        .then((res) => {
            setFields(res.data)
        })
        .catch((err) => {
            console.log(err)
        })

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
                {el.process.time.substring(1)}
            </span>
        </div>
    ))

    return (
        <div style={{padding : "10px"}}>
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