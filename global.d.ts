// global.d.ts
export {};
export interface GoogleButtonOptions {
  type?: "standard" | "icon";
  theme?: "outline" | "filled_blue" | "filled_black";
  size?: "small" | "medium" | "large";
  text?: "signin_with" | "signup_with" | "continue_with" | "signin";
  shape?: "rectangular" | "pill";
  logo_alignment?: "left" | "center";
  width?: string | number; // e.g., "300px", "100%", or 300
  locale?: string; // e.g., "en", "fr", "es", "zh-CN", etc.
}

declare global {
  interface Window {
    google: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: any) => void;
          }) => void;
          renderButton: (
            element: HTMLElement,
            options: GoogleButtonOptions
          ) => void;
          prompt: () => void;
          disableAutoSelect: () => void;
        };
      };
    };
  }
}
