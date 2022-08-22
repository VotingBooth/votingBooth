import './App.css';
import Header from './Header'
import Footer from './Footer'
import PollCreate from './PollCreate'
import PollResponse from './PollResponse'
import PollResults from './PollResults'
import { Routes, Route } from 'react-router-dom'

function App() {

  return (
    <div>
      <Header />
      {/* <Routes>
        <Route path='/poll' element={<PollCreate />} />
        <Route path='/poll/:pollID' element={<PollResponse />} />
        <Route path='/poll/:pollID/results' element={<PollResults />} />
      </Routes> */}
      <PollResponse />
      <Footer />
    </div>
  );
}

export default App;
