import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./components/navBar";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

// Page Components
const Home: React.FC = () => <h2 />;
const About: React.FC = () => <h2>About Page</h2>;
const Contact: React.FC = () => <h2>Contact Page</h2>;

const App: React.FC = () => {
  const theme = createTheme({
    typography: {
      fontFamily: '"Montserrat Alternates", sans-serif',
      h1: {
        fontSize: "2.5rem",
        color: "#d4af37", // Gold color for h1
      },
      h2: {
        fontSize: "2rem",
        color: "#d4af37", // Gold color for h2
      },
      body1: {
        fontSize: "1.1rem",
        color: "#333", // Dark color for text
      },
    },
    palette: {
      primary: {
        main: "#d4af37", // Gold color for primary elements like buttons
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Router>
        <div className="App">
          {/* Define Routes */}
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
