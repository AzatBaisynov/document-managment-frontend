import React from 'react';
import DocumentSubtitle from "./DocumentSubtitle";
import DocumentInput from "./DocumentInput";

const DocumentGrid = () => {
    return (
        <div className="document__row_grid">
            <div className="document__flex">
                <DocumentSubtitle/>
                <div>
                    <DocumentInput/>
                </div>
            </div>
            <div className="document__flex">
                <DocumentSubtitle/>
                <div>
                    <DocumentInput/>
                </div>
            </div>
        </div>
    );
};

export default DocumentGrid;