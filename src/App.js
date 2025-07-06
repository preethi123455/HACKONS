import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './Components/Signup';
import Login from './Components/Login';
import DHome from './Components/DHome';
import RHome from './Components/RHome';
import BHome from './Components/BHome'; // Adjust path if needed

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/donor-home" element={<DHome />} />
        <Route path="/bloodbank-home" element={<BHome />} />
        <Route path="/receiver-home" element={<RHome />} />

      </Routes>
    </Router>
  );
}

export default App;
