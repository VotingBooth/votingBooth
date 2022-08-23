function ShareButton({ shareTitle, shareURL }) {

    const shareData = {
        title: shareTitle,
        url: shareURL
    }
    const handleClick = async () => {
        try {
            await navigator.share(shareData)
        }
        catch (err) {
            alert('error')
        }

    }
    return (
        navigator.canShare ? <button onClick={handleClick}>Share!</button> : null
    )



}

export default ShareButton