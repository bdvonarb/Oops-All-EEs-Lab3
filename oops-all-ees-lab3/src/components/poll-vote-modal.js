import { navigate } from 'gatsby-link'
import * as React from 'react'
import {Modal, Form, Row, Col} from 'react-bootstrap'
import '../styles/fa/css/all.css'
import TimeSlotPicker from './time-slot-picker'


class PollVoteModal extends React.Component {
    constructor(props) {
        super(props)

        this.state = {name:"", day:props.day, startTime:props.startTime, endTime:props.endTime, region:props.region, names:props.names}
        this.reserveCallback = props.reserveCallback.bind(this)
        this.submitForm = this.submitForm.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if(nextProps.day !== prevState.day || nextProps.startTime !== prevState.startTime || nextProps.endTime !== prevState.endTime || nextProps.region !== prevState.region || nextProps.names !== prevState.names) {
            return {name:"", day:nextProps.day, startTime:nextProps.startTime, endTime:nextProps.endTime, region:nextProps.region, names:nextProps.names}
        } else {
            return null
        }
    }

    submitForm(event) {
        event.preventDefault()
        this.reserveCallback(this.state.region, this.state.name)
    }

    handleChange(event) {
        this.setState(prevState => ({
            name: event.target.value
        }))
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
                    Reserve Time
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={this.submitForm}>
                        <Col>
                            <Row>
                                <p>Are you sure you want to reserve the slot on {this.state.day} from {this.state.startTime} to {this.state.endTime}?</p>
                                {this.state.names && <p>{this.state.names.map(name => name+", ")} are also signed up for this slot</p>}
                                
                            </Row>
                            <Row>
                                <Col xs="auto">
                                    <Form.Label style={{display:"block", textAlign:"right", padding:"7px 0"}}>Name:</Form.Label>
                                </Col>
                                <Col className='col-10'>
                                    <Form.Control name="name" type="text" value={this.state.name} onChange={this.handleChange}/>
                                </Col>
                            </Row>
                        </Col>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <button type="button" className="btn btn-info" onClick={this.submitForm} style={{marginLeft:'5px',float:'right'}}>
                        Reserve
                    </button>
                    <button type="button" className="btn btn-danger" onClick={this.props.onHide} style={{marginLeft:'5px',float:'right'}}>
                        Cancel
                    </button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default PollVoteModal