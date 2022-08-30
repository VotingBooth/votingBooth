import { FaGithubSquare, FaLinkedin, FaFolderOpen } from 'react-icons/fa';
import '.././styling/AboutUs.scss'
import Connor from '.././assets/Connor.jpg'
import Kaitlyn from '.././assets/Kaitlyn_Resized.jpg'
import Paridhi from '.././assets/Paridhi.jpg'
import Nick from '.././assets/Nick.JPG'
import { Helmet } from 'react-helmet'; 

function AboutUs () {
    return (
        <section className="aboutUs">
            <Helmet>
                <title>About the Creators</title>
            </Helmet>
            <div className="flexContainer">
                <h2 className='aboutTitle'>About Us</h2>
                <p>Hello, and welcome to our anonymous voting booth! Our clients tasked us with creating a fully accesible and responsive website that would allow users to create and share anonymous polls. Please take the time to create and share a poll!</p>
                <div className="imgContainer">
                    <h3 className='name'>Connor Robock</h3>
                    <img src={Connor} alt="headshot of creators"/>
                    <div className="socialContainer">
                        <a target="_blank" rel="noopener noreferrer" href="https://github.com/ConnorRobock" >
                            <FaGithubSquare />
                        </a>
                        <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/connor-robock-00671968/">
                            <FaLinkedin />
                        </a>
                        <a target="_blank" rel="noopener noreferrer" href="https://kaitlynwcodes.ca/">
                            <FaFolderOpen />
                        </a>
                    </div>
                </div>
                <div className="imgContainer">
                    <h3 className='name'>Kaitlyn Wickson</h3>
                    <img src={Kaitlyn} alt="headshot of creators"/>
                    <div className="socialContainer">
                        <a target="_blank" rel="noopener noreferrer" href="https://github.com/kaitlynw88">
                            <FaGithubSquare />
                        </a>
                        <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/kaitlyn-wickson-8a346766/">
                            <FaLinkedin />
                        </a>
                        <a target="_blank" rel="noopener noreferrer" href="https://kaitlynwcodes.ca/">
                            <FaFolderOpen />
                        </a>
                    </div>
                </div>
                <div className="imgContainer">
                    <h3 className='name'>Nick Gourlay</h3>
                    <img src={Nick} alt="headshot of creators"/>
                    <div className="socialContainer">
                        <a target="_blank" rel="noopener noreferrer" href="https://github.com/NicholG90">
                            <FaGithubSquare />
                        </a>
                        <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/connor-robock-00671968/">
                            <FaLinkedin />
                        </a>
                        <a target="_blank" rel="noopener noreferrer" href="https://portfolio.gourlay.me/">
                            <FaFolderOpen />
                        </a>
                    </div>
                </div>
                <div className="imgContainer">
                    <h3 className='name'>Paridhi Shah</h3>
                    <img src={Paridhi} alt="headshot of creators"/>
                    <div className="socialContainer">
                        <a target="_blank" rel="noopener noreferrer" href="https://github.com/paridhishah96">
                            <FaGithubSquare />
                        </a>
                        <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/paridhishahcodes/">
                            <FaLinkedin />
                        </a>
                        <a target="_blank" rel="noopener noreferrer" href="https://paridhishah.dev/">
                            <FaFolderOpen />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )

}

export default AboutUs