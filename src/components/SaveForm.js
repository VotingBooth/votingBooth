import { useEffect, useState, Link} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import firebase from '../helpers/firebase';
import { ref, getDatabase, onValue, update, increment, snapshot, get, child } from 'firebase/database'
import '.././styling/PollResponse.scss';
import { AuthContext } from './AuthContext';
import { useContext } from 'react';

function SaveForm(){
    const { pollID } = useParams();
    const [dataPoll, setDataPoll] = useState([]);
    const [answer1, setAnswer1] = useState('');
    const [answer2, setAnswer2] = useState('');
    const [allData, setAllData] =useState({})
    const {currentUser} = useContext(AuthContext)

    console.log(currentUser)
    

    const handleClick=()=>{
        // Check voted status in local storage
        // setVotedStatus(voted);
        // Firebase Data
        const database = getDatabase(firebase);
        const dbRef = ref(database);
        onValue(dbRef, (response) => {
            // console.log(response.val());
            setDataPoll(response.val().question);
            const answers = Object.keys(response.val().answer);
            setAnswer1(answers[0]);
            setAnswer2(answers[1]);

            get(child(dbRef, pollID)).then((snapshot)=>{
                console.log(snapshot)
            })
            // console.log(response.pollID.val())

            // setAllData(data)
            // data:{
            //     question: dataPoll,
            //     answer1: answer1,
            //     answer2: answer2
            // }
        })

    }



    return(
        
        
        currentUser ?
            <button>save poll</button>
            :
            // 
            <button><Link to="/login">Login</Link></button>
        
    
    // <button>fsfsd</button>
    )
}

export default SaveForm