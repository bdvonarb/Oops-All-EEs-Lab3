import * as React from 'react'
import PollTableRow from '../components/poll-table-row'
import "../styles/bootstrap.min.css"
import '../styles/fa/css/all.css'


class PollListPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {polls:[]}

        this.newPoll = this.newPoll.bind(this);
        this.deletePoll = this.deletePoll.bind(this);
    }

    newPoll () {
        this.setState(prevState => ({
            polls: [...prevState.polls, {"id":prevState.polls.length,"title":"poll"+prevState.polls.length,"author":"me"}]
        }))
    }

    deletePoll(deleteID) {
        this.setState(prevState => ({
            polls: prevState.polls.filter(poll => poll.id !== deleteID)
        }))
        console.log(deleteID)
    }

    render() {
        return (
            <main>
                <title>Oops All EEs Lab 3</title>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th style={{verticalAlign:'middle'}}>Poll</th>
                            <th style={{verticalAlign:'middle'}}>Author</th>
                            <th style={{verticalAlign:'middle'}}>Actions
                                <button type="button" className="btn btn-info" onClick={this.newPoll} style={{marginLeft:'5px',float:'right'}}>
                                    <i className="fas fa-plus" style={{marginRight:"10px"}}></i>New
                                </button>
                            </th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.polls.map(poll => (
                                <PollTableRow pollTitle={poll.title} pollAuthor={poll.author} pollID={poll.id} signedin="true" deleteCallback={this.deletePoll}></PollTableRow>
                            ))
                        }
                    </tbody>
                </table>
            </main>
        )
    }

    
}

export default PollListPage