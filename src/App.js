import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './Components/Signup';
import Login from './Components/Login';
import DHome from './Components/DHome';
import RHome from './Components/RHome';
import BHome from './Components/BHome'; // Adjust path if needed
import Farticle from "./Components/ScienceArticle";
import Sarticle from "./Components/BloodTypeCompatibility";
import Tarticle from "./Components/DonationPreparation";
import Landing from "./Components/LandingPage";
import Chatbot from "./Components/Chatbot";
import DiffBB from './Components/DiffBB';
import Requesthistory from "./Components/RequestHistory";
import Bankdetails from "./Components/Blood-bank-details";
import Emergency  from './Components/Emergency';
// Receiver Sub-Components
import RequestBlood from './Components/RequestBlood';
import MatchingDonors from './Components/MatchingDonors';
import RequestHistory from './Components/RequestHistory';
import ProfileSettings from './Components/ProfileSettings';
import LandingPage from './Components/LandingPage';
import AdminDashboard from './Components/AdminDashboard';

function App() {
  return (
    <Router>
      <Routes>
        {/* General Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/donor-home" element={<DHome />} />
        <Route path="/bloodbank-home" element={<BHome />} />
        <Route path="/receiver-home" element={<RHome />} />
        <Route path="/farticle" element={<Farticle />} />
        <Route path="/sarticle" element={<Sarticle />} />
        <Route path="/Tarticle" element={<Tarticle />} />
        <Route path="/logout" element={<Landing />} />
        <Route path="/chatbot" element={<Chatbot />} />
         <Route path="/diffbb" element={<DiffBB />} />
         <Route path="/history" element={<RequestHistory />} />
         <Route path="/bankdetails" element={<Bankdetails />} />
         <Route path="/emergency" element={<Emergency />} />
          <Route path='/admin' element={<AdminDashboard/>}/>
        {/* Receiver Feature Routes */}
        <Route path="/request-blood" element={<RequestBlood />} />
        <Route path="/donors" element={<MatchingDonors />} />
        <Route path="/history" element={<RequestHistory />} />
        <Route path="/profile" element={<ProfileSettings />} />
      </Routes>
    </Router>
  );
}

export default App;
