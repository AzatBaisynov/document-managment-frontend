import React from 'react';

const DocumentCheckBox = () => {
    return (
        <div className="document__checkbox document__require">
            <div>
                <input type="checkbox" id="scales" name="scales"/>
                <label htmlFor="scales">Annual leave</label>
            </div>
            <div>
                <input type="checkbox" id="horns" name="horns"/>
                <label htmlFor="horns">Round Vacation</label>
            </div>
            <div>
                <input type="checkbox" id="horns" name="horns"/>
                <label htmlFor="horns">Unpaid leave</label>
            </div>
        </div>
    );
};

export default DocumentCheckBox;