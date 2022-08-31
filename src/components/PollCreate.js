import firebase from './../helpers/firebase';
import { getDatabase, ref, push, update } from 'firebase/database';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { filterProfanity } from '.././helpers/filterProfanity'
import '.././styling/PollCreate.scss';
import { AuthContext } from './AuthContext';
import { useContext } from 'react';
import { Helmet } from 'react-helmet-async';


function PollCreate() {
    // Creating state variables to store userInput
    const [question, setQuestion] = useState('');
    const [answer1, setAnswer1] = useState('');
    const [answer2, setAnswer2] = useState('');
    const [answer3, setAnswer3] = useState('');
    const [answer4, setAnswer4] = useState('');

    // Creating Navigate Variable from the useNavigate function imported from react-router-dom. Will be used to navigate users to the next page.
    const navigate = useNavigate();
    // Creating a variable containing currentUser item that is imported through the AuthContext Component.
    const { currentUser } = useContext(AuthContext)

    // A series of change handlers that will put user input into state
    const handleChange = (e) => {
        setQuestion(e.target.value)
    }

    const handleAnswer1 = (e) => {
        setAnswer1(e.target.value)
    }

    const handleAnswer2 = (e) => {
        setAnswer2(e.target.value)
    }

    const handleAnswer3 = (e) => {
        setAnswer3(e.target.value)
    }

    const handleAnswer4 = (e) => {
        setAnswer4(e.target.value)
    }

    // HandleSubmit that takes ultimately takes user input, parses it and send to firebase.
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Error Handling to ensure unique answers
        if (answer1 === answer2 || answer1 === answer3 || answer1 === answer4 || answer2 === answer3 || answer2 === answer4 || (answer3 === answer4 && answer4 !== "")) {
            alert('You need to enter unique answers');
            return
        }

        // using RegEx to ensure answers aren't blank
        if ((!answer1.replace(/\s/g, '').length && answer1 !== '') || (!answer2.replace(/\s/g, '').length && answer2 !== '') || (!answer3.replace(/\s/g, '').length && answer3 !== '') || (!answer4.replace(/\s/g, '').length && answer4 !== '')) {
            alert('Answers cannot be blank');
            return
        }

        // Firebase Database Initiatlization
        const database = getDatabase(firebase)
        // Creating variable that can be used to get specific areas of database dependent on users loggedin Status (gathered from Auth Context)
        let loggedInStatus
        if (currentUser) {
            loggedInStatus = `loggedIn/${[currentUser.uid]}`
        }
        else {
            loggedInStatus = 'anonymous'
        }
        // Creating database reference with variable for database location
        const dbRef = ref(database, loggedInStatus)
        // Getting key from firebase that will be used to push data to database
        const newKey = push(dbRef).key;
        // Try block of the handlesubmit
        try {
            // creating variables that have returned values from our profanity filter helper. Creating a promise and await so that we wait for response before continuing.
            const [filteredA1, filteredA2, filteredA3, filteredA4, filteredQ] = await Promise.all([filterProfanity(answer1), filterProfanity(answer2), filterProfanity(answer3), filterProfanity(answer4), filterProfanity(question)]);
            // creating variable with filtered question and answers in format we will sent to firebase
            const postData = {
                question: filteredQ,
                answer: {
                    [filteredA1]: 0,
                    [filteredA2]: 0,
                    [filteredA3]: 0,
                    [filteredA4]: 0
                }
            }
            // creating Updates object, then putting postData inside that object. Finally pushing updates object to firebase at our dbRef
            const updates = {};
            updates[newKey + '/'] = postData
            update(dbRef, updates);

            // creating paramURL that is dependment on logged in status (with or without user uid). This is needed to so we can correctly use url Params on other pages. Then navigating to defined url
            let paramURL
            if (currentUser) {
                paramURL = `/poll/${[currentUser.uid]}/${newKey}`
            }
            else {
                paramURL = `/poll/${newKey}`
            }
            navigate(paramURL);

        } catch (error) {
            // Catch block
            console.log(error)
            // if try fails, continue with database storage, with unfiltered questions
            const postData = {
                question: question,
                answer: {
                    [answer1]: 0,
                    [answer2]: 0,
                    [answer3]: 0,
                    [answer4]: 0
                }
            }
            const updates = {};
            updates[newKey + '/'] = postData
            update(dbRef, updates);
            let paramURL
            if (currentUser) {
                paramURL = `/poll/${[currentUser.uid]}/${newKey}`
            }
            else {
                paramURL = `/poll/${newKey}`
            }
            navigate(paramURL);
        }

    }

    return (
        <div className='pollCreateContainer'>
            <Helmet>
                <title>Voting Booth</title>
            </Helmet>
            <header>
                <div className="appInfo">
                    <h2>Enter your poll question below along with options and we will create a link you can share with everyone to see everyone's preferences</h2>
                    <p className='tagline'>(Reducing the stress of decision making, one poll at a time) </p>
                </div>
            </header>
            <main className='wrapper'>
                <div className='pollCreateForm'>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor='userInput' className='sr-only'>Question</label>
                        <input maxLength='140' type="text" id='userInput' onChange={handleChange} value={question} placeholder='What would you like to ask?' className='question' required />
                        <div className='answers'>
                            <label htmlFor='answer1' className='sr-only'>Option #1</label>
                            <input maxLength='140' type='text' id='answer1' onChange={handleAnswer1} value={answer1} placeholder='Required' required />
                            <label htmlFor='answer2' className='sr-only'>Option #2</label>
                            <input maxLength='140' type='text' id='answer2' onChange={handleAnswer2} value={answer2} placeholder='Required' required />
                            <label htmlFor='answer3' className='sr-only'>Option #3</label>
                            <input maxLength='140' type='text' id='answer3' onChange={handleAnswer3} value={answer3} placeholder='Optional' />
                            <label htmlFor='answer4' className='sr-only'>Option #4</label>
                            <input maxLength='140' type='text' id='answer4' onChange={handleAnswer4} value={answer4} placeholder='Optional' />
                        </div>
                        <button>
                            <p>Create Poll</p>
                        </button>
                    </form>
                </div>
            </main >
        </div>
    )
}


export default PollCreate