import React from 'react'
import { Employee } from './Employee.js';
import { Menu } from './Menu.js';
import { Todo } from './Todo';
import { ToCompleted } from './ToCompleted';
import { ToRead } from './ToRead';
import { Slider } from './Slider';
import { CalendarPart } from './CalendarPart';
import { Document } from './Document';

export const HomePage = () => {

    const todos = [
        {
          action_link : "/",
          action_text: "To do",
          action : Todo
        },
        {
          action_link : "/toread",
          action_text: "To be read",
          action : ToRead
        },
        {
          action_link : "/tocompleted",
          action_text: "Completed",
          action : ToCompleted
        }
      ]
    const documents = [
      {
        action_link : "/",
        action_text: "Finance",
        action : Document
      },
      {
        action_link : "/cpl",
        action_text: "CPL",
        action : Todo
      },
      {
        action_link : "/sales",
        action_text: "Sales",
        action : Todo
      },
      {
        action_link : "/PMO",
        action_text: "PMO",
        action : Todo
      },
      {
        action_link : "/software",
        action_text: "Software",
        action : Todo
      },
      {
        action_link : "/ah",
        action_text: "A&H",
        action : Todo
      },
    ]
    const slider = [
      {
        action_link : "/",
        action_text: "Picture News",
        action : Slider
      }
    ]
    const calendar = [
      {
        action_link : "/",
        action_text: "My calendar",
        action : CalendarPart
      }
    ]


    return (<main className="main">
        <div className="container main_container">
            <Employee />
            <section className="middle">
                <Menu actions={todos} minh={"163px"} scroll={true} />
                <Menu actions={documents} minh={"302px"} scroll={false} />
            </section>
            <div>
                <Menu actions={slider} minh={"205px"} scroll={false} />
                <Menu actions={calendar} minh={"474px"} scroll={false} />
            </div>
        </div>
    </main>)
}