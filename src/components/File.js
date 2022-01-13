import axios from "axios";
import React, { useEffect } from "react";
import { downloadFile } from "./FileDownloader";

export const File = () => {

    useEffect(() => {
        // downloadFile("http://localhost:8080/v1/api/file/1641411716180.pdf")
    }, [])

    const handleClick = () => {
        downloadFile("http://localhost:8080/v1/api/file/1641411716180.pdf")
    }

    return (
        <div>
            <button onClick={handleClick}>Download</button>
            FILE HERE
        </div>
    )
}