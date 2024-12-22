import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Drawer,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { jwtDecode } from "jwt-decode";
import vsImage from "../../VS.png";
import { useGoogleLogin } from "../../hooks/useGoogleLogin";
import {
  clearGoogleUserData,
  setGoogleUserData,
} from "../../store/slices/userSlice";
import { useDispatch } from "react-redux";
import { DrawerContent } from "./DrawerContent";
import { UserSection } from "./userSection";
import { NAV_STYLES } from "./styles";

// Types
interface CustomJwtPayload {
  name: string;
  picture: string;
  email?: string;
}

interface NavItem {
  text: string;
  href: string;
}

export interface UserData {
  name: string;
  picture: string;
}

// Constants
const NAV_ITEMS: readonly NavItem[] = [
  { text: "Home", href: "/" },
  { text: "About", href: "/about" },
  { text: "Contact", href: "/contact" },
] as const;

// Main Component
const NavBar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser?.name && parsedUser?.picture) {
          setUser(parsedUser);
        }
      } catch (err) {
        console.error("Failed to parse stored user data:", err);
        localStorage.removeItem("user");
      }
    }
  }, []);

  const handleDrawerToggle = useCallback(() => {
    setMobileOpen((prev) => !prev);
  }, []);
  const handleLogout = () => {
    // Dispatch the action to clear user data
    dispatch(clearGoogleUserData());
    localStorage.removeItem("user");
    setUser(null);

    // Optional: Remove Google credentials
    if (window.google) {
      window.google.accounts.id.disableAutoSelect(); // Prevent auto-login on refresh
    }

    // You can also clear other data, like tokens, from localStorage/sessionStorage
    console.log("User logged out");
  };

  const handleCredentialResponse = useCallback(
    async (response: { credential: string }) => {
      setLoading(true);
      setError(null);

      try {
        const decodedToken = jwtDecode<CustomJwtPayload>(response.credential);
        dispatch(
          setGoogleUserData({
            name: decodedToken.name,
            email: decodedToken.email ?? null,
            picture: decodedToken.picture,
          })
        );

        if (!decodedToken.name || !decodedToken.picture) {
          throw new Error("Invalid token data");
        }

        const userData: UserData = {
          name: decodedToken.name,
          picture: decodedToken.picture,
        };

        localStorage.removeItem("user");
        setUser(null);

        setTimeout(() => {
          setUser(userData);
          localStorage.setItem("user", JSON.stringify(userData));
        }, 0);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to decode the token";
        setError(errorMessage);
        console.error("Authentication error:", err);
      } finally {
        setLoading(false);
      }
    },
    [dispatch]
  );

  const handleGoogleLogin = useCallback(() => {
    if (window.google) {
      setLoading(true);
    } else {
      setError("Google Identity Services script not loaded");
      setLoading(false);
    }
  }, []);

  useGoogleLogin(
    {
      clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID!,
      callback: handleCredentialResponse,
    },
    user
  );

  const container =
    typeof window !== "undefined" ? () => document.body : undefined;

  return (
    <Box sx={{ flexGrow: 1, marginBottom: "1rem" }}>
      <AppBar position="static" color="transparent">
        <Toolbar sx={{ padding: "1rem" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <img
            src={vsImage}
            alt="tirumala"
            style={{ width: "4rem", height: "4rem" }}
          />
          <Box sx={{ flexGrow: 1 }} />
          <Typography variant="h6" component="div" sx={NAV_STYLES.typography}>
            VS tirumala arts
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {NAV_ITEMS.map((item) => (
              <Button key={item.text} href={item.href} color="inherit">
                {item.text}
              </Button>
            ))}
          </Box>
          <UserSection
            user={user}
            loading={loading}
            error={error}
            onGoogleLogin={handleGoogleLogin}
          />
          {user?.name && (
            <Button
              variant="contained"
              color="secondary"
              onClick={handleLogout}
              sx={{ marginLeft: "1rem" }}
            >
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: NAV_STYLES.drawer.width,
            },
          }}
        >
          <DrawerContent onClose={handleDrawerToggle} />
        </Drawer>
      </nav>
    </Box>
  );
};

export default React.memo(NavBar);
