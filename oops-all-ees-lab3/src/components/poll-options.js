import { navigate } from 'gatsby-link'
import * as React from 'react'
import {Form, Row, Col} from 'react-bootstrap'
import '../styles/fa/css/all.css'
import tzInts from './timezones.js'
import {getUser} from '../components/auth'
import swal from 'sweetalert'

class PollOptions extends React.Component {
    constructor(props) {
        super(props)
        //console.log(end);
        //this.state = {title: "", startDate: start.toJSON().slice(0,10), endDate: end.toJSON().slice(0,10), disabledate: false, timezone: "NaN", helpText: "Selected date range spans 7 days"}
        this.state = {...props.state, helpText:"", disabled:props.view, fail:false, edit:props.edit}
        console.log(this.state)

        this.saveCallback = props.saveCallback.bind(this)

        this.simpleChangeHandler = this.simpleChangeHandler.bind(this)
        this.handleDateChange = this.handleDateChange.bind(this)
        this.handleTitle = this.handleTitle.bind(this)
        this.handleTimezone = this.handleTimezone.bind(this)
        this.handleCheckbox = this.handleCheckbox.bind(this)
        this.submitForm = this.submitForm.bind(this)
    }

    updateState(state) {
        this.setState(prevState => ({
            ...state
        }))
    }

    simpleChangeHandler(event) {
        this.setState(prevState => ({
            [event.target.name]:event.target.value
        }))
    }

    handleDateChange(event) {
        //console.log(event.target.value)
        if(event.target.name === "startDate") {
            this.setState(prevState => ({
                startDate: event.target.value
            }))
        } else if (event.target.name === "endDate") {
            this.setState(prevState => ({
                endDate: event.target.value
            }))
        }
    }

    handleTitle(event){
        if(event.target.value!=="") {
            this.setState(prevState => ({
                title: event.target.value
            }))
        } else {
            this.setState(prevState => ({
                title: event.target.value,
                helpText: "<Error>Title cannot be empty"
            }))
        }
    }

    handleCheckbox(event) {
        this.setState(prevState => ({
            [event.target.name]:event.target.checked
        }))
    }

    handleTimezone(event) {
        if(event.target.value!=="NaN") {
            this.setState(prevState => ({
                timezone: event.target.value
            }))
        } else {
            this.setState(prevState => ({
                timezone: event.target.value,
                helpText: "<Error>You must select a Timezone"
            }))
        }
    }

    submitForm(event){
        event.preventDefault()
        console.log("submit attempt")
        //start validation
        var error = 0;
        if(this.state.title===""){
            error |= 0x01
        }
        if(this.state.timezone==="NaN") {
            error |= 0x02
        }
        var daydif = (Date.parse(this.state.endDate) - Date.parse(this.state.startDate))/(24*60*60*1000) + 1
        if(daydif <= 0) {
            error |= 0x04
        }
        if(!error) {
            //success
            console.log("success")
            const User = getUser()
            this.saveCallback({
                title:this.state.title,
                startDate:this.state.startDate,
                author:User.name,
                endDate:this.state.endDate,
                timezone:this.state.timezone,
                location:this.state.location,
                description:this.state.description,
                vps:this.state.vps,
                vpp:this.state.vpp,
                publish:this.state.publish
            })
        } else {
            //at least one test failed
            console.log("fail" + error)
            var help = "<Error>Errors in form: "
            if(error & 0x01) {
                help += "Empty Title, "
            }
            if(error & 0x02) {
                help += "Empty Timezone, "
            }
            if(error & 0x04) {
                help += "Bad date range, "
            }
            this.setState(prevState => ({
                helpText: help.slice(0,-2)
            }))
        }
    }

    render() {
        return (
            <Form onSubmit={(event) => {event.preventDefault()}}>
                <fieldset disabled={this.state.disabled}>
                    <Col>
                        <Row className="mb-3">{/*this row contains poll title, publish, save, and cancel fields*/}
                            <Col xs="auto">
                                <Form.Label style={{margin:"12px 0"}} >Poll Title:</Form.Label>
                            </Col>
                            <Col xs="auto">
                                <Form.Control type="text" size="lg" style={{display:"inline-block",width:"20em"}} value={this.state.title} onChange={this.handleTitle}/>
                            </Col>
                            <Col/> {/*This Col acts to separate the title field and the rest */}
                            <Col xs="auto" style={{paddingRight:"0"}}>
                                <Form.Label style={{margin:"12px 0"}}>Publish:</Form.Label>
                            </Col>
                            <Col xs="auto">
                                <Form.Check style={{margin:"12px 0"}} type="checkbox" name="publish" checked={this.state.publish} onChange={this.handleCheckbox}></Form.Check>
                            </Col>
                            <Col xs="auto">
                                <button type="button" className="btn btn-info" onClick={this.submitForm} style={{display:'inline-block',width:'90px',margin:"5px 0"}}>Save</button>
                            </Col>
                            <Col xs="auto">
                                <button type="button" className="btn btn-danger" onClick={()=>{
                                    var text = ""
                                    if (this.state.edit) {
                                        text = "Are you sure you want to discard your changes?"
                                    } else {
                                        text = "Are you sure you want to discard this poll?"
                                    }
                                    swal("Are you sure?", text, "warning", {buttons: ["Cancel", "Discard"], dangerMode:true})
                                    .then((value) => {
                                        if (value) {
                                            navigate("/poll-list")
                                        }
                                    })
                                }} style={{display:'inline-block',width:'90px',margin:"5px 0"}}>Cancel</button>
                            </Col>
                        </Row>
                        <Row>
                            <Col> {/*This column contains start date and end date pickers*/}
                                <Row className="mb-3">
                                    <Col xs="auto">
                                        <Form.Label style={{padding:"7px 0"}}>Start Date:</Form.Label>
                                    </Col>
                                    <Col className='col-8'>
                                        <Form.Control type="date" name='startDate' value={this.state.startDate} max={this.state.endDate} onChange={this.handleDateChange}/> 
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="auto">
                                        <Form.Label style={{padding:"7px 0"}}>&nbsp;&nbsp;End Date:</Form.Label>
                                    </Col>
                                    <Col className='col-8'>
                                        <Form.Control type="date" name='endDate' value={this.state.endDate} min={this.state.startDate} onChange={this.handleDateChange}/> 
                                    </Col>
                                </Row>
                            </Col>
                            <Col> {/*This column contains timezone selector and vote control options*/}
                                <Row>
                                    <Col xs="auto">
                                        <Form.Label style={{padding:"12px 0"}}>Timezone:</Form.Label>
                                    </Col>
                                    <Col/>
                                    <Col xs="auto">
                                        <Form.Select style={{padding:"12px 5px", width:"200px",height:"46px"}} value={this.state.timezone} onChange={this.handleTimezone}>
                                            {tzInts.map((tz, index) => (
                                                <option value={tz.value} key={index+1}>{tz.label}</option>
                                            ))}
                                        </Form.Select>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="auto">
                                        <Form.Label style={{padding:"7px 0"}}>Votes Per Slot:</Form.Label>
                                    </Col>
                                    <Col/>
                                    <Col xs="auto">
                                        <Form.Control type="number" name="vps" min="1" value={this.state.vps} style={{width:"60px"}} onChange={this.simpleChangeHandler}/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="auto">
                                        <Form.Label style={{padding:"7px 0"}}>Votes Per Participant:</Form.Label>
                                    </Col>
                                    <Col/>
                                    <Col xs="auto">
                                        <Form.Control type="number" name="vpp" min="1" value={this.state.vpp} style={{width:"60px"}} onChange={this.simpleChangeHandler}/>
                                    </Col>
                                </Row>
                            </Col>
                            <Col> {/*This column contains location and description boxes*/}
                                <Row>
                                    <Col xs="auto">
                                        <Form.Label style={{padding:"7px 0"}}>Location:</Form.Label>
                                    </Col>
                                    <Col>
                                        <Form.Control type="text" name="location" value={this.state.location} onChange={this.simpleChangeHandler}></Form.Control>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="auto">
                                        <Form.Label>Notes:</Form.Label>
                                    </Col>
                                    <Col>
                                        <Form.Control as="textarea" name="description" value={this.state.description} style={{height:"95px"}} onChange={this.simpleChangeHandler}></Form.Control>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </fieldset>
            </Form>
        )
    }
}

export default PollOptions