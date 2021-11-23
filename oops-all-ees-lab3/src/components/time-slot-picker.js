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
        const montleng = [31,28,31,30,31,30,30,31,31,30,31,30,31]; //month length
        const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

        var month=null;

        var dayiter=0;
        if(sdate.getUTCMonth()==edate.getUTCMonth()){
            month = months[sdate.getUTCMonth()];
            for(let i = 0; i<polllength; i++){
                columnname[i]=days[sdate.getUTCDay()+dayiter]+" "+month+" "+(sdate.getUTCDate()+i);
                dayiter++;
                if((sdate.getUTCDay()+dayiter)>6){
                    dayiter=0-sdate.getUTCDay();
                }
            }
        } else if(sdate.getUTCMonth()!=edate.getUTCMonth()) {


            //var montdiff=montleng[sdate.getUTCMonth()]-sdate.getUTCDate();
            month = months[sdate.getUTCMonth()];
            
            let x = 0; //index for placing in column
            for(let i = sdate.getUTCDate(); i<montleng[sdate.getUTCMonth()]; i++){
                columnname[x]=days[sdate.getUTCDay()+dayiter]+" "+month+" "+(sdate.getUTCDate()+x);
                x++;
                dayiter++;
                //console.log("out"+dayiter)
                if((sdate.getUTCDay()+dayiter)>6){
                    dayiter=(0-sdate.getUTCDay());
                    //console.log("in"+dayiter)
                }
            }

            month = months[edate.getUTCMonth()];
            let x1=0;
            for(let i = 1; i<edate.getUTCDate()+1; i++){
                columnname[x]=days[sdate.getUTCDay()+dayiter]+" "+month+" "+(1+x1);
                x++;
                x1++;
                dayiter++;
                if((sdate.getUTCDay()+dayiter)>6){
                    dayiter=0-sdate.getUTCDay();
                }
            }
        }

        console.log(columnname)

        var beginday = new Date();
        var endday = new Date();
    
        //set time for tests
        beginday.setHours(6);
        beginday.setMinutes(0);
        beginday.setSeconds(0);
        endday.setHours(20);
        endday.setMinutes(0);
        endday.setSeconds(0);

        const rowname = [];
        const hours = ["0","1","2","3","4","5","6","7","8","9","10","11","12","1","2","3","4","5","6","7","8","9","10","11","12"];

        var x2=0;//hour incrementer
        var x3=0;//minute incrementer
        for(let i=0;i<56+1;i++){
            rowname[i]=hours[beginday.getHours()+x2]+":"+(0+(x3*15))
            if(x3==0&&beginday.getHours()+x2<12){
                rowname[i]=rowname[i]+"0"
            }else if(x3==0&&beginday.getHours()+x2>11){
                rowname[i]=rowname[i]+"0"
            }
            if(beginday.getHours()+x2<12){
                rowname[i]=rowname[i]+" am"
            }else if(beginday.getHours()+x2>11){
                rowname[i]=rowname[i]+" pm"                
            }
            x3++;
            if(x3>3){
                x3=0;
                x2++;
            }
        }

        //console.log(beginday.getMinutes())
        //console.log(endday)  
        
        console.log(rowname)

        this.state = {days:[...columnname], times:[...rowname]}
    }

    tablerow(time){
        return (
            <tr>
                <th>{time}</th>
                {
                    this.state.days.map(day => (
                        <th>
                    
                        </th>
                    ))
                }
            </tr>
        )
    }

    render() {
        return (
            <table className="table-bordered">
                <thead>
                    <tr>
                        <th/>
                        {
                            this.state.days.map(day => (
                                <th>
                                    {day}
                                </th>
                            ))
                        }

                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.times.map(time => {
                            return this.tablerow(time)
                        })
                    }
                </tbody>
            </table>
        )
    }
}

export default TimeSlotPicker