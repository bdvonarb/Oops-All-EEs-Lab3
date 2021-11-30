import * as React from 'react'
import PollTableRow from '../components/poll-table-row'
import "../styles/bootstrap.min.css"
import '../styles/fa/css/all.css'
import {Link} from 'gatsby'
import getFirebase from '../../firebase'
import Layout from '../components/layout'


class PollListPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {polls:[],nextID:0}

        this.newPoll = this.newPoll.bind(this);
        this.deletePoll = this.deletePoll.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this)
        this.updateList = this.updateList.bind(this)
    }

    newPoll () {
        const lazyApp = import('firebase/app')
        const lazyDatabase = import('firebase/database')

        Promise.all([lazyApp, lazyDatabase]).then(([f, fdb]) => {
            const database = fdb.getDatabase(getFirebase(f))

            const newPollKey = fdb.push(fdb.child(fdb.ref(database), 'polls')).key
            const pollData = {
                id: newPollKey,
                title: "Poll " + newPollKey,
                author: "me"
            }

            const updates = {}
            updates['/polls/' + newPollKey] = pollData
            
            return fdb.update(fdb.ref(database), updates)
        })
        this.updateList()
    }

    deletePoll(deleteID) {
        const lazyApp = import('firebase/app')
        const lazyDatabase = import('firebase/database')

        Promise.all([lazyApp, lazyDatabase]).then(([f, fdb]) => {
            const database = fdb.getDatabase(getFirebase(f))
            const dataref = fdb.ref(database, '/polls/' + deleteID)
            return fdb.remove(dataref)
        })
        this.updateList()
    }

    componentDidMount() {
        this.updateList()
    }

    updateList() {
        const lazyApp = import('firebase/app')
        const lazyDatabase = import('firebase/database')

        Promise.all([lazyApp, lazyDatabase]).then(([f, fdb]) => {
            const database = fdb.getDatabase(getFirebase(f))
            const dataref = fdb.query(fdb.ref(database, 'polls/'));
            fdb.onValue(dataref, (snapshot) => {
                const data = snapshot.val();
                var newPolls = []
                for(var key in data) {
                    //console.log(JSON.stringify(data[key]))
                    newPolls.push(data[key])
                }
                this.setState(prevState => ({
                    polls: newPolls
                }))
                /*this.state.polls.map(poll => (
                    console.log(poll)
                ))*/
            })
        })
    }

    render() {
        return (
            <Layout pageTitle="Poll List: Oops All EEs Doodle">
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
                                <PollTableRow key={poll.id} pollTitle={poll.title} pollAuthor={poll.author} pollID={poll.id} signedin="true" deleteCallback={this.deletePoll}></PollTableRow>
                            ))
                        }
                    </tbody>
                </table>
            </main>
            </Layout>
        )
    }

    
}

export default PollListPage