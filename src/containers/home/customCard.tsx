import {
  Paper,
  CardMedia,
  CardContent,
  Box,
  Typography,
  Rating,
} from "@mui/material";
import React from "react";
import vsImage from "../../VS.png";
import { file_loc } from "../fetch/get_file";
import { formatToINR } from "../../utils/formatToINR";
interface ICustomCard {
  actualPrice: number;
  discountedPrice: number;
  description: string;
}
const CustomCard = ({
  actualPrice,
  discountedPrice,
  description,
}: ICustomCard) => {
  return (
    <Paper
      sx={{
        maxWidth: 250,
        minHeight: 300,
        margin: "1rem",
        position: "relative",
        "&:hover": {
          transform: "scale(1.05)",
          transition: "transform 0.3s ease-in-out",
        },
      }}
      elevation={5}
    >
      <CardMedia
        sx={{ height: 175, objectFit: "fill" }}
        image={file_loc}
        title="green iguana"
      />
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center" gap={1}>
            <Typography fontSize="1rem" color="primary">
              {formatToINR(actualPrice)}
            </Typography>
            <Typography
              fontSize="0.8rem"
              color="text.disabled"
              sx={{
                textDecoration: "line-through",
              }}
            >
              {formatToINR(discountedPrice)}
            </Typography>
          </Box>
          <Rating
            sx={{ fontSize: "0.8rem" }}
            defaultValue={2.5}
            precision={0.5}
            readOnly
          />
        </Box>

        <Typography variant="caption" sx={{ color: "GrayText" }}>
          {description}
        </Typography>
      </CardContent>
    </Paper>
  );
};

export default CustomCard;
