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

        this.PollOptions = React.createRef()
        this.getPoll = this.getPoll.bind(this)
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


    render() {
        if(!isloggedin() && (this.state.title && !this.state.publish)) {
            swal("This poll is not published and cannot be viewed",)
            navigate("/poll-list")
            return null
        }
        //console.log(this.state)
        return (
            <Layout pageTitle="View Poll: Oops All EEs Doodle">
            <main>
                <div style={{backgroundColor:"#ffffff", borderRadius:"10px", border:"1px solid #000000", width:"90%", margin:"0 auto", padding:"10px"}}>
                    <PollOptions state={this.state} view ref={this.PollOptions}></PollOptions>
                </div>
            </main>
            </Layout>
        )
    }

    
}

export default EditPollPage