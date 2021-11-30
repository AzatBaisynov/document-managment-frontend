import React from 'react';
import DocumentSubtitle from "./DocumentSubtitle";
import DocumentInput from "./DocumentInput";

const DocumentGrid = ({fields}) => {
    return (
        <div className="document__row_grid">
            <div className="document__flex">
                <DocumentSubtitle/>
                <div>
                    <div className="document__desc">
                        <input type="text" className={`document__input ${
                            fields.map((el) => (el.required ? "document__require" : ""))
                        }`}/>
                    </div>
                </div>
            </div>
            <div className="document__flex">
                <DocumentSubtitle/>
                <div>
                    <div className="document__desc">
                        <input type="text" className={`document__input ${
                            fields.map((el) => (el.required ? "document__require" : ""))
                        }`}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DocumentGrid;