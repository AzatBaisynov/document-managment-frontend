import React from 'react';
import DocumentSubtitle from "./DocumentSubtitle";
import DocumentInput from "./DocumentInput";

const DocumentRow = () => {
    return (
        <div className="document__row">
            <div className="document__flex">
                <div>
                    <DocumentSubtitle/>
                </div>
                <DocumentInput/>

            </div>
        </div>
    );
};

export default DocumentRow;