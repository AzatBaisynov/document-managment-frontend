import React from 'react';
import DocumentSubtitle from "./DocumentSubtitle";
import DocumentInput from "./DocumentInput";

const DocumentRow = ({fields}) => {
    return (
        <div className="document__row">
            <div className="document__flex">
                <div>
                    <DocumentSubtitle/>
                </div>
                <div className="document__desc">
                    {
                        fields.map((el)=>{

                        })
                    }
                </div>
            </div>
        </div>
    );
};

export default DocumentRow;