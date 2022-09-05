import PrimarySearchAppBar from "../../components/navbar/index.js";
import Hero from "../../components/Hero/index.js";
import RecentlySeen from "../../components/RecentlySeen/index.js";
import Cards from "../../components/Cards/index";
import { Typography } from "@mui/material";
import TopSellers from "../../components/TopSellers/index.js";
import { Container } from "@mui/system";

export default function Landing() {
  return (
    <>
      <Container maxWidth="xl">
        <PrimarySearchAppBar></PrimarySearchAppBar>
        <Hero></Hero>
        <RecentlySeen></RecentlySeen>
        <Typography variant="h5" fontWeight="600" gutterBottom>
          Interested in Latin dances??
        </Typography>
        <Cards />
      </Container>

      <TopSellers></TopSellers>
      <Container maxWidth="xl">
        <Typography variant="h5" fontWeight="600" gutterBottom>
          Interested in Latin dances??
        </Typography>
        <Cards />
      </Container>
    </>
  );
}
