import * as React from 'react'
import { render } from 'react-dom'
import '../styles/fa/css/all.css'


let count = 0
//var msstart = 0
//const msstart = 0
//var msend = 0
//const msend = 0

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

        //console.log(columnname)

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
        
        //console.log(rowname)

        //style={{position:"absolute", height:"15px", width:"5em", left:"0", top:"auto", borderTopWidth:"1px",marginTop:"-1px"}}

        // style={{borderTop:"1px", position:"absolute", height:"15px",left:"0", borderTopWidth:"1px",marginTop:"-1px"}}
        
        //<th/> style={{position="absolute"}}



        this.state = {days:[...columnname], times:[...rowname], msstart:"0,0", msend:"0,0"}

        this.handleclick = this.handleclick.bind(this)
        this.isHighlighted = this.isHighlighted.bind(this)
    }

    

    tablerow(time, timeindex){
        return (
            <tr>
                <th style={{userSelect:"none"}}>
                    {time}
                </th>
                {
                    this.state.days.map((day,dayindex) => (
                        <td id={dayindex + "," + timeindex} key={dayindex + "," + timeindex} style={{fontSize:"60%", textAlign:"center", userSelect:"none", backgroundColor:this.isHighlighted(dayindex+","+timeindex)?"#4287f5":"white"}} onMouseDown={this.handleclick} onMouseUp={this.handleclick}>
                            {day+ " " + time}
                        </td>
                    ))
                }

            </tr>
        )
    }

    //handleclick2(event){
    //    console.log(event.type)
    //}



    handleclick(event){
        //console.log(event.target.id)
        //console.log(event.type)
        //console.log(count)
        if(event.type==="mousedown"){
            count=1
            var msstarta= event.target.id.split(",")
            console.log(event.target.id)
            ///console.log(msstarta[0]+msstarta[1])
            //console.log(parseInt(msstarta[0])-2)
            
            this.setState(prevState => ({
                msstart:event.target.id,
                msend:"-1,-1"
            }))
        }
        else if(event.type==="mouseup"){
            count=0
            var msstarta= this.state.msstart.split(",")
            var msenda= event.target.id.split(",")
            console.log(event.target.id)
            

            var x = Math.abs(parseInt(msenda[0])-parseInt(msstarta[0]))
            var y = Math.abs(parseInt(msenda[1])-parseInt(msstarta[1]))

            //console.log(x)
            //var tabmap = new Array()
            for(let i=parseInt(msstarta[0]);i<=parseInt(msenda[0]);i++){
                for(let j=parseInt(msstarta[1]);j<=parseInt(msenda[1]);j++){
                    console.log(i+" "+j)
                }
            }

            this.setState(prevState => ({
                msend:event.target.id
            }))

        }




    }

    isHighlighted(id) {
        var msstarta= this.state.msstart.split(",")
        var msenda= this.state.msend.split(",")
        ///console.log(msenda[0]+msenda[1])
        

        var x = Math.abs(parseInt(msenda[0])-parseInt(msstarta[0]))
        var y = Math.abs(parseInt(msenda[1])-parseInt(msstarta[1]))

        //console.log(x)
        //var tabmap = new Array()
        for(let i=parseInt(msstarta[0]);i<=parseInt(msenda[0]);i++){
            for(let j=parseInt(msstarta[1]);j<=parseInt(msenda[1]);j++){
                if(id===(i+","+j)) {
                    return true
                }
            }
        }
        return false
    }

    render() {
        return (
 
            <table className="table table-striped table-bordered table-sm" 
            style={{display:"block",width:"900px",height:"500px",overflowY:"scroll",overflowX:"scroll"}}>
                
                <thead>
                    <tr>
                        <th/>
                        
                        {
                            this.state.days.map((day,index) => (
                                <th key={index} style={{minWidth:"200px", textAlign:"center", userSelect:"none"}}>
                                    {day}
                                </th>
                            ))
                        }

                    </tr>
                </thead>
                <tbody>

                    {
                        this.state.times.map((time, timeindex) => {
                            return this.tablerow(time, timeindex)
                        })
                    }
                </tbody>
            </table>
        )
    }
}

export default TimeSlotPicker