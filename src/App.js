import './App.scss';
import Header from './components/Header'
import Footer from './components/Footer'
import PollCreate from './components/PollCreate'
import PollResponse from './components/PollResponse'
import PollResults from './components/PollResults'
import { Routes, Route } from 'react-router-dom'
import Login from './Login';
import { AuthContextProvider } from './AuthContext';

function App() {
  return (
    <div>
      <AuthContextProvider>

        <Header />
        <Routes>
          <Route path='/' element={<PollCreate />} />
          <Route path='/login' element={<Login />} />
          <Route path='/poll/:pollID' element={<PollResponse />} />
          <Route path='/poll/:pollID/results' element={<PollResults />} />

        </Routes>
        <Footer />
      </AuthContextProvider>
    </div>
  );
}
export default App;
