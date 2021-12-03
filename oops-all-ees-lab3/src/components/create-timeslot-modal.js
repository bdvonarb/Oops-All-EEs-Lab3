import { navigate } from 'gatsby-link'
import * as React from 'react'
import {Modal, Form, Row, Col} from 'react-bootstrap'
import '../styles/fa/css/all.css'
import TimeSlotPicker from './time-slot-picker'


class TimeslotModal extends React.Component {
    constructor(props) {
        super(props)

        this.state = {startTime:props.startTime, endTime:props.endTime, slots:1, length:(props.endTime - props.startTime + 1), startDay:props.startDay, endDay:props.endDay, slotText:TimeslotModal.generateSlotsText(props.startTime, 1, 1)}
        this.createCallback = props.createCallback.bind(this)
        this.submitForm = this.submitForm.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if(nextProps.startTime !== prevState.startTime || nextProps.endTime !== prevState.endTime || nextProps.startDay !== prevState.startDay || nextProps.endDay !== prevState.endDay) {
            console.log(nextProps)
            return {startTime:nextProps.startTime, endTime:nextProps.endTime, slots:1, length:(nextProps.endTime - nextProps.startTime + 1), startDay:nextProps.startDay, endDay:nextProps.endDay, slotText:TimeslotModal.generateSlotsText(nextProps.startTime, 1, 1)}
        } else {
            return null
        }
    }

    handleChange(event) {
        if(event.target.name === "slots") {
            var newSlots = Math.floor(event.target.value)
            if(newSlots) {
                var newLength = Math.floor((this.state.endTime - this.state.startTime + 1)/newSlots);
                console.log(newLength)
                if(newLength) {
                    this.setState(prevState => ({
                        slots:newSlots,
                        length:newLength,
                        slotText:TimeslotModal.generateSlotsText(prevState.startTime, newSlots, newLength)
                    }))
                }
            }
        } else if (event.target.name === "length") {
            var newLength = Math.round(event.target.value/15)
            if(newLength) {
                var newSlots = Math.floor((this.state.endTime - this.state.startTime + 1)/newLength);
                if(newSlots) {
                    this.setState(prevState => ({
                        slots:newSlots,
                        length:newLength,
                        slotText:TimeslotModal.generateSlotsText(prevState.startTime, newSlots, newLength)
                    }))
                }
            }
        }
    }

    static generateSlotsText(startTime, slots, length) {
        var text = "Time slots starting at: "
        for(let i = 0; i < slots; i++) {
            text += TimeSlotPicker.timeIndexToTimeString(startTime + i*length) + ", "
        }
        return text.slice(0,-2)
    }

    submitForm(event) {
        this.createCallback(this.state.startDay, this.state.endDay, this.state.startTime, this.state.slots, this.state.length)
    }


    render() {
        return (
            <Modal 
                show={this.props.show}
                onHide={this.props.onHide}
                size="lg"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                    Create Timeslot
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={this.submitForm}>
                        <Col>
                            <Row>
                                <p className="text-muted">Selection spans {this.state.endDay - this.state.startDay + 1} days</p>
                            </Row>
                            <Row>
                                <Col xs="auto">
                                    <Form.Label style={{display:"block", textAlign:"right", padding:"7px 0"}}>Slots per Day:</Form.Label>
                                </Col>
                                <Col className='col-10'>
                                    <Form.Control name="slots" type="number" min="1" value={this.state.slots} onChange={this.handleChange}/>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs="auto">
                                    <Form.Label style={{display:"block", textAlign:"right", padding:"7px 0"}}>Length of Slot:</Form.Label>
                                </Col>
                                <Col className='col-10'>
                                    <Form.Control name="length" type="number" min="15" value={this.state.length * 15} step="15" onChange={this.handleChange}/>
                                </Col>
                            </Row>
                            <Row>
                            <p className="text-muted">{this.state.slotText}</p>
                            </Row>
                        </Col>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <p className="text-muted">
                        Create {this.state.slots*(this.state.endDay - this.state.startDay + 1)} total slots across {this.state.endDay - this.state.startDay + 1} days
                    </p>
                    <button type="button" className="btn btn-info" onClick={this.submitForm} style={{marginLeft:'5px',float:'right'}}>
                        Create
                    </button>
                    <button type="button" className="btn btn-danger" onClick={this.props.onHide} style={{marginLeft:'5px',float:'right'}}>
                        Cancel
                    </button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default TimeslotModal