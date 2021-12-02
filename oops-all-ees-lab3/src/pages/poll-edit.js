import * as React from 'react'
import {isloggedin} from '../components/auth'
import Layout from '../components/layout'
import { navigate } from 'gatsby-link'
import PollOptions from '../components/poll-options'
import getFirebase from '../../firebase'
import swal from 'sweetalert'


class EditPollPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title:"",
            startDate:"",
            author:"",
            endDate:"",
            timezone:"",
            location:"",
            description:"",
            vps:"",
            vpp:"",
            publish:"",
            id:props.location.search.slice(props.location.search.indexOf("?id=")+4)
        }

        //console.log(props.location)

        this.PollOptions = React.createRef()
        this.getPoll = this.getPoll.bind(this)
        this.savePoll = this.savePoll.bind(this)
        this.componentDidMount = this.componentDidMount.bind(this)
    }

    componentDidMount() {
        console.log("comp did mount")
        this.getPoll()
    }

    getPoll() {
        const lazyApp = import('firebase/app')
        const lazyDatabase = import('firebase/database')

        Promise.all([lazyApp, lazyDatabase]).then(([f, fdb]) => {
            const database = fdb.getDatabase(getFirebase(f))
            const dataref = fdb.query(fdb.ref(database, 'polls/'+this.state.id))
            fdb.onValue(dataref, (snapshot) => {
                const data = snapshot.val();
                this.setState(prevState => ({
                    ...data
                }))
                console.log(this.state)
                if(this.PollOptions.current) {
                    this.PollOptions.current.updateState(data)
                } else {
                    console.log("saved weird as error?")
                    //console.trace()
                }
            })
        })
    }

    savePoll (poll) {
        const lazyApp = import('firebase/app')
        const lazyDatabase = import('firebase/database')

        Promise.all([lazyApp, lazyDatabase]).then(([f, fdb]) => {
            const database = fdb.getDatabase(getFirebase(f))

            const pollData = {...poll, id:this.state.id}

            const updates = {}
            updates['/polls/' + this.state.id] = pollData
            
            return fdb.update(fdb.ref(database), updates)
        })
        navigate("/poll-list")
        swal("Poll Saved!", "Would you like to copy a link to your poll to share with participants?", "success", {buttons:["No Thanks!", "Copy Link"]})
        .then((value) => {
            if(value) {
                const link = this.props.location.origin + "/poll-view?id=" + this.state.id
                navigator.clipboard.writeText(link)
                swal("Copied!",link,"success")
            }
        })
    }


    render() {
        if(!isloggedin()) {
            swal("You must be signed in to view this page",)
            navigate("/log-in")
            return null
        }
        //console.log(this.state)
        return (
            <Layout pageTitle="Edit Poll: Oops All EEs Doodle">
            <main>
                <div style={{backgroundColor:"#ffffff", borderRadius:"10px", border:"1px solid #000000", width:"90%", margin:"0 auto", padding:"10px"}}>
                    <PollOptions state={this.state} saveCallback={this.savePoll} edit ref={this.PollOptions}></PollOptions>
                </div>
            </main>
            </Layout>
        )
    }

    
}

export default EditPollPage