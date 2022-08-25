
import { firebase } from '.././helpers/firebase';
import { getDatabase, ref, push, update } from 'firebase/database';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { filterProfanity } from '.././helpers/filterProfanity'
import '.././styling/PollCreate.scss'



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
                question: question,
                answer: {
                    [answer1]: 0,
                    [answer2]: 0
                }
            }
            const updates = {};
            updates[newKey + '/'] = postData
            update(dbRef, updates);
            navigate(`/poll/${newKey}`);
        }

    }

    return (

        <main className='wrapper'>
            <div className='pollCreation'>
                <h2>Create your Poll below</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor='userInput'>Question</label>
                    <input maxLength='140' type="text" id='userInput' onChange={handleChange} />
                    <label htmlFor='answer1'>Option #1</label>
                    <input maxLength='140' type='text' id='answer1' onChange={handleAnswer1} />
                    <label htmlFor='answer2'>Option #2</label>
                    <input maxLength='140' type='text' id='answer2' onChange={handleAnswer2} />
                    <button>
                        <p>Create Poll</p>
                    </button>
                </form>
            </div>
        </main>
    )
}

export default PollCreate