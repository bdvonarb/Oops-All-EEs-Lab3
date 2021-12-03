import * as React from 'react'
import {isloggedin} from '../components/auth'
import Layout from '../components/layout'
import { navigate } from 'gatsby-link'
import PollOptions from '../components/poll-options'
import getFirebase from '../../firebase'
import swal from 'sweetalert'
import TimeSlotPicker from "../components/time-slot-picker"
import TimeslotModal from '../components/create-timeslot-modal'


class NewPollPage extends React.Component {
    constructor(props) {
        super(props);
        //should get title, startDate, endDate, and timezone from props.location.state

        this.state = {...props.location.state, location:"", description:"", vps:1,vpp:1,publish:false,regions:[],modalShow:false, tmpRegion:{startTime:"", endTime:"", startDay:"", endDay:""}}

        this.newPoll = this.newPoll.bind(this)
        this.newRegion = this.newRegion.bind(this)
        this.dateChange = this.dateChange.bind(this)
        this.createRegions = this.createRegions.bind(this)
    }

    newPoll (poll) {
        const lazyApp = import('firebase/app')
        const lazyDatabase = import('firebase/database')
        var newPollKey

        Promise.all([lazyApp, lazyDatabase]).then(([f, fdb]) => {
            const database = fdb.getDatabase(getFirebase(f))

            newPollKey = fdb.push(fdb.child(fdb.ref(database), 'polls')).key

            const pollData = {...poll, id:newPollKey, regions:this.state.regions}

            const updates = {}
            updates['/polls/' + newPollKey] = pollData
            
            return fdb.update(fdb.ref(database), updates)
        })
        navigate("/poll-list")
        swal("Poll Saved!", "Would you like to copy a link to your poll to share with participants?", "success", {buttons:["No Thanks!", "Copy Link"]})
        .then((value) => {
            if(value) {
                const link = this.props.location.origin + "/poll-view?id=" + newPollKey
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
            swal("You must be signed in to view this page")
            navigate("/log-in")
            return null
        }
        return (
            <Layout pageTitle="New Poll: Oops All EEs Doodle">
                <div style={{backgroundColor:"#ffffff", borderRadius:"10px", border:"1px solid #000000", width:"90%", height:"100%", margin:"0 auto", display:"flex", flexDirection:"column", padding:"10px"}}>
                    <PollOptions state={this.state} saveCallback={this.newPoll} dateCallback={this.dateChange}></PollOptions>
                    <TimeSlotPicker key={Date()} style={{flex:"1"}} type={0} startDate={this.state.startDate} endDate={this.state.endDate} regions={this.state.regions} regionCreateCallback={this.newRegion}></TimeSlotPicker>
                </div>
                <TimeslotModal show={this.state.modalShow} onHide={() => this.setModalShow(false)} startTime={this.state.tmpRegion.startTime} endTime={this.state.tmpRegion.endTime} startDay={this.state.tmpRegion.startDay} endDay={this.state.tmpRegion.endDay} createCallback={this.createRegions}></TimeslotModal>
            </Layout>
        )
    }

    
}

export default NewPollPage