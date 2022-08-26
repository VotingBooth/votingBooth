
import  firebase from './../helpers/firebase';
import { getDatabase, ref, push, update } from 'firebase/database';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { filterProfanity } from '.././helpers/filterProfanity'
import { AuthContext} from './AuthContext';
import { useContext } from 'react';
import '.././styling/PollCreate.scss'

function PollCreate() {
    const [question, setQuestion] = useState();
    const [answer1, setAnswer1] = useState('');
    const [answer2, setAnswer2] = useState('');
    const { currentUser } = useContext(AuthContext); 
    const userID = currentUser.uid;
    const navigate = useNavigate();


    const handleChange = (e) => {
        setQuestion(e.target.value)
    }

    const handleAnswer1 = (e) => {
        setAnswer1(e.target.value)
    }

    const handleAnswer2 = (e) => {
        setAnswer2(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Error Handling to ensure unique answers
        if (answer1 === answer2) {
            alert('You need to enter unique answers')
            return
        }
        // Firebase Database Initiatlization
        const database = getDatabase(firebase)
        const dbRef = ref(database)
        const newKey = push(dbRef, `${userID}`);
        try {
            const [filteredA1, filteredA2, filteredQ] = await Promise.all([filterProfanity(answer1), filterProfanity(answer2), filterProfanity(question)]);
            const postData = {
                question: filteredQ,
                answer: {
                    [filteredA1]: 0,
                    [filteredA2]: 0
                }
            }
            const updates = {};
            updates[newKey + '/'] = postData
            update(dbRef, updates);
            navigate(`/poll/${newKey}`);

        } catch (error) {
            console.log(error)
            // if try fails, continue with database storage, with unfiltered questions
            const postData = {
                userID : {
                    question: question,
                    answer: {
                        [answer1]: 0,
                        [answer2]: 0
                    }
                }
            }
            const updates = {};
            updates[newKey + '/'] = postData
            update(dbRef, updates);
            navigate(`/poll/${newKey}`);
        }

    }

    return (
        <>
            <header>
                <div className="appInfo">
                    <h2>Welcome to your favorite Anonymous Voting Booth</h2>
                    <p>Enter your poll question below, along with options and we will create a shareable link.</p>
                    <p>Reducing the stress of decision making, one poll at a time </p>
                </div>
            </header>
            <main className='wrapper'>
                <div className='pollCreation'>
                    <h2>Create your Poll below</h2>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor='userInput' className='sr-only'>Question</label>
                        <input maxLength='140' type="text" id='userInput' onChange={handleChange} placeholder='What would you like to ask?' className='question' />
                        <div className='answers'>
                            <label htmlFor='answer1' className='sr-only'>Option #1 - Required</label>
                            <input maxLength='140' type='text' id='answer1' onChange={handleAnswer1} placeholder='Option 1 (Required)' />
                            <label htmlFor='answer2' className='sr-only'>Option #2 - Required</label>
                            <input maxLength='140' type='text' id='answer2' onChange={handleAnswer2} placeholder='Option 2 (Required)' />
                        </div>
                        <button>
                            <p>Create Poll</p>
                        </button>
                    </form>
                </div>
            </main >
        </>
    )
}

export default PollCreate