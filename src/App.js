import './App.scss';
<<<<<<< HEAD
import Header from './Header'
import Footer from './Footer'
import PollCreate from './PollCreate'
import PollResponse from './PollResponse'
import PollResults from './PollResults'
=======
import Header from './components/Header'
import Footer from './components/Footer'
import PollCreate from './components/PollCreate'
import PollResponse from './components/PollResponse'
import PollResults from './components/PollResults'
>>>>>>> 097b955a2c34c20461a3adabbc23b3334fba61ea
import { Routes, Route } from 'react-router-dom'

function App() {

  return (
    <div className='wholePage'>
      <Header />
      <Routes>
        <Route path='/' element={<PollCreate />} />
        <Route path='/poll/:pollID' element={<PollResponse />} />
        <Route path='/poll/:pollID/results' element={<PollResults />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
