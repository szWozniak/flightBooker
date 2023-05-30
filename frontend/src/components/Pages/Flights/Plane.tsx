import React from 'react';

const Plane = (props: any) => {
    const { rowTemplate, rowCount } = props;
    const rowTemplateArray = rowTemplate.split("x");

    const generateRow = () => {
        const seats = [];
        for(let i = 0; i < rowTemplateArray.length; i++) {
            if(i > 0) {
                seats.push(<div key={`A${i}`}>B</div>);
            }

            for(let j = 0; j < rowTemplateArray[i]; j++) {
                seats.push(<div key={`${i}-${j}`}>S</div>);
            }
        }

        return seats;
    }
    const generateRows = () => {
        const rows = [];
        for(let i = 0; i < rowCount; i++) {
            rows.push(<div className="row" key={i}>{generateRow()}</div>)
        }

        return rows;
    }

    return (
        <div className="plane">
            {generateRows()}
        </div>
    );
};

export default Plane;