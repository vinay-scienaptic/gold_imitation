import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";

// Page Components
const Home: React.FC = () => <h2 className="gold-text">Home Page</h2>;
const About: React.FC = () => <h2 className="gold-text">About Page</h2>;
const Contact: React.FC = () => <h2 className="gold-text">Contact Page</h2>;

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1 className="gold-text">[Your Name]</h1>

          {/* Navigation Links */}
          <nav>
            <ul>
              <li>
                <Link to="/" className="gold-text">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="gold-text">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="gold-text">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </header>

        {/* Define Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
