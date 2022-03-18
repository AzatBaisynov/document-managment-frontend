import React, {useEffect, useState} from 'react';
import '../assets/App.css';
import {Employee} from '../components/Employee.js';
import {Menu} from '../components/Menu.js';
import {Todo} from '../components/Todo';
import {ToCompleted} from '../components/ToCompleted';
import {ToRead} from '../components/ToRead';
import {Slider} from '../components/Slider';
import {CalendarPart} from '../components/CalendarPart';
import {DocumentComponents} from '../components/DocumentComponents';
import {Notice} from '../components/Notice';
import {News} from '../components/News';
import axios from 'axios';
import {DocumentsMenu} from '../components/DocumentsMenu';
import { address } from '../components/data/data';
import { MiniTiRead } from '../components/MiniToRead';


const MainPage = () => {
    const [documents, setDocuments] = useState([]);

    useEffect(() => {
        const config = {
            method: 'get',
            url: `${address.use}/v1/api/document/categories`,
            headers: {
                'Authorization': localStorage.getItem("token")
            }
        };
        axios(config)
            .then(function (response) {
                if (response.data) {
                    setDocuments(response.data.map((el, idx) => {
                        if (!idx) {
                            return {
                                action_link: "/",
                                action_text: el.name,
                                action_id: el.id,
                                action: DocumentComponents
                            }
                        }
                        return {
                            action_link: `/${el.name.toLowerCase()}`,
                            action_text: el.name,
                            action_id: el.id,
                            action: DocumentComponents
                        }
                    }))
                }
            })
            .catch(function (error) {
                console.log(error);
            });

    }, [])


    const todos = [
        {
            action_link: "/",
            action_text: "В работе",
            action: Todo
        },
        {
            action_link: "/toread",
            action_text: "К прочтению",
            action: MiniTiRead
        },
        {
            action_link: "/tocompleted",
            action_text: "Завершенные",
            action: ToCompleted
        }
    ]
    const slider = [
        {
            action_link: "/",
            action_text: "Новости в картинках",
            action: Slider
        }
    ]
    const calendar = [
        {
            action_link: "/",
            action_text: "Мой календарь",
            action: CalendarPart
        }
    ]
    const noticeAndNews = [
        {
            action_link: "/",
            action_text: "Новости",
            action: Notice
        }
    ]

    return (

        <main className="main">
            <div className="container main_container">
                <Employee/>
                <section className="middle">
                    <Menu actions={todos} minh={"163px"} scroll={true}/>
                    <Menu actions={noticeAndNews} minh={"368px"} scroll={false}/>
                    <DocumentsMenu actions={documents} minh={"302px"} scroll={false}/>
                </section>
                <div>
                    <Menu actions={calendar} minh={"390px"} scroll={false}/>
                    <Menu actions={slider} minh={"205px"} scroll={false}/>
                </div>
            </div>
        </main>

    );
};

export default MainPage;