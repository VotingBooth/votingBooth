import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import  firebase from './../helpers/firebase';
import { ref, getDatabase, onValue, update, increment } from 'firebase/database'
import '.././styling/PollResponse.scss';

function PollResponse() {
    const [dataPoll, setDataPoll] = useState([]);
    const [answer1, setAnswer1] = useState('');
    const [answer2, setAnswer2] = useState('');
    const [votedStatus, setVotedStatus] = useState('')
    const { pollID } = useParams();
    let navigate = useNavigate();

    useEffect(() => {
        // Check voted status in local storage
        const voted = localStorage.getItem(`${pollID}`);
        setVotedStatus(voted);
        // Firebase Data
        const database = getDatabase(firebase);
        const dbRef = ref(database, `${pollID}`);
        onValue(dbRef, (response) => {
            console.log(response.val());
            setDataPoll(response.val().question);
            const answers = Object.keys(response.val().answer);
            setAnswer1(answers[0]);
            setAnswer2(answers[1]);
        })


    }, [pollID])

    const handleClick = (e) => {
        e.preventDefault();
        const userSelect = e.target.value

        const database = getDatabase(firebase);
        const dbRef = ref(database, `${pollID}/answer`);

        update(dbRef, {
            [userSelect]: increment(1)
        });
        // set Voted Status to Local Storage
        localStorage.setItem(`${pollID}`, 'voted');
        // Navigate to results page
        navigate(`/poll/${pollID}/results`)
    }

    return (
        <main>
            {votedStatus !== 'voted' ?
                <form className='pollResponseForm'>
                    <h2>{dataPoll}</h2>
                    <div className='pollResponses'>
                        <label htmlFor='pollAnswer1' className='sr-only'>{answer1}</label>
                        <input type="button" id="pollAnswer1" value={answer1} name="pollQuestion" onClick={handleClick}
                        />
                        <label htmlFor='pollAnswer2' className='sr-only'>{answer2}</label>
                        <input type="button" id="pollAnswer2" value={answer2} name="pollQuestion" onClick={handleClick} className='rightButton'
                        />
                    </div>
                </form>
                :
                <div className='wrapper'>
                    <h2 className='previousVoted'>You've already voted!</h2>
                </div>}
        </main>
    )
}

export default PollResponse;