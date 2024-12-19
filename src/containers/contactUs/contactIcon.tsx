import type { IconDefinition } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton } from "@mui/material";
import React, { type CSSProperties } from "react";
interface ContactIconProps {
  title: string;
  href: string;
  iconName: IconDefinition;
  iconColor?: string;
}
const styles = {
  icon: (iconColor?: string): CSSProperties => ({
    color: iconColor,
    fontSize: "7rem",
  }),
};
const ContactIcon = ({
  title,
  href,
  iconName,
  iconColor,
}: ContactIconProps) => (
  <IconButton
    aria-label={`Contact via ${title}`}
    color="inherit"
    target="_blank"
    href={href}
  >
    <FontAwesomeIcon icon={iconName} style={styles.icon(iconColor)} />
  </IconButton>
);

export default ContactIcon;
