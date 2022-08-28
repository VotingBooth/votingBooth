import { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';
import { useState } from 'react'
import firebase from './../helpers/firebase'
import { ref, onValue, getDatabase } from 'firebase/database'
import ShareButton from './ShareButton'
import '.././styling/PollResults.scss'





function PollResults() {
    const [chartSelection, setChartSelection] = useState('bar')
    const [pollResults, setPollResults] = useState([])
    const [pollLabels, setPollLabels] = useState([])
    const { pollID } = useParams();
    const { uid } = useParams();
    const [totalVotes, setTotalVotes] = useState("")

    useEffect(() => {

        const database = getDatabase(firebase);
        let loggedInPoll
        if (uid) {
            loggedInPoll = `loggedIn/${uid}/${pollID}/answer`
        }
        else {
            loggedInPoll = `anonymous/${pollID}/answer`
        }
        const dbRef = ref(database, loggedInPoll)

        onValue(dbRef, (response) => {
            const totals = Object.values(response.val())

            setPollResults(totals)
            setPollLabels(Object.keys(response.val()))

            let sum = 0
            for (let number of totals) {
                sum += number;
                setTotalVotes(sum)
            }
        })
    }, [pollID])

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
                text: 'Chart.js Horizontal Bar Chart',
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
            <header>
                    <div className="appInfo">
                        <h2>The results for the most awaited poll's displayed here! Feel free to share the results with everyone</h2>
                        <p className='tagline'>(Reducing the stress of decision making, one poll at a time) </p>
                    </div>
                </header>
            <main className='wrapper'>
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

export default PollResults