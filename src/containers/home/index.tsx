import React from "react";
import CustomCard from "./customCard";

const Home = () => {
  return (
    <CustomCard
      actualPrice={27800}
      discountedPrice={24999}
      description="Bamine Platinum Diamond Pendant With Chain"
    />
  );
};

export default Home;
