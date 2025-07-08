// import React, { useState } from 'react';
// import '../Styles/BHome.css';
// import { useNavigate } from 'react-router-dom';
// import ScienceArticle from './ScienceArticle';
// import BloodTypeCompatibility from './BloodTypeCompatibility';
// import DonationPreparation from './DonationPreparation';

// const BHome = () => {
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     name: '',
//     location: '',
//     bloodAvailability: '',
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     alert("Blood Bank Registered Successfully!");
//     setForm({ name: '', location: '', bloodAvailability: '' });
//   };

//   return (
//     <div className="bhome-container">
//       {/* Navbar */}
//       <nav className="navbar">
//         <div className="logo">❤️ BloodLink</div>
//         <ul className="nav-links">
//           <li><a href="#about">About</a></li>
//           <li><a href="#services">Services</a></li>
//           <li><a href="#blog">Blog</a></li>
//           <li><a href="#register">Register</a></li>
//           <li><a href="#contact">Contact</a></li>
//         </ul>
//         <button className="cta-btn">Donate Now</button>
//       </nav>

//       {/* Hero Section */}
//       <header className="hero">
//         <div className="hero-text">
//           <h1>Save Lives, <span>Donate Blood</span></h1>
//           <p>
//             Join thousands of heroes who donate blood regularly. Your contribution
//             can save up to three lives and make a lasting impact in your community.
//           </p>
//           <div className="hero-buttons">
//             <button className="primary-btn">Start Donating →</button>
//             <button className="outline-btn">Learn More</button>
//           </div>
//         </div>
//         <div className="hero-image">
//           <img
//             src="https://media.istockphoto.com/id/2154964150/photo/the-concept-of-donation-blood-transfusion.jpg?s=612x612&w=0&k=20&c=EPcXA2NNoTk6vRYRDIwAgXf9UFMKu1K2nlnCzoRtD64="
//             alt="Hero"
//             style={{ width: '100%', height: '100%', borderRadius: '12px', objectFit: 'cover' }}
//           />
//         </div>
//       </header>

//       {/* Features */}
//       <section className="features" id="services">
//         <h2>Why Choose BloodLink?</h2>
//         <p>We provide a secure, efficient, and reliable platform connecting donors with those in need.</p>
//         <div className="feature-cards">
//           <div className="card">
          
//             <h3>🔒 Secure & Safe</h3>
//             <p>Advanced security measures and screening protocols ensure complete safety.</p>
//           </div>
//           <div className="card">
           
//             <h3>⏱️ 24/7 Availability</h3>
//             <p>Round-the-clock emergency support and blood supply system.</p>
//           </div>
//           <div className="card">
            
//             <h3>🏥 Certified Excellence</h3>
//             <p>Accredited facilities with top medical standards and service.</p>
//           </div>
//         </div>
//       </section>

//       {/* Statistics */}
//       <section className="stats">
//         <div>
//           <h2>❤️ 50K+</h2>
//           <p>Lives Saved</p>
//         </div>
//         <div>
//           <h2>🧑 25K+</h2>
//           <p>Active Donors</p>
//         </div>
//         <div>
//           <h2>🏥 500+</h2>
//           <p>Partner Hospitals</p>
//         </div>
//         <div>
//           <h2>✅ 99.9%</h2>
//           <p>Success Rate</p>
//         </div>
//       </section>

//       {/* Blog Articles */}
//       <section className="blog-section" id="blog">
//         <h2>Latest Articles</h2>
//         <p>Stay informed with our latest insights and updates</p>
//         <div className="blog-cards">
//           <div className="blog-card">
            
//             <h4>The Science Behind Blood Donation</h4>
//             <button className="read-btn" onClick={() => navigate('/farticle')}>Read More →</button>
//           </div>
//           <div className="blog-card">
//             <img src="https://media.istockphoto.com/id/1291577428/vector/blood-group-compatibility-chart-with-universal-donor-0-and-universal-recipient-ab-concerning.jpg?s=612x612&w=0&k=20&c=LuiLsoXn_JOPaqK-WWLN0pOLQkLTtm-2sVJ36B2yTZ0=" alt="Article 2" className="image-placeholder" style={{ width: '100%', borderRadius: '10px' }} />
//             <h4>Blood Type Compatibility Made Simple</h4>
//             <button className="read-btn" onClick={() => navigate('/sarticle')}>Read More →</button>
//           </div>
//           <div className="blog-card">
//             <img src="https://media.istockphoto.com/id/1445531404/photo/world-blood-donation-donor-day-and-save-life.jpg?s=612x612&w=0&k=20&c=BWWNmtNDQgd4kYClYJAEf9sH3W5gxeC46zUz0c9vfpg=" alt="Article 3" className="image-placeholder" style={{ width: '100%', borderRadius: '10px' }} />
//             <h4>Preparing for Your Donation Day</h4>
//             <button className="read-btn" onClick={() => navigate('/tarticle')}>Read More →</button>
//           </div>
//         </div>
//       </section>

//       {/* Registration */}
//       <section className="register-section" id="register">
//         <h2>Register Your Blood Bank</h2>
//         <p>Join our network and help save more lives</p>
//         <form onSubmit={handleSubmit}>
//           <input type="text" name="name" placeholder="Blood Bank Name" value={form.name} onChange={handleChange} required />
//           <input type="text" name="location" placeholder="Location" value={form.location} onChange={handleChange} required />
//           <textarea name="bloodAvailability" placeholder="Available Blood Groups (e.g. A+, B-)" value={form.bloodAvailability} onChange={handleChange} required />
//           <button type="submit">Register Blood Bank</button>
//         </form>
//       </section>

//       {/* Testimonials */}
//       <section className="testimonials">
//         <h2>What Our Community Says</h2>
//         <div className="testimonial-cards">
//           <div className="testimonial">
//             <p>"BloodLink has transformed our hospital’s blood management system. The efficiency is amazing!"</p>
//             <strong>– Dr. Sarah Mathews</strong>
//           </div>
//           <div className="testimonial">
//             <p>"The donation process is easier and the results are incredibly streamlined. I'm proud to be a donor."</p>
//             <strong>– Jason Rodriguez</strong>
//           </div>
//           <div className="testimonial">
//             <p>"Managing inventory and connecting with donors has never been easier. The platform is top-notch!"</p>
//             <strong>– Lisa Chen</strong>
//           </div>
//         </div>
//       </section>

//       {/* Contact */}
//       <section className="contact" id="contact">
//         <h2>Get in Touch</h2>
//         <p>support@bloodlink.org | +91 98765 43210</p>
//         <button className="cta-btn">Contact Support</button>
//       </section>

//       {/* Footer */}
//       <footer className="footer">
//         <p>© 2025 BloodLink | All Rights Reserved</p>
//       </footer>
//     </div>
//   );
// };

// export default BHome;

// src/components/BHome.js
import React, { useState } from 'react';
import '../Styles/BHome.css';
import { useNavigate } from 'react-router-dom';

const BHome = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    address: '',
    bloodGroup: '',
    units: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const storedEmail = localStorage.getItem('userEmail'); // ✅ fixed key

    if (!storedEmail) {
      alert('⚠️ You must be logged in to register a blood bank.');
      navigate('/login');
      return;
    }

    if (!form.name || !form.address || !form.bloodGroup || !form.units) {
      alert("❗ Please fill in all fields.");
      return;
    }

    try {
      const res = await fetch('http://localhost:8000/register-bloodbank', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          location: form.address,
          email: storedEmail,
          bloodAvailability: [
            {
              bloodGroup: form.bloodGroup,
              units: parseInt(form.units, 10)
            }
          ]
        })
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message);
        setForm({
          name: '',
          address: '',
          bloodGroup: '',
          units: ''
        });
      } else {
        alert(data.message || 'Failed to register blood bank.');
      }
    } catch (error) {
      console.error('Error registering blood bank:', error);
      alert('❌ Server error. Try again later.');
    }
  };

  return (
    <div className="bhome-container">
      {/* Registration Section */}
      <section className="register-section" id="register">
        <h2>Register Your Blood Bank</h2>
        <p>Join our network and help save more lives</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Blood Bank Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="bloodGroup"
            placeholder="Blood Group (e.g. A+)"
            value={form.bloodGroup}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="units"
            placeholder="Units of Stock Available"
            value={form.units}
            onChange={handleChange}
            required
          />
          <button type="submit">Register Blood Bank</button>
        </form>
      </section>
    </div>
  );
};

export default BHome;