import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';
import { useState } from 'react';
import firebase from './../helpers/firebase';
import { ref, onValue, getDatabase } from 'firebase/database';
import ShareButton from './ShareButton';
import '.././styling/PollResults.scss';
import { Helmet } from 'react-helmet-async';

function PollResults() {
    const [chartSelection, setChartSelection] = useState('bar')
    const [pollResults, setPollResults] = useState([])
    const [pollLabels, setPollLabels] = useState([])
    const [pollTitle, setPollTitle] = useState('')
    const { pollID } = useParams();
    const { uid } = useParams();
    const [totalVotes, setTotalVotes] = useState("")

    useEffect(() => {

        const database = getDatabase(firebase);
        let loggedInPoll
        if (uid) {
            loggedInPoll = `loggedIn/${uid}/${pollID}/`
        }
        else {
            loggedInPoll = `anonymous/${pollID}/`
        }
        const dbRef = ref(database, loggedInPoll)

        onValue(dbRef, (response) => {
            // error handling to be done for when you delete poll from SavedPolls and there seems to be a response.val is missing error!
            const totals = Object.values(response.val().answer)
            const removeUndefined = Object.fromEntries(Object.entries(response.val().answer).filter(([key]) => !key.includes('undefined')))
            setPollTitle(response.val().question)
            setPollResults(Object.values(removeUndefined))
            setPollLabels(Object.keys(removeUndefined))

            let sum = 0
            for (let number of totals) {
                sum += number;
                setTotalVotes(sum)
            }
        })
    }, [pollID, uid])

    const options = {
        elements: {
            bar: {
                borderWidth: 2,
            },
        },
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: pollTitle,
            },
        },
    };

    const data = {
        labels: pollLabels,
        datasets: [
            {
                label: 'Results',
                responsive: true,
                data: pollResults,
                borderColor: [
                    "rgb(53,80,112)",
                ],
                backgroundColor: [

                    "rgb(229, 107, 111)",
                    "rgb(181,101,118)",
                    "rgb(109,89,122)",
                    "rgb(234,172,139)"
                ],
                color: ["rgb(0, 0, 0)", "black"],
                borderWidth: 1
            }
        ],
    };

    const handleChange = (e) => {
        setChartSelection(e.target.value)
    }
    return (
        <div className="pollResultsContainer">
            <Helmet>
                <title>Results - {pollTitle}</title>
            </Helmet>
            <header>
                <div className="appInfo">
                    <h2><strong>Results</strong> for the most awaited poll are displayed here! Don't forget to share them with everyone.</h2>
                    <p className='tagline'>(Reducing the stress of decision making, one poll at a time) </p>
                </div>
            </header>
            <main>
                <form>
                    <legend>Select a chart type:</legend>
                    <div className="chartOptions">
                        <div>
                            <input type="radio" id="doughnut" name="doughnut" value="doughnut" onChange={handleChange} checked={chartSelection === 'doughnut'} />
                            <label htmlFor="doughnut">Doughnut</label>
                        </div>
                        <div>
                            <input type="radio" id="bar" name="bar" value="bar" onChange={handleChange} checked={chartSelection === 'bar'} />
                            <label htmlFor="bar">Bar</label>
                        </div>
                    </div>
                </form>
                <div className='chartContainer'>
                    <Chart
                        type={chartSelection}
                        options={options}
                        data={data}
                    />
                    <h3>Total Votes: {totalVotes}</h3>
                </div>
                <ShareButton shareTitle='Poll Results' shareURL={window.location.href} />
            </main>
        </div>
    )
}

export default PollResults;