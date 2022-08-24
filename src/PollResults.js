import { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';
import { useState } from 'react'
import { firebase } from './firebase'
import { ref, onValue, getDatabase } from 'firebase/database'
import ShareButton from './ShareButton'


function PollResults() {
    const [chartSelection, setChartSelection] = useState('bar')
    const [pollResults, setPollResults] = useState([])
    const [pollLabels, setPollLabels] = useState([])
    const { pollID } = useParams();
    const [totalVotes, setTotalVotes] = useState("")

    useEffect(() => {
        const database = getDatabase(firebase)
        const dbRef = ref(database, `${pollID}/answer`)
        onValue(dbRef, (response) => {
            const totals = Object.values(response.val())

            setPollResults(totals)
            setPollLabels(Object.keys(response.val()))
            
            let sum = 0
            for(let number of totals){
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
                label: 'Reults',
                data: pollResults,
                borderColor: ['rgb(255, 99, 132, 0.5)', 'blue'],
                backgroundColor: ['rgb(255, 99, 132, 0.5)', 'blue']
            }
        ],
    };

    const handleChange = (e) => {
        setChartSelection(e.target.value)
    }
    return (
        <>
            <div>{pollID}</div>
            <p>Results</p>
            <ShareButton shareTitle='Poll Results' shareURL={window.location.href} />
            <form>
                <legend>Select a chart type:</legend>
                <div>
                    <label htmlFor="doughnut">Doughnut</label>
                    <input type="radio" id="doughnut" name="doughnut" value="doughnut" onChange={handleChange} checked={chartSelection === 'doughnut'} />
                </div>
                <div>
                    <label htmlFor="bar">Bar</label>
                    <input type="radio" id="bar" name="bar" value="bar" onChange={handleChange} checked={chartSelection === 'bar'} />
                </div>
            </form>
            <div>
                <h3>{totalVotes} person voted</h3>
                <Chart
                    type={chartSelection}
                    options={options}
                    data={data}
                />
            </div>
        </>
    )
}

export default PollResults