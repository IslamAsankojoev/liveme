import { FC, PropsWithChildren } from "react";
import { Box } from "@mui/material";
import Header from "pages-sections/landing/Header";

const DocsLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Box>
      <Header />

      {children}
    </Box>
  );
};

export default DocsLayout;
