import { Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { getDatabase, ref, onValue, remove } from 'firebase/database';
import { AuthContext } from './AuthContext';
import firebase from './../helpers/firebase';
import { Helmet } from 'react-helmet-async';
import ".././styling/SavedPolls.scss"


const SavedPolls = () => {
    const { currentUser } = useContext(AuthContext);
    const [savedPolls, setSavedPolls] = useState([]);

    useEffect(() => {
        if (currentUser) {
            const database = getDatabase(firebase);
            const userID = currentUser.uid;
            const userRef = ref(database, `loggedIn/${userID}`);
            onValue(userRef, (response) => {
                let newState = [];
                const data = response.val();
                for (let key in data) {
                    newState.push({ key: key, question: data[key].question });
                }
                setSavedPolls(newState);
            })
        }
    }, [currentUser])

    const deletePoll = (pollID) => {
        const database = getDatabase(firebase);
        const dbRef = ref(database, `loggedIn/${currentUser.uid}/${pollID}`);
        remove(dbRef);
    }
    return (
        <>
            <Helmet>
                <title>Your Saved Polls</title>
            </Helmet>


            {savedPolls.length !== 0 ?
                <section className="savedContainer">
                    <h2>These are your saved polls!</h2>
                    <ul className="listContainer">
                        {savedPolls.map((poll) => (
                            <li key={poll.key}>
                                <div>
                                    <p className="question">{poll.question}</p>
                                    <button className="pollLink">
                                        <Link to={`/poll/${[currentUser.uid]}/${poll.key}`}>
                                            Go to Poll
                                        </Link>
                                    </button>
                                    <button>
                                        <Link to={`/poll/${[currentUser.uid]}/${poll.key}/results`}>
                                            Go to Results
                                        </Link>
                                    </button>
                                </div>
                                <button className="deleteButton" onClick={() => deletePoll(poll.key)}>Delete Poll</button>
                            </li>))}
                    </ul>
                    <button>
                        <Link to="/">Create More Polls</Link>
                    </button>
                </section>
                :
                !currentUser ?
                    <div className="savePollsButtons">
                        <button >
                            <Link to="/login">Login to Create Polls</Link>
                        </button>
                    </div>
                    :
                    <div className="savePollsButtons">
                        <button >
                            <Link to="/">Create Polls</Link>
                        </button>
                    </div>
            }
        </>
    )
}

export default SavedPolls;