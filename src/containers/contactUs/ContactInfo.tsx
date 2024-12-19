import { Typography } from "@mui/material";
import React from "react";

interface ContactInfoProps {
  title: string;
  description: string;
}
const ContactInfo = ({ title, description }: ContactInfoProps) => (
  <>
    <Typography component="h2" variant="h5">
      {title}
    </Typography>
    <Typography
      variant="subtitle1"
      component="p"
      sx={{ color: "text.secondary" }}
    >
      {description}
    </Typography>
  </>
);

export default ContactInfo;
