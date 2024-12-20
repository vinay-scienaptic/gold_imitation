import {
  faFacebookF,
  faInstagram,
  faWhatsappSquare,
} from "@fortawesome/free-brands-svg-icons";
import { Container, Box, Stack, Alert, Paper } from "@mui/material";
import React from "react";
import ContactCard from "./contactCard";

// Define contact data separately for better maintainability
const socialMediaContacts = [
  {
    id: "whatsapp",
    href: "https://wa.me/916383653244",
    iconName: faWhatsappSquare,
    iconColor: "#25D366",
    title: "Personalize Your Jewelry on WhatsApp!",
    description:
      "Have questions or need a custom design? Chat with us directly for personalized assistance and recommendations!",
  },
  {
    id: "facebook",
    href: "https://www.facebook.com/profile.php?id=100071156650454",
    iconName: faFacebookF,
    iconColor: "#1877F2",
    title: "Connect with Us on Facebook!",
    description:
      "Join our community for exclusive updates, special offers, and beautiful jewelry showcases!",
  },
  {
    id: "instagram",
    href: "https://www.instagram.com/vsthirumaalarts/",
    iconName: faInstagram,
    iconColor: "#E1306C",
    title: "Explore Our Sparkling Creations on Instagram!",
    description:
      "Follow us for daily inspiration, behind-the-scenes looks, and stunning jewelry that shines as bright as you!",
  },
] as const;

const ContactUs: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ padding: "1rem" }}>
      <Box py={4}>
        <Stack
          spacing={3}
          justifyContent="center"
          direction={{ sx: "column", md: "row" }}
        >
          {socialMediaContacts.map((contact) => (
            <ContactCard
              key={contact.id}
              href={contact.href}
              iconName={contact.iconName}
              iconColor={contact.iconColor}
              title={contact.title}
              description={contact.description}
            />
          ))}
        </Stack>
      </Box>

      <Paper
        elevation={4}
        sx={{
          padding: "1rem",
          color: "#4e4b66",
          backgroundColor: "#f9f9f9",
          marginTop: "1rem",
        }}
      >
        <div style={{ marginTop: "40px", textAlign: "center" }}>
          <h2>Visit Our Store</h2>
          <div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.835434509364!2d76.945514!3d11.0277088!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTEuMDE3MzA0LCA3Ni45NDgwODg5!5e0!3m2!1sen!2sus!4v1692635261530!5m2!1sen!2sus"
              width="100%"
              height="300"
              style={{ border: 0 }}
              loading="lazy"
              title="Google Map"
            ></iframe>
          </div>
          {/* Clickable Link */}
          <p style={{ marginTop: "10px" }}>
            <a
              href="https://www.google.com/maps/place/11%C2%B001'39.8%22N+76%C2%B056'53.1%22E/@11.0277088,76.945514,17z"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                textDecoration: "none",
                color: "#007BFF",
                fontWeight: "bold",
              }}
            >
              Open in Google Maps
            </a>
          </p>
        </div>
      </Paper>
    </Container>
  );
};

export default ContactUs;
