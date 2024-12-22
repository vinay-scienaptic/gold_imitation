import { useEffect } from "react";

interface GoogleConfig {
  clientId: string;
  callback: (response: any) => void;
}

export const useGoogleLogin = (config: GoogleConfig) => {
  useEffect(() => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: config.clientId,
        callback: config.callback,
      });

      window.google.accounts.id.renderButton(
        document.getElementById("google-signin-button")!,
        { theme: "outline", size: "large" }
      );

      window.google.accounts.id.prompt();
    } else {
      console.error("Google Identity Services script not loaded");
    }
  }, [config.clientId, config.callback]);
};
