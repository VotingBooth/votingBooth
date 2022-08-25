import '.././styling/Footer.scss'

function Footer() {
    return (
        <footer>
            <div className='wrapper footerContent'>
                <p>
                    <a href="https://github.com/VotingBooth/votingBooth">Built at Juno</a>
                </p>
                <p>Collaborators -
                    <a href="https://www.connorrobock.com/">Connor</a>
                    ,
                    <a href="https://kaitlynwcodes.ca/">Kaitlyn</a>
                    ,
                    <a href="https://portfolio.gourlay.me/">Nick</a>
                    , and
                    <a href="https://paridhishah.dev/">Paridhi</a>
                </p>
            </div>
        </footer>
    )
}

export default Footer