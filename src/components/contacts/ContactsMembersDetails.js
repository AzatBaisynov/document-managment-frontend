import React, { useEffect, useState } from 'react';
import Img from "../contacts/../../assets/images/men.png"
import Scan from "../contacts/../../assets/images/scan.png"
import Gender from "../contacts/../../assets/images/plus.svg"
import { useSelector } from 'react-redux'
import { address } from '../data/data';
import axios from 'axios';
import QRCode from 'react-qr-code';

const ContactsMembersDetails = ({ details }) => {

    const [showEmail, setShowEmail] = useState(false)
    const [showMobile, setShowMobile] = useState(false)
    const [mobile, setMobile] = useState("")
    const [email, setEmail] = useState("")

    const user = useSelector((store) => store?.userReducer?.user)
    const handleInput = async (e) => {
        console.dir(e.target)
        if (e.target.value) {
            // console.log(e.target.files[0])
            const formData = new FormData();
            formData.append(
                "file",
                e.target.files[0],
                e.target.files[0].name
            )
            
            await axios.post(`${address.use}/v1/api/file/avatar`, formData, {headers: {
                'Authorization': localStorage.getItem("token"),
            }})
            document.location.reload()
        }
    }

    const handlePressEmail = async () => {
        const conf = {
            method: "get",
            url: `${address.use}/v1/api/user/email/${email}`,
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        }

        const { data } = await axios(conf)
        document.location.reload()
    }

    const handlePressPhone = async () => {
        const conf = {
            method : "get",
            url : `${address.use}/v1/api/user/phone/${mobile}`,
            headers : {
                "Authorization" : localStorage.getItem("token")
            }
        }

        const { data } = await axios(conf)
        document.location.reload()
    }

    return (
        <div className="contacts__homepage-item">
            {details.fullName ? (
                <div>
                    <div className="contacts__homepage-container ">

                        <div className="contacts__member-details-img-cover">
                            <div className="contacts__member-details-img">
                                <img src={details.urlImg ? `${address.use}${details.urlImg}` : Img} alt="" className="contacts__member-details-img-men" />
                                {
                                    details?.id === user?.id ? <div><label htmlFor={`avatar${details?.id}`}><img src={Gender} alt="" style={{ cursor: "pointer" }} className="contacts__member-details-img-absolute" /></label><input style={{ display: "none" }} onInput={handleInput} id={`avatar${details?.id}`} type="file" /></div> : false
                                }

                            </div>

                        </div>
                        <p className="contacts__members-title flex">
                            {details.fullName}
                        </p>

                        <p className="contacts__homepage-info">Информация о сотруднике:</p>
                        <div className="contacts__homepage-descriptions">
                            
                            <p className="contacts__homepage-info">Мобильный телефон
                                {showMobile ? (<span><input onInput={(e) => setMobile(e.target.value)} style={{ width: "115px", border: "none", borderBottom: "1px solid #000"}} type="text"/><button onClick={handlePressPhone}>save</button></span>) : (<span><span> {details?.phone} </span>{details?.id === user?.id ? (<span onClick={() => { setShowMobile(!showMobile) }} style={{ background: "#699f4c", padding: "0px 4px", borderRadius: "50%", color: "#fff" }}>+</span>) : ""}</span>)}
                            </p>
                            <p className="contacts__homepage-info">Почта
                                {showEmail ? (<span><input onInput={(e) => setEmail(e.target.value)} style={{ width: "115px", border: "none", borderBottom: "1px solid #000" }} type="text" /><button onClick={handlePressEmail}>save</button></span>) : (<span><span> {details?.email} </span>{details?.id === user?.id ? (<span onClick={() => { setShowEmail(!showEmail) }} style={{ background: "#699f4c", padding: "0px 4px", borderRadius: "50%", color: "#fff" }}>+</span>) : ""}</span>)}
                            </p>
                            <p className="contacts__homepage-info">Должность
                                <span> {details?.postId?.position} </span>
                            </p>
                        </div>
                        <div className="contacts__homepage-scan">
                            <div className="contacts__homepage-scan-img">
                                <QRCode size="200" value={`MECARD:N:${details.fullName || ""};ADR:;TEL:${details?.phone || ""};EMAIL:${details?.email || ""};;`}/>
                            </div>
                            <p className="contacts__homepage-scan-desc">
                                Отскайнируйте QR код для<br />
                                добавления в список контактов
                            </p>
                        </div>

                    </div>
                </div>) : <div style={{ display: "flex", alignItems: "center", height: "100%" }}><img style={{ width: "100%" }} src="https://financialadvisors.com/media/no-images/nodata-found.png"></img></div>}
        </div>
    );
};

export default ContactsMembersDetails;