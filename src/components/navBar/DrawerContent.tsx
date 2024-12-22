import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";

interface NavItem {
  text: string;
  href: string;
}

const NAV_ITEMS: readonly NavItem[] = [
  { text: "Home", href: "/" },
  { text: "About", href: "/about" },
  { text: "Contact", href: "/contact" },
] as const;
export const DrawerContent: React.FC<{ onClose: () => void }> = ({
  onClose,
}) => (
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
