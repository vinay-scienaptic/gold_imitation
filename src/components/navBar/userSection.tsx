import { Typography, Box, Avatar, CircularProgress } from "@mui/material";
import { useState, useEffect } from "react";
import { NAV_STYLES } from "./styles";
import type { UserData } from ".";

export const UserSection: React.FC<{
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
              ...NAV_STYLES.avatar,
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
        <div id="google-signin-button" />
      )}
      {error && (
        <Typography color="error" sx={{ marginLeft: "1rem" }}>
          {error}
        </Typography>
      )}
    </>
  );
};
