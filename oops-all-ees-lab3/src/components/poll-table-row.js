import * as React from 'react'
import '../styles/fa/css/all.css'

const PollTableRow = ({ pollTitle, pollAuthor, pollID, signedin, deleteCallback, children}) => {
    return (
        <tr>
            <td style={{verticalAlign:'middle'}}>{pollTitle}</td>
            <td style={{verticalAlign:'middle'}}>{pollAuthor}</td>
            <td style={{verticalAlign:'middle'}}>
                <button type="button" className="btn btn-primary" style={{marginLeft:'5px'}}>
                    <i className="far fa-eye"></i>
                </button>
                {signedin && <>
                    <button type="button" className="btn btn-success" style={{marginLeft:'5px'}}>
                        <i className="far fa-edit"></i>
                    </button>
                    <button type="button" onClick={ () => deleteCallback(pollID, pollTitle)} className="btn btn-danger" style={{marginLeft:'5px'}}>
                        <i className="far fa-trash-alt"></i>
                    </button>
                </>
                }
            </td>
        </tr>
    )
}

export default PollTableRow