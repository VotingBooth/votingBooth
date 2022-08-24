
import { firebase } from './firebase';
import { getDatabase, ref, push, update } from 'firebase/database';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { filterProfanity } from './filterProfanity'


function PollCreate() {
    const [question, setQuestion] = useState();
    const [answer1, setAnswer1] = useState('');
    const [answer2, setAnswer2] = useState('');
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
        const newKey = push(dbRef).key;
        const postData = {
            question: question,
            answer: {
                [answer1]: 0,
                [answer2]: 0
            }
        }
        const updates = {};
        updates[ newKey + '/'] = postData
        update(dbRef, updates);
        // console.log(answer1, answer2, 'this worked');

        navigate(`/poll/${newKey}`);
    }

    return (
        <>
        <div className="wrapper appInfo">
                <h2>Welcome to your favorite Anonymous Voting Booth</h2>
                <p>Enter your question and options below, and we will create a shareable poll link.</p>
                <p>Reducing the stress of decision making, one poll at a time </p>
        </div>
        <div>
            <h2>Create your Poll below</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor='userInput'>Please enter your question:</label>
                <input maxLength='140' type="text" id='userInput' onChange={handleChange}/>
                <label htmlFor='answer1'>Please enter answer #1:</label>
                <input maxLength='140' type='text' id='answer1' onChange={handleAnswer1}/>
                <label htmlFor='answer2'>Please enter answer #1:</label>
                <input maxLength='140' type='text' id='answer2' onChange={handleAnswer2}/>
                <button>
                    <p>Create Poll</p>
                </button>
            </form>

        </div>
        </>

    )
}

export default PollCreate