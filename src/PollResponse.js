import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { firebase } from './firebase'
import { ref, getDatabase, onValue, update, increment } from 'firebase/database'

function PollResponse() {
    const [dataPoll, setDataPoll] = useState([]);
    const [answer1, setAnswer1] = useState('');
    const [answer2, setAnswer2] = useState('');
    const [userSelection, setUserSelection] = useState("")
    const [votedStatus, setVotedStatus] = useState('')
    const { pollID } = useParams();
    let navigate = useNavigate();

    useEffect(() => {
        // Check voted status in local storage
        const voted = localStorage.getItem(`${pollID}`);
        setVotedStatus(voted)
        // Firebase Data
        const database = getDatabase(firebase)
        const dbRef = ref(database, `${pollID}`)
        onValue(dbRef, (response) => {
            console.log(response.val())
            setDataPoll(response.val().question)
            const answers = Object.keys(response.val().answer)
            setAnswer1(answers[0])
            setAnswer2(answers[1])
        })


    }, [pollID])

    const handleSubmit = (e) => {
        e.preventDefault();
        const database = getDatabase(firebase)
        const dbRef = ref(database, `${pollID}/answer`)

        if (userSelection === answer1 ) {
            update(dbRef, {
                [answer1]: increment(1)
            });
        } else if (userSelection === answer2) {
            update(dbRef, {
                [answer2]: increment(1)
            });
        }
        // set Voted Staus to Local Storage
        localStorage.setItem(`${pollID}`, 'voted');
        // Navigate to results page
        navigate(`/poll/${pollID}/results`)
    }

    const handleChange = (e) => {
        setUserSelection(e.target.value)
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <legend>{dataPoll}</legend>
                <label htmlFor='pollQuestion'>
                    <input type="radio" id="pollQuestion" value={answer1} name="pollQuestion" onChange={handleChange}
                    />{answer1}
                    <input type="radio" id="pollQuestion" value={answer2} name="pollQuestion" onChange={handleChange}
                    />{answer2}
                </label>
                <button>Submit</button>
            </form>
        </>
    )
}

export default PollResponse;