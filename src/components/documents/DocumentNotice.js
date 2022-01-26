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
                                <input type="file"
                                       id="input"
                                       className={` input__file-2`}
                                       placeholder="Please select the file to upload"
                                       accept=".jpg, .jpeg, .png"
                                       name="profile_pic"/>
                                <label htmlFor="input"
                                       className="input__file-button">

                                      <span className="input__file-icon-wrapper-2">Upload</span>
                                      <span className="input__file-button-text">Please select the file to upload</span>
                                </label>
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
                <div className="document__button-cover">
                    <div className="document__submit">
                        Submit
                    </div>
                </div>
            </form>
        </div>
    );
};

