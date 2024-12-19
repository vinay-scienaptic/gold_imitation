import {
  faFacebookF,
  faInstagram,
  faWhatsappSquare,
} from "@fortawesome/free-brands-svg-icons";
import { Container, Box, Stack } from "@mui/material";
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
    <Container maxWidth="lg">
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
    </Container>
  );
};

export default ContactUs;
