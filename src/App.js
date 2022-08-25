import './App.scss';
import Header from './Header'
import Footer from './Footer'
import PollCreate from './PollCreate'
import PollResponse from './PollResponse'
import PollResults from './PollResults'
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
