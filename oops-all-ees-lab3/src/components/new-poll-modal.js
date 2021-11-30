import * as React from 'react'
import {Modal, Form, Row, Col} from 'react-bootstrap'
import '../styles/fa/css/all.css'
import tzInts from './timezones.js'

class NewPollModal extends React.Component {
    constructor(props) {
        super(props)

        var start = new Date(Date.now())
        this.week = new Date(7*24*60*60*1000)
        //console.log(this.week)
        var end = new Date(start.getTime() + this.week.getTime() - 24*60*60*1000)
        //console.log(end);
        this.state = {title: "", startDate: start.toJSON().slice(0,10), endDate: end.toJSON().slice(0,10), disabledate: false, timezone: "NaN", helpText: "Selected date range spans 7 days"}

        this.handleQuickOptions = this.handleQuickOptions.bind(this)
        this.handleDateChange = this.handleDateChange.bind(this)
        this.handleTitle = this.handleTitle.bind(this)
        this.handleTimezone = this.handleTimezone.bind(this)
        this.submitForm = this.submitForm.bind(this)
    }

    handleQuickOptions(event){
        var id = event.target.id
        //console.log(this.state.endDate)
        if(id === "man") {
            this.setState(prevState => ({
                disabledate: false
            }))
        } else if (id === "ths") {
            var now = new Date(Date.now());
            var start = new Date(now.getTime() - now.getDay()*24*60*60*1000)
            var end = new Date(start.getTime() + this.week.getTime() - 24*60*60*1000)
            //console.log(start)
            //console.log(end)
            this.setState(prevState => ({
                disabledate: true,
                startDate: start.toJSON().slice(0,10),
                endDate: end.toJSON().slice(0,10),
                helpText: "Selected date range spans 7 days"
            }))
        } else if (id === "nxt") {
            now = new Date(Date.now());
            start = new Date(now.getTime() + (7-now.getDay())*24*60*60*1000)
            end = new Date(start.getTime() + this.week.getTime() - 24*60*60*1000)
            //console.log(start)
            //console.log(end)
            this.setState(prevState => ({
                disabledate: true,
                startDate: start.toJSON().slice(0,10),
                endDate: end.toJSON().slice(0,10),
                helpText: "Selected date range spans 7 days"
            }))
        }
    }

    handleDateChange(event) {
        //console.log(event.target.value)
        if(event.target.name === "startDate") {
            var daydif = (Date.parse(this.state.endDate) - Date.parse(event.target.value))/(24*60*60*1000) + 1
            if(daydif > 0) {
                this.setState(prevState => ({
                    startDate: event.target.value,
                    helpText: "Selected date range spans " + daydif + " days"
                }))
            } else {
                this.setState(prevState => ({
                    startDate: event.target.value,
                    helpText: "<Error>Start Date cannot be after End Date"
                }))
            }
        } else if (event.target.name === "endDate") {
            daydif = (Date.parse(event.target.value) - Date.parse(this.state.startDate))/(24*60*60*1000) + 1
            if(daydif > 0) {
                this.setState(prevState => ({
                    endDate: event.target.value,
                    helpText: "Selected date range spans " + daydif + " days"
                }))
            } else {
                this.setState(prevState => ({
                    endDate: event.target.value,
                    helpText: "<Error>End Date cannot be before Start Date"
                }))
            }
        }
    }

    handleTitle(event){
        if(event.target.value!=="") {
            var daydif = (Date.parse(this.state.endDate) - Date.parse(this.state.startDate))/(24*60*60*1000) + 1
            this.setState(prevState => ({
                title: event.target.value,
                helpText: "Selected date range spans " + daydif + " days"
            }))
        } else {
            this.setState(prevState => ({
                title: event.target.value,
                helpText: "<Error>Title cannot be empty"
            }))
        }
    }

    handleTimezone(event) {
        if(event.target.value!=="NaN") {
            var daydif = (Date.parse(this.state.endDate) - Date.parse(this.state.startDate))/(24*60*60*1000) + 1
            this.setState(prevState => ({
                timezone: event.target.value,
                helpText: "Selected date range spans " + daydif + " days"
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
            <Modal 
                {...this.props}
                size="lg"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                    New Poll - Quick Start
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={this.submitForm}>
                        <Col className="mb-3">
                            <Row className="mb-3">
                                <Col>
                                    <Form.Label style={{display:"block", width:"100px", textAlign:"right", padding:"12px 0"}}>Poll Title:</Form.Label>
                                </Col>
                                <Col className='col-10'>
                                    <Form.Control type="text" size="lg" onChange={this.handleTitle}/>
                                </Col>
                            </Row>
                            <Row className="mb-3">
                                <Col>
                                    <Row>
                                        <Col>
                                            <Form.Label style={{display:"block", width:"100px", textAlign:"right", padding:"12px 0"}}>Quick Date Options:</Form.Label>
                                        </Col>
                                        <Col className="col-8">
                                            <Form.Check id="man" type="radio" name="quickgroup" label="Manually Select Dates" defaultChecked onChange={this.handleQuickOptions}/>
                                            <Form.Check id="ths" type="radio" name="quickgroup" label="This Week" onChange={this.handleQuickOptions}/>
                                            <Form.Check id="nxt" type="radio" name="quickgroup" label="Next Week" onChange={this.handleQuickOptions}/>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col>
                                    <Row>
                                        <Col>
                                            <Form.Label style={{display:"block", width:"100px", textAlign:"right", padding:"12px 0"}}>Timezone:</Form.Label>
                                        </Col>
                                        <Col className="col-8">
                                            <Form.Select style={{padding:"12px 0"}} onChange={this.handleTimezone}>
                                                <option value="NaN" key="0">Select Timezone</option>
                                                {tzInts.map((tz, index) => (
                                                    <option value={tz.value} key={index+1}>{tz.label}</option>
                                                ))}
                                            </Form.Select>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row className="mb-3">
                                <Col>
                                    <Row className="g-2">
                                        <Col>
                                            <Form.Label style={{display:"block", width:"100px", textAlign:"right", padding:"7px 0"}}>Start Date:</Form.Label>
                                        </Col>
                                        <Col className='col-8'>
                                            <Form.Control type="date" name='startDate' value={this.state.startDate} disabled={this.state.disabledate} onChange={this.handleDateChange}/> 
                                        </Col>
                                    </Row>
                                </Col>
                                <Col>
                                    <Row className="g-2">
                                        <Col>
                                            <Form.Label style={{display:"block", width:"100px", textAlign:"right", padding:"7px 0"}}>End Date:</Form.Label>
                                        </Col>
                                        <Col className='col-8'>
                                            <Form.Control type="date" name='endDate' value={this.state.endDate} disabled={this.state.disabledate} onChange={this.handleDateChange} /> 
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    {this.state.helpText.slice(0,7)==="<Error>"?<>
                        <p className="text-danger">
                            {this.state.helpText.slice(7)}
                        </p>
                        </>:<>
                        <p className="text-muted">
                            {this.state.helpText}
                        </p>
                        </>
                    }
                    
                    <button type="button" className="btn btn-info" onClick={this.submitForm} style={{marginLeft:'5px',float:'right'}}>
                        Continue
                    </button>
                    <button type="button" className="btn btn-danger" onClick={this.props.onHide} style={{marginLeft:'5px',float:'right'}}>
                        Cancel
                    </button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default NewPollModal