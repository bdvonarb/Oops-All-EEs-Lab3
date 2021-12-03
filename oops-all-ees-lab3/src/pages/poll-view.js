import * as React from 'react'
import {isloggedin} from '../components/auth'
import Layout from '../components/layout'
import { navigate } from 'gatsby-link'
import PollOptions from '../components/poll-options'
import getFirebase from '../../firebase'
import swal from 'sweetalert'
import TimeSlotPicker from '../components/time-slot-picker'
import PollVoteModal from '../components/poll-vote-modal'

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
            gotPoll:false,
            modalShow:false,
            modalParams:{day:"", startTime:"",endTime:"",region:"",names:[]}
        }

        this.PollOptions = React.createRef()
        this.getPoll = this.getPoll.bind(this)
        this.componentDidMount = this.componentDidMount.bind(this)
        this.regionSelect = this.regionSelect.bind(this)
        this.reserveSlot = this.reserveSlot.bind(this)
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
                    gotPoll:true,
                    modalShow:false,
                    modalParams:{day:"", startTime:"",endTime:"",region:"",names:[]}
                }))
                console.log(this.state)
                if(this.PollOptions.current) {
                    this.PollOptions.current.updateState(data)
                } else {
                    console.log("saved weird as error?")
                    //console.trace()
                }
            })
        })
    }

    regionSelect(regionIndex) {
        console.log(regionIndex)
        if(this.state.regions[regionIndex].names && this.state.regions[regionIndex].names.length >= this.state.vps) {
            swal("Cannot Reserve", "The maximum number of people have already signed up for this timeslot", "warning")
        } else {
            var regionStartInt = this.state.regions[regionIndex].cells[0].split(',').map((val) => parseInt(val))
            var regionEndInt = this.state.regions[regionIndex].cells[this.state.regions[regionIndex].cells.length-1].split(',').map((val) => parseInt(val))
            var day = TimeSlotPicker.dayIndexToDayString(regionStartInt[0],this.state.startDate)
            var startTime = TimeSlotPicker.timeIndexToTimeString(regionStartInt[1])
            var endTime = TimeSlotPicker.timeIndexToTimeString(regionEndInt[1]+1)
            var names = this.state.regions[regionIndex].names
            this.setState(prevState => ({
                modalParams:{day:day, startTime:startTime,endTime:endTime,region:regionIndex,names:names}
            }))
            this.setModalShow(true)
        }
    }

    reserveSlot(regionIndex, name) {
        var occurences = 0
        for(const region of this.state.regions) {
            if(region.names) {
                for(const rname of region.names) {
                    if(name===rname) {
                        occurences++
                    }
                }
            }
        }
        if(occurences >= this.state.vpp) {
            swal("Cannot Reserve", "You have already signed up for the maximum number of time slots", "warning")
        } else {
            var newRegions = [...this.state.regions]
            if(newRegions[regionIndex].names) {
                newRegions[regionIndex].names.push(name)
            } else {
                newRegions[regionIndex].names = [name]
            }
            this.setState(prevState => ({
                regions:newRegions
            }))
            this.setModalShow(false)
            this.saveReservation(regionIndex)
        }
    }

    saveReservation(regionIndex) {
        const lazyApp = import('firebase/app')
        const lazyDatabase = import('firebase/database')

        Promise.all([lazyApp, lazyDatabase]).then(([f, fdb]) => {
            const database = fdb.getDatabase(getFirebase(f))

            const regionData = this.state.regions[regionIndex]

            const updates = {}
            updates['/polls/' + this.state.id + "/regions/" + regionIndex] = regionData
            
            return fdb.update(fdb.ref(database), updates)
        })
        this.setState(prevState => ({
            gotPoll:false
        }))
        swal("Reservation Saved!", "You are signed up for " + this.state.modalParams.day + " from " +this.state.modalParams.startTime + " to " + this.state.modalParams.endTime, "success")
        this.getPoll()
    }

    setModalShow(show) {
        this.setState(prevState => ({
            modalShow: show
        }))
    }

    render() {
        if(!isloggedin() && (this.state.title && !this.state.publish)) {
            swal("This poll is not published and cannot be viewed",)
            if(isBrowser) {
                navigate("/log-in")
            }
            return null
        }
        if(!this.state.gotPoll) {
            return (
                <Layout pageTitle="View Poll: Oops All EEs Doodle">
                    <div style={{backgroundColor:"#ffffff", borderRadius:"10px", border:"1px solid #000000", width:"90%", height:"100%", margin:"0 auto", display:"flex", flexDirection:"column", padding:"10px"}}>
                        
                    </div>
                </Layout>
            )
        }
        return (
            <Layout pageTitle="View Poll: Oops All EEs Doodle">
                <div style={{backgroundColor:"#ffffff", borderRadius:"10px", border:"1px solid #000000", width:"90%", height:"100%", margin:"0 auto", display:"flex", flexDirection:"column", padding:"10px"}}>
                    <PollOptions state={this.state} view ref={this.PollOptions}></PollOptions>
                    <TimeSlotPicker key={Date()} style={{flex:"1"}} type={1} startDate={this.state.startDate} endDate={this.state.endDate} regions={this.state.regions} regionSelectCallback={this.regionSelect} ref={this.TimeSlotPicker}></TimeSlotPicker>
                </div>
                <PollVoteModal show={this.state.modalShow} onHide={() => this.setModalShow(false)} reserveCallback={this.reserveSlot} day={this.state.modalParams.day} startTime={this.state.modalParams.startTime} endTime={this.state.modalParams.endTime} region={this.state.modalParams.region} names={this.state.modalParams.names}></PollVoteModal>
            </Layout>
        )
    }

    
}

export default EditPollPage