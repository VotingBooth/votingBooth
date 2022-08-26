import { Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { getDatabase, ref, onValue, remove } from 'firebase/database';
import { AuthContext } from './AuthContext';
import firebase from './../helpers/firebase'
import { useNavigate } from 'react-router-dom'



const SavedPolls = () => {
    const { currentUser } = useContext(AuthContext)
    const [savedPolls, setSavedPolls] = useState([]);
    let navigate = useNavigate();

    useEffect(() => {
        if (currentUser) {
            const database = getDatabase(firebase)
            const userID = currentUser.uid
            const userRef = ref(database, `loggedIn/${userID}`);
            onValue(userRef, (response) => {
                let newState = [];
                const data = response.val();
                for (let key in data) {
                    newState.push({ key: key, question: data[key].question })
                }
                setSavedPolls(newState)
            })
        }
    }, [currentUser])

    const deletePoll = (e) => {
        const database = getDatabase(firebase)
        const dbRef = ref(database, `loggedIn/${currentUser.uid}/${e.target.parentNode.id}`)
        remove(dbRef)

    }

    const goToPoll = (e) => {
        navigate(`/poll/${[currentUser.uid]}/${e.target.parentNode.id}`)
    }

    const goToResults = (e) => {
        navigate(`/poll/${[currentUser.uid]}/${e.target.parentNode.id}/results`)
    }

    return (
        <>
            <h2>These are your saved polls!</h2>
            {savedPolls.length !== 0 ? savedPolls.map((poll) => (
                <li id={poll.key} key={poll.key}>
                    <p>{poll.question}</p>
                    <button onClick={deletePoll}>Delete Poll</button>
                    <button onClick={goToPoll}>Go to Poll</button>
                    <button onClick={goToResults}>Go to Results</button>
                </li>))
                : <h2>Create Some Polls!</h2>}
            <Link to="/">Create Polls</Link>
        </>
    )
}

export default SavedPolls;