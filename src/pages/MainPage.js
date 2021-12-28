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
            action_text: "To do",
            action: Todo
        },
        {
            action_link: "/toread",
            action_text: "To be read",
            action: ToRead
        },
        {
            action_link: "/tocompleted",
            action_text: "Completed",
            action: ToCompleted
        }
    ]
    const slider = [
        {
            action_link: "/",
            action_text: "Picture News",
            action: Slider
        }
    ]
    const calendar = [
        {
            action_link: "/",
            action_text: "My calendar",
            action: CalendarPart
        }
    ]
    const noticeAndNews = [
        {
            action_link: "/",
            action_text: "Notice",
            action: Notice
        },
        {
            action_link: "/news",
            action_text: "News",
            action: News
        }
    ]

    return (

        <main className="main">
            <div className="container main_container">
                <Employee/>
                <section className="middle">
                    <Menu actions={todos} minh={"163px"} scroll={true}/>
                    <Menu actions={noticeAndNews} minh={"450px"} scroll={false}/>
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