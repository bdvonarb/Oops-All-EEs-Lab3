import * as React from 'react'
import { render } from 'react-dom'
import '../styles/fa/css/all.css'

class TimeSlotPicker extends React.Component{
    //const  = ({startDate, endDate, selectCallback, children}) => 

    constructor(props){
        super(props);
        var sdate = new Date(props.startDate);
        var edate = new Date(props.endDate);
        var polllength = (Math.abs(props.startDate-props.endDate)/(1000*60*60*24))+1;
        const columnname = []
   
        const months = ["Jan","Feb","Mar","Apr","May","June","July","Aug","Sept","Oct","Nov","Dec"];
        const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

        if(sdate.getUTCMonth()==edate.getUTCMonth()){
            var month = months[sdate.getUTCMonth()]
        } else if(sdate.getUTCMonth()==edate.getUTCMonth()) {
            
        }


        for(let i = 0; i<polllength-1; i++){
            columnname[i]=days[sdate.getUTCDay()+i]+" "+month+" "+(sdate.getUTCDate()+i);
        }

        console.log(columnname)

    }

    render() {
        return (
            <table>
                <thead>
                    <tr>
                        {

                        }
                        <th style={{verticalAlign:'middle'}}>P0ll</th>
                    </tr>
                </thead>
            </table>
        )
    }
}

export default TimeSlotPicker