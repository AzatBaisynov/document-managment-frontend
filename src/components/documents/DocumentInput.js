import React from 'react';

const DocumentInput = ({user}) => {
    return (

            <div className="document__desc">
                <input type="text" placeholder={user} className="document__input document__require"/>
            </div>

    );
};

export default DocumentInput;