import { useState } from "react";
import { NextPage } from "next";
import Box from "@mui/material/Box";
import Setting from "components/Setting";
import Footer from "pages-sections/landing/Footer";
import Section1 from "pages-sections/landing/Section1";
import Section2 from "pages-sections/landing/Section2";
import Section3 from "pages-sections/landing/Section3";
import Section4 from "pages-sections/landing/Section4";
import Section6 from "pages-sections/landing/Section6";
import Section5 from "pages-sections/landing/Section5";

const IndexPage: NextPage = () => {
  const [filterDemo, setFilterDemo] = useState("");

  return (
    <Box id="top" overflow="hidden" bgcolor="background.paper">
      <Section1 />
      <Section6 setFilterDemo={setFilterDemo} />
      <Section2 />
      <Section5 />
      <Section3 filterDemo={filterDemo} setFilterDemo={setFilterDemo} />
      <Section4 />
      <Footer />
      <Setting />
    </Box>
  );
};

export default IndexPage;
