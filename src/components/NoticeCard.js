import React, {useEffect, useState} from 'react';
import man from "../assets/images/man.jpeg"
import men from "../assets/images/men.png"

export const NoticeCard = () => {
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
        <div className="container">
            <div className="notice__card">
                <h2 className="notice__title">
                    {
                        notice.title
                    }
                </h2>
                <div className="notice__info">
                    <span className="notice__subtitle">
                        {
                            notice.date
                        }
                </span>
                    <span className="notice__subtitle">
                Author：
                    </span>
                    <span className="notice__link">
                        {
                            notice.author
                        }
            </span>
                </div>
                <h2 className="notice__title-second">
                    {
                        notice.second_title
                    }
                </h2>
                <div className="notice__img">
                    <img src={man} alt=""/>
                </div>
                <h2 className="notice__desc">
                    {
                        notice.comment
                    }
                </h2>
            </div>
            <h4>
                Comment
            </h4>
            <div className="notice__comment">
                <input type="comment" className="notice__input"
                       placeholder="You have done a good job! I would like to cheer for you!"/>
                <button className="comment__btn">
                    Submit
                </button>
            </div>
            <div className="comment__saved">
                <div className="notice__comment-img">
                    <img src={men} alt=""/>
                </div>
                <div>
                    <span className="notice__comment-title">
                         {
                             notice.author
                         }
                    </span>
                    <span className="notice__comment-date">
                        {
                            notice.date
                        }
                    </span>
                    <p className="notice__comment-desc">
                        {
                            notice.comment
                        }
                    </p>
                </div>
            </div>
        </div>
    );
};