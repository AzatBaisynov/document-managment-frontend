import React from 'react';

export const DocumentNotice = () => {
    return (
        <div className="container">
            <form>
                <div className="notice__cover">
                    <div className="document__notice-title">
                        Notice
                    </div>
                    <div className="notice__table">
                        <div className="notice__row">
                            <div className="notice__name">
                                Title
                            </div>
                            <div className="notice__inner">
                                <input type="text" className="notice__inner-input"/>
                            </div>
                        </div>
                        <div className="notice__row">
                            <div className="notice__name">
                                Date
                            </div>
                            <div className="notice__inner">
                                <input type="datetime-local" className="notice__inner-input"/>
                            </div>
                        </div>
                        <div className="notice__row">
                            <div className="notice__name">
                                Autor
                            </div>
                            <div className="notice__inner">
                                <input type="text" className="notice__inner-input"/>
                            </div>
                        </div>
                        <div className="notice__row">
                            <div className="notice__name">
                                Second title
                            </div>
                            <div className="notice__inner">
                                <input type="text" className="notice__inner-input"/>
                            </div>
                        </div>
                        <div className="notice__row">
                            <div className="notice__name">
                                Image
                            </div>
                            <div className="notice__inner">
                                <input type="file" className="notice__inner-input"/>
                            </div>
                        </div>
                        <div className="notice__row">
                            <div className="notice__name notice__comment-name">
                                Comment
                            </div>
                            <div className="notice__comment-cover notice__inner">
                                <input type="comment" className="notice__inner-input notice__comment-input"/>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

