import { Box, AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import vsImage from "../../VS.png";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faInstagram } from "@fortawesome/free-brands-svg-icons";

const NavBar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="transparent">
        <Toolbar sx={{ padding: "1rem" }}>
          <img
            src={vsImage}
            alt="tirumala"
            style={{ width: "4rem", height: "4rem" }}
          />
          <Box sx={{ flexGrow: 1 }} />
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontWeight: 700,
              fontSize: "1.3rem",
              fontFamily: "Montserrat Alternates",
              padding: "10px 20px",
              fontStyle: "italic",
              alignItems: "center",
            }}
          >
            VS tirumala arts
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: "flex" }}>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
              target="_blank"
              href="https://www.instagram.com/vsthirumaalarts/"
            >
              <FontAwesomeIcon
                icon={faInstagram}
                style={{ color: "#E1306C", fontSize: "40px" }}
              />
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
              target="_blank"
              href="https://www.facebook.com/profile.php?id=100071156650454"
            >
              <FontAwesomeIcon icon={faFacebookF} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
