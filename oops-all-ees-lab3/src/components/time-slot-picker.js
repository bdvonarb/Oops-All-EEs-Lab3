import * as React from 'react'
import { render } from 'react-dom'
import '../styles/fa/css/all.css'



class TimeSlotPicker extends React.Component{
    //const  = ({startDate, endDate, selectCallback, children}) => 

    constructor(props){
        super(props);
        var whatstat = props.type;
        var sdate = new Date(props.startDate);
        var edate = new Date(props.endDate);
        var polllength = (Math.abs(props.startDate-props.endDate)/(1000*60*60*24))+1;
        const columnname = []
   
        const months = ["Jan","Feb","Mar","Apr","May","June","July","Aug","Sept","Oct","Nov","Dec"];
        const montleng = [31,28,31,30,31,30,30,31,31,30,31,30,31]; //month length
        const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

        var month=null;

        var dayiter=0;
        if(sdate.getUTCMonth()===edate.getUTCMonth()){
            month = months[sdate.getUTCMonth()];
            for(let i = 0; i<polllength; i++){
                columnname[i]=days[sdate.getUTCDay()+dayiter]+" "+month+" "+(sdate.getUTCDate()+i);
                dayiter++;
                if((sdate.getUTCDay()+dayiter)>6){
                    dayiter=0-sdate.getUTCDay();
                }
            }
        } else if(sdate.getUTCMonth()!==edate.getUTCMonth()) {


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
            if(x3===0&&beginday.getHours()+x2<12){
                rowname[i]=rowname[i]+"0"
            }else if(x3===0&&beginday.getHours()+x2>11){
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

        

        this.state = {days:[...columnname], times:[...rowname], msstart:"none", msend:"none", regions:["1,2","1,3","1,4","2,4"], down:"0",regions_dat:[], type:whatstat,selected_tim:[], selections:[{name:"Jaxen",slot:"1,2"},{name:"Ben",slot:"2,4"}]}

        this.handleclick = this.handleclick.bind(this)
        this.isHighlighted = this.isHighlighted.bind(this)

        this.Highlighted = this.Highlighted.bind(this)

        this.selHighlighted = this.selHighlighted.bind(this)

        this.idtodate = this.idtodate.bind(this)
    }

    

    tablerow(time, timeindex){
        return (
            <tr>
                <th style={{userSelect:"none"}}>
                    {time}
                </th>
                {
                    this.state.days.map((day,dayindex) => (
                        <td id={dayindex + "," + timeindex} key={dayindex + "," + timeindex} style={{fontSize:"60%", textAlign:"center", userSelect:"none", backgroundColor:this.selHighlighted(dayindex+","+timeindex)?"#b3b32d":this.isHighlighted(dayindex+","+timeindex)?"#4287f5":this.Highlighted(dayindex+","+timeindex)?"#64748f":"white" }} onMouseDown={this.handleclick} onMouseOver={this.handleclick}>
                            {day+ " " + time}
                        </td>
                    ))
                }

            </tr>
        )
    }

    handleclick(event){

        if(this.state.type===0){
            var down_a=this.state.down
            if(event.type==="mousedown"&&down_a==="0"){
                
                this.setState(prevState => ({
                    down:"1"
                }))

                var msstarta= event.target.id.split(",")
                
                this.setState(prevState => ({
                    msstart:event.target.id,
                    msend:"none"
                }))
            }
            else if(event.type==="mouseover"){



                this.setState(prevState => ({
                    msend:event.target.id
                }))

            }
            else if(event.type==="mousedown"&&down_a==="1"){

                this.setState(prevState => ({
                    down:"0"
                }))

                this.setState(prevState => ({
                    msstart:"none",
                    msend:"none"
                }))
                
                var msstarta= this.state.msstart.split(",")
                var msenda= event.target.id.split(",")
                //console.log(event.target.id)

                var region_a=this.state.regions

                //var count = 0
                
                if(msstarta[0]<=msenda[0]&&msstarta[1]<=msenda[1]){
                    for(let i=parseInt(msstarta[0]);i<=parseInt(msenda[0]);i++){
                        for(let j=parseInt(msstarta[1]);j<=parseInt(msenda[1]);j++){
                            //if(region_a.find(e => e === (i+","+j))!==(i+","+j)){
                                region_a.push(i+","+j)
                                //count++
                            //}
                            //else if(region_a.find(e => e === (i+","+j))===(i+","+j)){
                                
                            //}
                        }
                    }
                }

                else if(msstarta[0]>=msenda[0]&&msstarta[1]>=msenda[1]){
                    for(let i=parseInt(msenda[0]);i<=parseInt(msstarta[0]);i++){
                        for(let j=parseInt(msenda[1]);j<=parseInt(msstarta[1]);j++){
                            //if(region_a.find(e => e === (i+","+j))!==(i+","+j)){
                                region_a.push(i+","+j)
                                //count++
                            //}
                        }
                    }
                }   

                else if(msstarta[0]>msenda[0]&&msstarta[1]<msenda[1]){
                    for(let i=parseInt(msenda[0]);i<=parseInt(msstarta[0]);i++){
                        for(let j=parseInt(msstarta[1]);j<=parseInt(msenda[1]);j++){
                            //if(region_a.find(e => e === (i+","+j))!==(i+","+j)){
                            region_a.push(i+","+j)
                                //count++
                            //}
                        }
                    }
                }

                else if(msstarta[0]<msenda[0]&&msstarta[1]>msenda[1]){
                    for(let i=parseInt(msstarta[0]);i<=parseInt(msenda[0]);i++){
                        for(let j=parseInt(msenda[1]);j<=parseInt(msstarta[1]);j++){
                            //if(region_a.find(e => e === (i+","+j))!==(i+","+j)){
                                region_a.push(i+","+j)
                                //count++
                            //}
                        }
                    }
                }

                

                for(let i = 0; i<region_a.length;i++){
                    for(let j = 0; j<region_a.length;j++){
                        if(i!==j){
                            if(region_a[i]===region_a[j]){

                                region_a.splice(j,1)
                                region_a.splice(i,1)
                                
                                //console.log("fuck")
                            }
                    }
                    }
                }

                console.log(region_a)

                this.setState(prevState => ({
                    //regions:"0",
                    regions:region_a            
                }))
                
                this.idtodate()
                
            }
        }
        else if(this.state.type===1){
            var region_a=this.state.regions
            var selected_tim_a = []
            var temp_che=0
            if(event.type==="mousedown"){
                for(let i = 0; i<region_a.length; i++){
                    if(event.target.id===region_a[i]){
                        temp_che=1
                    }
                }
                if(temp_che===1){
                    selected_tim_a.push(event.target.id)
                    this.setState(prevState => ({
                        selected_tim:selected_tim_a            
                    }))
                    console.log(selected_tim_a)
                }
            }
        }

    }

    idtodate(){
        var days = this.state.days
        var times= this.state.times

        var region_a=this.state.regions
        var region_dates=[]
        var temp=[]

        for(let i=0;i<region_a.length;i++){
            temp=region_a[i].split(",")
            region_dates[i]=days[temp[0]]+" "+times[temp[1]]
        }

        console.log(region_dates)
        this.setState(prevState => ({
            regions_dat:region_dates           
        }))

    }

    //selected "grey"
    Highlighted(id){
 
        var region_a=this.state.regions

        for(let i =0;i<region_a.length;i++){
            if(id===region_a[i]){
                return true
            }
        }

        return false

    }


    //not slected "blue"
    isHighlighted(id) {

        if(this.state.type===0){
            var msstarta= this.state.msstart.split(",")
            var msenda= this.state.msend.split(",")

            //console.log(region_a)

            //diagonal right down
            for(let i=parseInt(msstarta[0]);i<=parseInt(msenda[0]);i++){
                for(let j=parseInt(msstarta[1]);j<=parseInt(msenda[1]);j++){
                    if(id===(i+","+j)) {
                        return true
                    }
                }
            }

            //diagonal left up 
            for(let i=parseInt(msenda[0]);i<=parseInt(msstarta[0]);i++){
                for(let j=parseInt(msenda[1]);j<=parseInt(msstarta[1]);j++){
                    if(id===(i+","+j)) {
                        return true
                    }
                }
            }

            //diagonal left down
            for(let i=parseInt(msenda[0]);i<=parseInt(msstarta[0]);i++){
                for(let j=parseInt(msstarta[1]);j<=parseInt(msenda[1]);j++){
                    if(id===(i+","+j)) {
                        return true
                    }
                }
            }

            //diagonal right up
            for(let i=parseInt(msstarta[0]);i<=parseInt(msenda[0]);i++){
                for(let j=parseInt(msenda[1]);j<=parseInt(msstarta[1]);j++){
                    if(id===(i+","+j)) {
                        return true
                    }
                }
            }
        }


        return false
    }

    selHighlighted(id){
        var selected_tim_a = this.state.selected_tim

        if(this.state.type===1){

            if(id===selected_tim_a[0]){
                return true

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