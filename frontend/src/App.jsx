import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Home from './components/Home';
import Jobs from './pages/Jobs';
import About from './pages/About';
import JobDetailsView from './components/JobDetailsView';
import Signup from './components/Signup';
import Login from './components/Login';
import SeekerProfile from './pages/SeekerProfile';
import MainNavbar from './components/MainNavbar';
import Navbar from './components/Navbar';

function App() {
    const [user, setUser] = useState(null);

    // Check for user authentication
    useEffect(() => {
        const userDetails = localStorage.getItem("user");
        if (userDetails) {
            setUser(JSON.parse(userDetails));
        }
    }, []);

    // Function to handle login
    const handleLogin = (userData) => {
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData); // Update state immediately
    };

    // Function to handle logout
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null); 
    };

    return (
        <BrowserRouter>
            {user ? <MainNavbar logout={handleLogout} /> : <Navbar />}
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/jobs' element={<Jobs />} />
                <Route path='/about' element={<About />} />
                <Route path='/jobs/:job_id' element={<JobDetailsView />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/login' element={<Login onLogin={handleLogin} />} />
                <Route path='/seekerprofile' element={<SeekerProfile />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
