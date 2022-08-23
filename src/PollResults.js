import { useParams } from 'react-router-dom'
import Chart from 'chart.js/auto';

function PollResults() {

    const { pollID } = useParams();

    return (
        <>
            <div>{pollID}</div>
            <p>Results</p>
        </>
    )
}

export default PollResults