import * as React from 'react'
import {isloggedin} from '../components/auth'
import Layout from '../components/layout'
import { navigate } from 'gatsby-link'
import PollOptions from '../components/poll-options'
import getFirebase from '../../firebase'
import swal from 'sweetalert'


class NewPollPage extends React.Component {
    constructor(props) {
        super(props);
        //should get title, startDate, endDate, and timezone from props.location.state

        delete props.location.state.saveCallback

        this.state = {...props.location.state, location:"", description:"", vps:1,vpp:1,publish:false}

        this.newPoll = this.newPoll.bind(this)
    }

    newPoll (poll) {
        const lazyApp = import('firebase/app')
        const lazyDatabase = import('firebase/database')

        Promise.all([lazyApp, lazyDatabase]).then(([f, fdb]) => {
            const database = fdb.getDatabase(getFirebase(f))

            const newPollKey = fdb.push(fdb.child(fdb.ref(database), 'polls')).key

            const pollData = {...poll, id:newPollKey}

            const updates = {}
            updates['/polls/' + newPollKey] = pollData
            
            return fdb.update(fdb.ref(database), updates)
        })
        navigate("/poll-list")
    }


    render() {
        if(!isloggedin()) {
            swal("You must be signed in to view this page",)
            navigate("/log-in")
            return null
        }
        return (
            <Layout pageTitle="New Poll: Oops All EEs Doodle">
            <main>
                <div style={{backgroundColor:"#ffffff", borderRadius:"10px", border:"1px solid #000000", width:"90%", margin:"0 auto", padding:"10px"}}>
                    <PollOptions state={this.state} saveCallback={this.newPoll}></PollOptions>
                </div>
            </main>
            </Layout>
        )
    }

    
}

export default NewPollPage