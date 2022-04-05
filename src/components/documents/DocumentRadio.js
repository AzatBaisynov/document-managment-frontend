import React from 'react';

const DocumentRadio = () => {
    return (
        <div className="document__desc">
            <div className="document__require">
                <div className="document__yes">
                    <input type="radio" id="yes"
                           name="contact" value="email"/>
                    <label htmlFor="yes">Да</label>
                </div>
                <input type="radio" id="no"
                       name="contact" value="phone"/>
                <label htmlFor="no">Нет</label>
            </div>
        </div>

    );
};

export default DocumentRadio;