import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import firebase from './../helpers/firebase';
import { ref, getDatabase, onValue, update, increment } from 'firebase/database'
import '.././styling/PollResponse.scss';
import ShareButton from './ShareButton';
import LoadingScreen from "./LoadingScreen"
import { Helmet } from 'react-helmet-async';

function PollResponse() {
    const [dataPoll, setDataPoll] = useState([]);
    const [answer1, setAnswer1] = useState('');
    const [answer2, setAnswer2] = useState('');
    const [answer3, setAnswer3] = useState('');
    const [answer4, setAnswer4] = useState('');
    const [votedStatus, setVotedStatus] = useState('')
    const [loading, setLoading] = useState(true)
    const { pollID } = useParams();
    const { uid } = useParams();
    let navigate = useNavigate();

    let paramURL
    if (uid) {
        paramURL = `/poll/${uid}/${pollID}/results`
    }
    else {
        paramURL = `/poll/${pollID}/results`
    }

    useEffect(() => {

        // Check voted status in local storage
        const voted = localStorage.getItem(`${pollID}`);
        setVotedStatus(voted);
        // Firebase Data

        const database = getDatabase(firebase);
        let loggedInPoll
        if (uid) {
            loggedInPoll = `loggedIn/${uid}/${pollID}`
        }
        else {
            loggedInPoll = `anonymous/${pollID}`
        }
        const dbRef = ref(database, loggedInPoll)
        onValue(dbRef, (response) => {
            setDataPoll(response.val().question)
            const answers = Object.keys(response.val().answer)
            setAnswer1(answers[0])
            setAnswer2(answers[1])
            setAnswer3(answers[2])
            setAnswer4(answers[3])
        })
        setTimeout(() => {
            setLoading(false)
        }, 450)

    }, [pollID, dataPoll, uid])

    const handleClick = (e) => {
        e.preventDefault();
        const userSelect = e.target.value

        const database = getDatabase(firebase);
        let loggedInPoll
        if (uid) {
            loggedInPoll = `loggedIn/${uid}/${pollID}/answer`
        }
        else {
            loggedInPoll = `anonymous/${pollID}/answer`
        }
        const dbRef = ref(database, loggedInPoll)

        update(dbRef, {
            [userSelect]: increment(1)
        });
        // set Voted Status to Local Storage
        localStorage.setItem(`${pollID}`, 'voted');
        // Navigate to results page
        navigate(paramURL);

    }

    const resultsClick = () => {
        navigate(paramURL);
    }

    return (
        <div className='pollRespContainer'>
            <Helmet>
                <title>{dataPoll}</title>
            </Helmet>
            {loading ? <LoadingScreen /> :
                <div>
                    {votedStatus !== 'voted' ?
                        <header>

                            <div className="appInfo">
                                <h2>Time to vote and make the most important decision of your life! You can also share the poll or choose to see the results</h2>
                                <p className='tagline'>(Reducing the stress of decision making, one poll at a time) </p>
                            </div>
                        </header> :
                        null}

                    <main>
                        {votedStatus !== 'voted' ?
                            <>
                                <form className='pollResponseForm'>
                                    <h2>{dataPoll}</h2>
                                    <div className='pollResponses'>
                                        <label htmlFor='pollAnswer1' className='sr-only'>{answer1}</label>
                                        <input type="button" id="pollAnswer1" value={answer1} name="pollQuestion" onClick={handleClick}
                                        />
                                        <label htmlFor='pollAnswer2' className='sr-only'>{answer2}</label>
                                        <input type="button" id="pollAnswer2" value={answer2} name="pollQuestion" onClick={handleClick} />
                                        {
                                            answer3 && answer3 !== "undefined" ?
                                                <>
                                                    <label htmlFor='pollAnswer3' className='sr-only'>{answer3}</label>
                                                    <input type="button" id="pollAnswer3" value={answer3} name="pollQuestion" onClick={handleClick}
                                                    />
                                                </> : null
                                        }
                                        {
                                            answer4 && answer4 !== "undefined" ?
                                                <>
                                                    <label htmlFor='pollAnswer4' className='sr-only'>{answer4}</label>
                                                    <input type="button" id="pollAnswer4" value={answer4} name="pollQuestion" onClick={handleClick}
                                                    />
                                                </> : null
                                        }

                                    </div>
                                </form>
                                <div className="buttons">
                                    <button className='toGoResults' onClick={resultsClick}>Go to Results</button>
                                    <ShareButton shareTitle='Poll' shareURL={window.location.href} />
                                </div>
                            </>
                            :
                            <div className='wrapper'>
                                <h2 className='previousVoted'>You've already voted!</h2>
                                <div className="buttons">
                                    <button className='toGoResults' onClick={resultsClick}>Go to Results</button>
                                    <ShareButton shareTitle='Poll' shareURL={window.location.href} />
                                </div>

                            </div>}
                    </main>
                </div>
            }
        </div>
    )
}

export default PollResponse;