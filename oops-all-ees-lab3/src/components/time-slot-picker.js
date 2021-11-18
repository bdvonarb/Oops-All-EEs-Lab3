import * as React from 'react'
import '../styles/fa/css/all.css'

const TimeSlotPicker = ({startDate, endDate, selectCallback, children}) => {
    return (
        <table>
            <thead>
                <tr>
                    {
                        
                    }



                    <th style={{verticalAlign:'middle'}}>Poll</th>
                    <th style={{verticalAlign:'middle'}}>Author</th>
                    <th style={{verticalAlign:'middle'}}>Actions
                        <button type="button" className="btn btn-info" onClick={this.newPoll} style={{marginLeft:'5px',float:'right'}}>
                            <i className="fas fa-plus" style={{marginRight:"10px"}}></i>New
                        </button>
                    </th>
                    
                </tr>
            </thead>
        </table>
    )
}

export default TimeSlotPicker