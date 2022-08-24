import './App.css';
import Header from './Header'
import Footer from './Footer'
import PollCreate from './PollCreate'
import PollResponse from './PollResponse'
import PollResults from './PollResults'
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
