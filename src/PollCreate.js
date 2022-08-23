
import {firebase} from './firebase';
import { getDatabase, ref, push, update } from 'firebase/database';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function PollCreate() {
    const [question, setQuestion] = useState('');
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

    const handleSubmit = (e) => {
        e.preventDefault();
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

        <div>
            <h2>Enter your poll question below</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor='userInput'>Please enter your question:</label>
                <input maxLength='140' type="text" id='userInput' onChange={handleChange}/>
                <label htmlFor='answer1'>Please enter answer #1:</label>
                <input maxLength='140' type='text' id='answer1' onChange={handleAnswer1}/>
                <label htmlFor='answer2'>Please enter answer #1:</label>
                <input maxLength='140' type='text' id='answer2' onChange={handleAnswer2}/>
                <button>
                    <p>Submit Questions and Answers</p>
                </button>
            </form>

        </div>
    )
}

export default PollCreate