import React, { useState,useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios'

const Plane = (props: any) => {
    const { flightID,rowTemplate, rowCount, reservedSeats } = props;
    const rowTemplateArray = rowTemplate.split("x");
    const seatsPerRow = rowTemplateArray.reduce((prev: number, next: number) => {
        return prev + (+next);
    }, 0)
    const [seats, setSeats] = useState<number[]>(reservedSeats);



    const getCssForSeat = (seatNo: number) => {
        if(seatNo == 1) return "clicked";
        if(seatNo == 2) return "reserved";
        return "";
    }

    const clickSeat = (seatNo: number) => {
        setSeats(oldSeats => oldSeats.map((val, i) => {
            if(i != seatNo || val == 2) return val;
            if(val == 1) return 0;
            return 1;
        }))
    }

    const generateRow = (row: number) => {
        const seatsRow = [];
        let seatNo: number = row * seatsPerRow;
        
        for(let i = 0; i < rowTemplateArray.length; i++) {
            if(i > 0) {
                seatsRow.push(<div className="empty" key={`A${i}`}></div>);
            }

            for(let j = 0; j < rowTemplateArray[i]; j++) {
                let savedSeatNo = seatNo;

                seatsRow.push(
                    <div 
                        onClick={() => {
                            clickSeat(savedSeatNo)
                        }}
                        className={getCssForSeat(seats[seatNo])} key={seatNo}>{seatNo+1}
                    </div>
                );
                seatNo += 1;
            }
        }

        return seatsRow;
    }
    const generateRows = () => {
        const rows = [];
        for(let i = 0; i < rowCount; i++) {
            rows.push(<div className="row" key={i}>{generateRow(i)}</div>)
        }

        return rows;
    }
    const reserveSeats = ()=>{
        let res:number[] = []
        seats.map((v,i)=> { if (v==1) res.push(i)})
        if (res.length==0){
            alert("Nie wybrano miejsc!");
        }
        else{
        // DO PODMIANY !!
             axios.post("http://localhost:4000/flight/reserve",{ClientID:187,FlightID:flightID,seats:res})
                 .then(res=>{
                     if (res.data.status=="OK"){
                         alert("Dziękujemy za rezerwację");
                         window.location.reload();
                     }else{
                         alert("Rezerwacja nie powiodła się :(");
                         window.location.reload();
                     }})


        }
    }

    return (
        <div>
            <div className="plane">
                {generateRows()}
            </div>
            <div>
                <br />
                <b>Wybrane miejsca</b><br />
                <span className="graySpan">
                    {seats.filter((val) => val == 1).length == 0 && "Brak wybranych miejsc..."}
                </span>
                {seats.map((val: number, seatNo: number) => {
                    if(val == 1) return (<span className="seatChoosen">{seatNo+1}</span>)
                })}
                <br /><br />
                <button className="actionButton" onClick={reserveSeats}>Kliknij, aby dokonać rezerwacji</button>
            </div>
        </div>
    );
};

export default Plane;