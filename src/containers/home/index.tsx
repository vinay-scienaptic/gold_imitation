import { Grid, Pagination, Box } from "@mui/material";
import CustomCard from "./customCard";
import { useState } from "react";

interface JewelryItem {
  id: string;
  actualPrice: number;
  discountedPrice: number;
  description: string;
}

const jewelryData: JewelryItem[] = [
  {
    id: "1",
    actualPrice: 27800,
    discountedPrice: 24999,
    description: "Bamine Platinum Diamond Pendant With Chain",
  },
  // ... existing items ...
  // Adding more items to demonstrate pagination
  {
    id: "6",
    actualPrice: 35900,
    discountedPrice: 31999,
    description: "Ruby Pendant Set",
  },
  {
    id: "7",
    actualPrice: 42000,
    discountedPrice: 38999,
    description: "Emerald Studded Necklace",
  },
  {
    id: "8",
    actualPrice: 29500,
    discountedPrice: 26999,
    description: "Diamond Tennis Bracelet",
  },
  {
    id: "9",
    actualPrice: 30000,
    discountedPrice: 4000,
    description: "Diamond Tennis Bracelet",
  },

  // Add more items as needed
];

const gridBreakpoints = {
  xs: 12,
  sm: 6,
  md: 3,
};

const HomePage = () => {
  const [page, setPage] = useState(1);
  const itemsPerPage = 3; // Number of items to show per page

  // Calculate total pages
  const totalPages = Math.ceil(jewelryData.length / itemsPerPage);

  // Get current page items
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = jewelryData.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
    // Optionally scroll to top when page changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Grid container spacing={2}>
        {currentItems.map((item) => (
          <Grid key={item.id} item {...gridBreakpoints}>
            <CustomCard
              actualPrice={item.actualPrice}
              discountedPrice={item.discountedPrice}
              description={item.description}
            />
          </Grid>
        ))}
      </Grid>

      {/* Pagination component */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          padding: "20px",
          marginTop: "20px",
        }}
      >
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
          size="large"
          showFirstButton
          showLastButton
        />
      </Box>
    </Box>
  );
};

export default HomePage;
