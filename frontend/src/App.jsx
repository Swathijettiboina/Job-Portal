import Home from './components/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Jobs from './pages/Jobs';
import About from './pages/About';
import JobDetailsView from './components/JobDetailsView';
import Signup from './components/Signup';
import Login from './components/Login';
import MainPage from './components/MainPage';
import HrProfile from './components/HrProfile';
import PremiumPage from './pages/PremiumPage';
import NewPremiumUser from './pages/NewPremiumUser';
import PremiumContent from './pages/PremiumContent';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import AddJobForm from './components/AddJobForm';

const stripePromise = loadStripe("pk_test_51QvgE2PttfWc6sY22QCNXZxhr3X3pXiMTAqX5qoymMcb3o2GlGoCc2fuSJqLjzSvKMxddPapUqMSc7VChIojThTc00srKxCx4T");

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
          <Route path='/main' element={<MainPage />} />
          <Route path='/premium' element={<PremiumPage />} />
          <Route path='/getpremium' element={<Elements stripe={stripePromise}><NewPremiumUser /></Elements>} />
          <Route path='/haspremium' element={<PremiumContent />} />
          <Route path='/hrprofile' element={<HrProfile />} />
          <Route path='/addJob' element={<AddJobForm />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
