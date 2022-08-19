import { useParams } from 'react-router-dom'

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