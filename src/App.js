import './App.scss';
import Header from './components/Header';
import Footer from './components/Footer';
import PollCreate from './components/PollCreate';
import PollResponse from './components/PollResponse';
import PollResults from './components/PollResults';
import SavedPolls from './components/SavedPolls';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import { AuthProvider } from './components/AuthContext';
import AboutUs from './components/AboutUs'

function App() {
  return (
 <AuthProvider> 
        <Header />
        <div className='wrapper'>
          <div>
            <Routes>
              <Route path='/' element={<PollCreate />} />
              <Route path='/login' element={<Login />} />
              <Route path='/saved' element={<SavedPolls />} />
              <Route path='/poll/:pollID' element={<PollResponse />} />
              <Route path='/poll/:uid/:pollID' element={<PollResponse />} />
              <Route path='/poll/:pollID/results' element={<PollResults />} />
              <Route path='/poll/:uid/:pollID/results' element={<PollResults />} />
              <Route path='/about' element={<AboutUs />} />
            </Routes>
          </div>
        </div>
        <Footer />
    </AuthProvider>
  );
}
export default App;
