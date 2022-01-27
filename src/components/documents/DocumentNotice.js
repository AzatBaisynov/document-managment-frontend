import axios from 'axios';
import React, { useState } from 'react';
import { address } from '../data/data';

export const DocumentNotice = () => {
    const [title, setTitle] = useState("")
    const [secondTitle, setSecondTitle] = useState("")
    const [comment, setComment] = useState("")
    const [color, setColor] = useState("")
    const [attachments, setAttachments] = useState([])

    const handleAttachment = async (e) => {
        if (e.target.value) {
            setAttachments(Array.from(e.target.files))
        }
    }

    const handleClose = () => {
        window.open("about:blank", "_self");
        window.close();
    }

    const handleSubmit = () => {

        const data = { title, secondTitle, comment, color }
        const config = {
            method: "POST",
            url: `${address.use}/v1/api/notice`,
            data: JSON.stringify(data),
            headers: {
                "Authorization": localStorage.getItem("token"),
                "Content-Type": "application/json"
            }
        }
        axios(config)
            .then(async ({ data }) => {
                const formData = new FormData()
                formData.append(
                    'file',
                    attachments[0],
                    attachments[0].name
                )
                await axios.post(`${address.use}/v1/api/file/notice/${data.id}`, formData, {
                    headers: {
                        'Authorization': localStorage.getItem("token"),
                    }
                })

                handleClose()
            })
    }

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
                                <input type="text" onChange={(e) => setTitle(e.target.value)} className="notice__inner-input" />
                            </div>
                        </div>

                        <div className="notice__row">
                            <div className="notice__name">
                                Second title
                            </div>
                            <div className="notice__inner">
                                <input type="text" onChange={(e) => setSecondTitle(e.target.value)} className="notice__inner-input" />
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
                                    accept=".jpg, .jpeg, .png" onChange={handleAttachment}
                                    name="profile_pic" />
                                <label htmlFor="input"
                                    className="input__file-button">

                                    <span className="input__file-icon-wrapper-2">Upload</span>
                                    <span className="input__file-button-text">{attachments[0]?.name ? attachments[0].name : ""}</span>
                                </label>
                            </div>
                        </div>
                        <div className="notice__row">
                            <div className="notice__name notice__comment-name">
                                Comment
                            </div>
                            <div className="notice__comment-cover notice__inner">
                                <textarea onChange={(e) => setComment(e.target.value)} style={{
                                    width: "700px", height: "120px", fontSize: "15px", border: "1px solid #d3d3d3"
                                }} />
                            </div>
                        </div>
                        <div className="notice__row">
                            <div className="notice__name">
                                Color
                            </div>
                            <div className="notice__inner">
                                <input type="color" onChange={(e) => setColor(e.target.value)} style={{ width: "50px", border: "none" }} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="document__button-cover">
                    <div className="document__submit" onClick={handleSubmit}>
                        Submit
                    </div>
                </div>
            </form>
        </div>
    );
};

