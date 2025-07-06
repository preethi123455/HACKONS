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
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/donor-home" element={<DHome />} />
        <Route path="/bloodbank-home" element={<BHome />} />
        <Route path="/receiver-home" element={<RHome />} />
        <Route path="/farticle" element={<Farticle />} />
        <Route path="/sarticle" element={<Sarticle />} />
        <Route path="/Tarticle" element={<Tarticle />
      } />

      </Routes>
    </Router>
  );
}

export default App;
