import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
  Avatar,
  CircularProgress,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { jwtDecode } from "jwt-decode";
import vsImage from "../../VS.png";
import { useGoogleLogin } from "../../hooks/useGoogleLogin";

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

interface UserData {
  name: string;
  picture: string;
}

// Constants
const NAV_ITEMS: readonly NavItem[] = [
  { text: "Home", href: "/" },
  { text: "About", href: "/about" },
  { text: "Contact", href: "/contact" },
] as const;

const STYLES = {
  typography: {
    fontWeight: 700,
    fontSize: "1.3rem",
    fontFamily: "Montserrat Alternates",
    padding: "10px 20px",
    fontStyle: "italic",
    alignItems: "center",
  },
  drawer: {
    width: 240,
  },
  avatar: {
    width: 40,
    height: 40,
    marginLeft: "1rem",
  },
} as const;

// Components
const DrawerContent: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <Box onClick={onClose} sx={{ textAlign: "center" }}>
    <Divider />
    <List>
      {NAV_ITEMS.map((item) => (
        <ListItem key={item.text} disablePadding>
          <ListItemButton sx={{ textAlign: "center" }} href={item.href}>
            <ListItemText primary={item.text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  </Box>
);

const UserSection: React.FC<{
  user: UserData | null;
  loading: boolean;
  error: string | null;
  onGoogleLogin: () => void;
}> = ({ user, loading, error, onGoogleLogin }) => {
  const [imageLoading, setImageLoading] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    if (user?.picture) {
      const img = new Image();
      img.src = user.picture;
      img.onerror = () => setImgError(true);
      img.onload = () => setImgError(false);
    }
  }, [user?.picture]);

  if (user) {
    return (
      <>
        <Typography variant="subtitle1" sx={{ marginLeft: "1rem" }}>
          Welcome, {user.name}
        </Typography>
        <Box sx={{ position: "relative", marginLeft: "1rem" }}>
          <Avatar
            alt={user.name}
            src={
              imgError ? undefined : `${user.picture}?${new Date().getTime()}`
            }
            key={user.picture}
            sx={{
              ...STYLES.avatar,
              opacity: imageLoading ? 0.5 : 1,
            }}
            onLoad={() => setImageLoading(false)}
            onLoadStart={() => setImageLoading(true)}
          >
            {imgError && user.name.charAt(0)}
          </Avatar>
          {imageLoading && (
            <CircularProgress
              size={20}
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                marginTop: "-10px",
                marginLeft: "-10px",
              }}
            />
          )}
        </Box>
      </>
    );
  }

  return (
    <>
      {loading ? (
        <CircularProgress color="inherit" size={24} />
      ) : (
        <div
          id="google-signin-button"
          data-testid="google-signin-button"
          onClick={onGoogleLogin}
        />
      )}
      {error && (
        <Typography color="error" sx={{ marginLeft: "1rem" }}>
          {error}
        </Typography>
      )}
    </>
  );
};

// Main Component
const NavBar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  const handleCredentialResponse = useCallback(
    async (response: { credential: string }) => {
      setLoading(true);
      setError(null);

      try {
        const decodedToken = jwtDecode<CustomJwtPayload>(response.credential);

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
    []
  );

  const handleGoogleLogin = useCallback(() => {
    if (window.google) {
      setLoading(true);
    } else {
      setError("Google Identity Services script not loaded");
      setLoading(false);
    }
  }, []);

  useGoogleLogin({
    clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID!,
    callback: handleCredentialResponse,
  });

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
          <Typography variant="h6" component="div" sx={STYLES.typography}>
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
              width: STYLES.drawer.width,
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
