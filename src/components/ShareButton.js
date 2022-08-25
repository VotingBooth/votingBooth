import { CopyToClipboard } from "react-copy-to-clipboard"
import { useEffect, useState } from "react"

function ShareButton({ shareTitle, shareURL }) {

    const shareData = {
        title: shareTitle,
        url: shareURL
    }

    // Create state to hold the URL
    const [share, setShare] = useState([])

    // on page load get shareURL data, and pass into setShare state
    useEffect(()=>{
        setShare(shareURL)
    },[shareURL])

    const handleClick = async () => {
        try {
            await navigator.share(shareData)
        }
        catch (err) {
            alert('error')
        }

    }
    return (
        navigator.canShare ? <button onClick={handleClick}>Share!</button> : 
        // if page doesnt have navigator, show url
        <div>
            <CopyToClipboard text={share}>
                <span>Copy Link to clipboard:{share}</span>
            </CopyToClipboard>

        </div>
    )



}

export default ShareButton