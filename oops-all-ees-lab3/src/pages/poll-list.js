import * as React from 'react'
import PollTableRow from '../components/poll-table-row'
import "../styles/bootstrap.min.css"
import '../styles/fa/css/all.css'
import getFirebase from '../../firebase'
import NewPollModal from '../components/new-poll-modal'
import {isloggedin} from '../components/auth'
import Layout from '../components/layout'


class PollListPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {polls:[],modalShow:false}

        this.newPoll = this.newPoll.bind(this);
        this.deletePoll = this.deletePoll.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this)
        this.updateList = this.updateList.bind(this)
        this.setModalShow =  this.setModalShow.bind(this)
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

    setModalShow(show) {
        this.setState(prevState => ({
            modalShow: show
        }))
    }

    render() {
        return (
            <Layout pageTitle="Poll List: Oops All EEs Doodle">
            <main>

                <title>Oops All EEs Lab 3</title>
                <div style={{backgroundColor:"#ffffff", borderRadius:"10px", border:"1px solid #000000", width:"90%", margin:"0 auto"}}>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th style={{verticalAlign:'middle'}}>Poll</th>
                                <th style={{verticalAlign:'middle'}}>Author</th>
                                <th style={{verticalAlign:'middle', padding:'auto 0'}}>
                                    <div className="row">
                                        <p style={{verticalAlign:'middle',width:'80px',margin:"auto 0"}}>Actions</p>
                                        {
                                            isloggedin() && <>
                                                <button type="button" className="btn btn-info" onClick={() => this.setModalShow(true)} style={{marginLeft:'5px',float:'right',display:'inline-block',width:'90px'}}>
                                                    <i className="fas fa-plus" style={{marginRight:"10px"}}></i>New
                                                </button>
                                            </>
                                        }
                                    </div>
                                </th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.polls.map(poll => (
                                    <PollTableRow key={poll.id} pollTitle={poll.title} pollAuthor={poll.author} pollID={poll.id} signedin={isloggedin()} deleteCallback={this.deletePoll}></PollTableRow>
                                ))
                            }
                        </tbody>
                    </table>

                    <NewPollModal show={this.state.modalShow} onHide={() => this.setModalShow(false)}></NewPollModal>
                </div>
            </main>
            </Layout>
        )
    }

    
}

export default PollListPage