import React, {useEffect, useState} from 'react'

export const NewsManager = () => {
    const documentnotice = {
        title: "Happy birthday, Assem!",
        date: "01/18/2022 12:02",
        author: "DianaTussupkhanova",
        second_title: "Happy birthday, Assem!",
        comment: "We wish you all the best on this special day, the 18th of January 2022,and hope for more good things to come!May your life be full of joy, surprises, and fun!"
    }
    const [notice, setNotice] = useState({})
    useEffect(() => {
        setNotice(documentnotice)
    })
    return (
        <div className="related">
            <div className="task__search news__search">
                <div>
                    <span>
                    Selected:
                </span>
                    <input type="text" id="task" placeholder="Enter a keyword"/>
                    <label htmlFor="task" className="task__label"> <i className="fas fa-search task__svg"> </i></label>
                </div>
                <a href="/documentnotice" target="_blank" className="document__manager-btn">
                    add
                </a>

            </div>
         <div className="news__manager-wrapper">
             <div className="notice__flex">
             <div className="notice__number">
                 1
             </div>
             <h4 className="news__manager-title">
                 {
                     notice.title
                 }
             </h4>
             </div>
             <div className="news__manager-grid">
                 <p>
                        <span className="notice__item notice__author">
                          Author:
                        </span>
                     <span className="news__name">
                    {
                        notice.author
                    }
                   </span>
                 </p>
                 <span className="notice__item">
                    Hello
                </span>
                 <span className="notice__item">
                    Hello
                </span>
                 <span className="notice__item">
                    Hello
                </span>
                 <span className="notice__item">
                    {
                        notice.date
                    }
                </span>
             </div>
     </div>
            <a href="/notice" target="_blank">Hello</a>
        </div>
    )
}