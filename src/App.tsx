import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/navBar";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import ContactUs from "./containers/contactUs";
// Page Components
const Home: React.FC = () => <h2>Still is in progress</h2>;
const About: React.FC = () => <h2>About Page</h2>;

const App: React.FC = () => {
  const theme = createTheme({
    typography: {
      fontFamily: "serif",
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
        color: "blue", // Dark color for text
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Router>
        <div className="App">
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<ContactUs />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
