import React from 'react';

const DocumentSelect = () => {
    return (
        <div className="document__desc-select">
            <div className="document__flex document__require">
                <select id="cars" className="document__select">
                    <option label="==Select==">==Select==</option>
                    <option label="Department afford/ Team afford">Department afford/ Team afford</option>
                    <option label="Project afford/ Project">Project afford/ Project</option>
                </select>
                <input type="text"  className="document__input-select"/>
            </div>
        </div>

    );
};

export default DocumentSelect;