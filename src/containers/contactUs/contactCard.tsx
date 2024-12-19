import { IconDefinition } from "@fortawesome/free-brands-svg-icons";
import { Paper, Box, styled, Stack } from "@mui/material";
import { memo } from "react";
import ContactInfo from "./ContactInfo";
import ContactIcon from "./contactIcon";

interface ContactCardProps {
  title: string;
  description: string;
  href: string;
  iconName: IconDefinition;
  iconColor?: string;
}

const CardContainer = styled(Box)(({ theme }) => ({
  textAlign: "center",
  padding: theme.spacing(2),
  width: "100%",
  maxWidth: 400,
  height: 400,
  [theme.breakpoints.down("sm")]: {
    maxWidth: "100%",
    height: 400,
    padding: theme.spacing(1),
  },
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),

  width: "100%",
  height: "100%",
  overflow: "hidden", // Prevent content from spilling out
  transition: theme.transitions.create(["transform"], {
    duration: theme.transitions.duration.shorter,
  }),
  "&:hover": {
    transform: "scale(1.02)",
  },
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(1),
  },
}));

const StyledStack = styled(Stack)({
  width: "100%",
  height: "100%",
  overflow: "hidden", // Prevent content from spilling out
});

// Add this new styled component for text content
const ContentWrapper = styled(Stack)({
  width: "100%",
  overflow: "hidden", // Prevent content from spilling out
  textOverflow: "ellipsis", // Add ellipsis for overflowing text
  wordWrap: "break-word", // Break long words if necessary
});

const ContactCard = memo(
  ({ title, description, href, iconName, iconColor }: ContactCardProps) => {
    return (
      <CardContainer>
        <StyledPaper elevation={5}>
          <StyledStack spacing={2} alignItems="center" justifyContent="center">
            <ContactIcon
              title={title}
              href={href}
              iconName={iconName}
              iconColor={iconColor}
            />
            <ContentWrapper>
              <ContactInfo title={title} description={description} />
            </ContentWrapper>
          </StyledStack>
        </StyledPaper>
      </CardContainer>
    );
  }
);

ContactCard.displayName = "ContactCard";

export default ContactCard;
