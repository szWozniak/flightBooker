import React from 'react';
import Plane from './Plane';

const Flight = () => {
    return (
        <div>
            Flight
            <Plane 
                rowTemplate="2x4x2"
                rowCount={14}
            />
        </div>
    );
};

export default Flight;