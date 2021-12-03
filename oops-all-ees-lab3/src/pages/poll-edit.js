import * as React from 'react'
import {isloggedin} from '../components/auth'
import Layout from '../components/layout'
import { navigate } from 'gatsby-link'
import PollOptions from '../components/poll-options'
import getFirebase from '../../firebase'
import swal from 'sweetalert'
import TimeSlotPicker from "../components/time-slot-picker"
import TimeslotModal from '../components/create-timeslot-modal'

const isBrowser = typeof window !== "undefined"

class EditPollPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title:"",
            startDate:"",
            author:"",
            endDate:"",
            timezone:"",
            location:"",
            description:"",
            vps:"",
            vpp:"",
            publish:"",
            id:props.location.search.slice(props.location.search.indexOf("?id=")+4),
            regions:[],
            modalShow: false,
            tmpRegion:{startTime:"", endTime:"", startDay:"", endDay:""},
            gotPoll:false
        }

        //console.log(props.location)

        this.PollOptions = React.createRef()
        this.getPoll = this.getPoll.bind(this)
        this.savePoll = this.savePoll.bind(this)
        this.componentDidMount = this.componentDidMount.bind(this)
        this.newRegion = this.newRegion.bind(this)
        this.dateChange = this.dateChange.bind(this)
        this.createRegions = this.createRegions.bind(this)
        this.setModalShow = this.setModalShow.bind(this)
    }

    componentDidMount() {
        console.log("comp did mount")
        this.getPoll()
    }

    getPoll() {
        const lazyApp = import('firebase/app')
        const lazyDatabase = import('firebase/database')

        Promise.all([lazyApp, lazyDatabase]).then(([f, fdb]) => {
            const database = fdb.getDatabase(getFirebase(f))
            const dataref = fdb.query(fdb.ref(database, 'polls/'+this.state.id))
            fdb.onValue(dataref, (snapshot) => {
                const data = snapshot.val();
                this.setState(prevState => ({
                    ...data,
                    modalShow: false,
                    tmpRegion:{startTime:"", endTime:"", startDay:"", endDay:""},
                    gotPoll:true
                }))
                console.log(this.state)
                if(this.PollOptions.current) {
                    this.PollOptions.current.updateState(data)
                } else {
                    console.log("saved weird as error?")
                    //console.trace()
                }
                /*if(this.TimeSlotPicker.current) {
                    this.TimeSlotPicker.current.updateState(TimeSlotPicker.setup({startDate:data.startDate,endDate:data.endDate,regions:data.regions,regionCreateCallback:this.newRegion}))
                }*/
            })
        })
    }

    savePoll (poll) {
        const lazyApp = import('firebase/app')
        const lazyDatabase = import('firebase/database')

        Promise.all([lazyApp, lazyDatabase]).then(([f, fdb]) => {
            const database = fdb.getDatabase(getFirebase(f))

            const pollData = {...poll, id:this.state.id, regions:this.state.regions}

            const updates = {}
            updates['/polls/' + this.state.id] = pollData
            
            return fdb.update(fdb.ref(database), updates)
        })
        navigate("/poll-list")
        swal("Poll Saved!", "Would you like to copy a link to your poll to share with participants?", "success", {buttons:["No Thanks!", "Copy Link"]})
        .then((value) => {
            if(value) {
                const link = this.props.location.origin + "/poll-view?id=" + this.state.id
                navigator.clipboard.writeText(link)
                swal("Copied!",link,"success")
            }
        })
    }

    dateChange(newStart, newEnd) {
        var dif = (Date.parse(newStart) - Date.parse(this.state.startDate))/(24*60*60*1000)
        console.log(dif)

        var newRegions = [...this.state.regions]
        for(var i = 0; i < newRegions.length; i++) {
            newRegions[i].cells.forEach((cell, index, cells) => {
                var intCell = cell.split(',').map((val) => parseInt(val))
                intCell[0] -= dif
                cells[index] = intCell[0] + ',' + intCell[1]
            })
        }
        console.log(newRegions)
        this.setState(prevState => ({
            startDate: newStart,
            endDate: newEnd,
            regions: newRegions
        }))
    }

    newRegion(cells) {
        var integerCells = cells.map((cell)=> cell.split(',').map((val) => parseInt(val)))
        //check for delete blocks
        var newRegions = this.state.regions
        var deleteRegions = []
        for(const region of newRegions) {
            for(const rcell of region.cells) {
                for(const ncell of cells) {
                    if(rcell === ncell) {
                        deleteRegions.push(newRegions.findIndex((r) => JSON.stringify(r) === JSON.stringify(region)))
                    }
                }
            }
        }

        deleteRegions = [...new Set(deleteRegions)]

        if(deleteRegions.length) {
            newRegions = newRegions.filter((region,index1) => !deleteRegions.some((index2) => index2 === index1))
            this.setState(prevState => ({
                regions: newRegions
            }))
            return
        }
        var newRegion = {names:[],cells:cells}
        var tmpRegion = {startTime:integerCells[0][1], endTime:integerCells[integerCells.length-1][1], startDay:integerCells[0][0], endDay:integerCells[integerCells.length-1][0]}
        console.log(tmpRegion)
        this.setState(prevState => ({
            tmpRegion: tmpRegion
        }))
        this.setModalShow(true)
    }

    createRegions(startDay, endDay, startTime, slots, length) {
        var newRegions = []
        for(let day = startDay; day <= endDay; day++) {
            for(let time = startTime; time < startTime+slots*length; time+=length) {
                var cells = []
                for(let cellTime = time; cellTime < time+length; cellTime++) {
                    cells.push(day+","+cellTime)
                }
                newRegions.push({names:[],cells:cells})
            }
        }
        console.log(newRegions)
        if(this.state.regions) {
            this.setState(prevState => ({
                regions: [...prevState.regions, ...newRegions]
            }))
        } else {
            this.setState(prevState => ({
                regions: newRegions
            }))
        }
        this.setModalShow(false)
    }

    setModalShow(show) {
        this.setState(prevState => ({
            modalShow: show
        }))
    }


    render() {
        if(!isloggedin()) {
            swal("You must be signed in to view this page",)
            if(isBrowser) {
                navigate("/log-in")
            }
            return null
        }

        if(!this.state.gotPoll) {
            return (
                <Layout pageTitle="Edit Poll: Oops All EEs Doodle">
                    <div style={{backgroundColor:"#ffffff", borderRadius:"10px", border:"1px solid #000000", width:"90%", height:"100%", margin:"0 auto", display:"flex", flexDirection:"column", padding:"10px"}}>
                        
                    </div>
                </Layout>
            )
        }
        //console.log(this.state)
        return (
            <Layout pageTitle="Edit Poll: Oops All EEs Doodle">
                <div style={{backgroundColor:"#ffffff", borderRadius:"10px", border:"1px solid #000000", width:"90%", height:"100%", margin:"0 auto", display:"flex", flexDirection:"column", padding:"10px"}}>
                    <PollOptions state={this.state} saveCallback={this.savePoll} edit ref={this.PollOptions}></PollOptions>
                    <TimeSlotPicker key={Date()} style={{flex:"1"}} type={0} startDate={this.state.startDate} endDate={this.state.endDate} regions={this.state.regions} regionCreateCallback={this.newRegion} ref={this.TimeSlotPicker}></TimeSlotPicker>
                </div>
                <TimeslotModal show={this.state.modalShow} onHide={() => this.setModalShow(false)} startTime={this.state.tmpRegion.startTime} endTime={this.state.tmpRegion.endTime} startDay={this.state.tmpRegion.startDay} endDay={this.state.tmpRegion.endDay} createCallback={this.createRegions}></TimeslotModal>
            </Layout>
        )
    }

    
}

export default EditPollPage