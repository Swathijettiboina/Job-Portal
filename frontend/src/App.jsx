import Home from './components/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Jobs from './pages/Jobs';
import About from './pages/About';
import JobDetailsView from './components/JobDetailsView';
import Signup from './components/Signup';
import Login from './components/Login';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/jobs' element={<Jobs />} />
          <Route path='/about' element={<About />} />
          <Route path='/jobs/:job_id' element={<JobDetailsView />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

