import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { address } from './data/data'
import { NavLink } from 'react-router-dom'

export const Related = () => {

    const [data, setData] = useState([])

    useEffect(() => {
        const params = {
            'method': "get",
            headers: {
                "Authorization": localStorage.getItem("token")
            },
            url: `${address.use}/v1/api/document/related`,
        }

        axios(params)
            .then(res => {
                setData(res.data)
            })
    }, [])

    const handleClick = (e) => {
        console.dir(e.target.className.split(" ")[1].replaceAll("rel", ""))

    }

    return (
        <div className="related">
            <div className="related__grid">
                <p className="related__title">№</p>
                <p className="related__title">Документ</p>
                <p className="related__title">Номер</p>
                <p className="related__title">Инициатор</p>
                <p className="related__title">Дата созд.</p>
                <p className="related__title">Статус файла</p>
                <p className="related__title">Текущий процесс</p>
                <p className="related__title">Текущий шаг</p>
            </div>
            {
                data?.map((el, idx) => (
                    <NavLink to={`/progress/${el.no}`} target="_blank">
                        <div className={`related__grid rel${el.no}`} key={idx} onClick={handleClick} >
                            <p className={`related__field rel${el.no}`}>{+el.seq + 1}</p>
                            <p className={`related__field rel${el.no}`}>{el.subject}</p>
                            <p className={`related__field rel${el.no}`}>{el.no}</p>
                            <p className={`related__field rel${el.no}`}>{el.initiator}</p>
                            <p className={`related__field rel${el.no}`}>{el.initDate}</p>
                            <p className={`related__field rel${el.no}`}>{el.fileStatus}</p>
                            <p className={`related__field rel${el.no}`}>{el.currentProcess}</p>
                            <p className={`related__field rel${el.no}`}>{el.currentStep}</p>
                        </div>
                    </NavLink>
                ))
            }
        </div>
    )
}