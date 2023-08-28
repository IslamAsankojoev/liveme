import { Box } from "@mui/material";
import { FC, PropsWithChildren } from "react";

const Code: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Box
      component="code"
      sx={{ backgroundColor: "grey.400", px: 1, py: 0.2, borderRadius: 1 }}
    >
      {children}
    </Box>
  );
};

export default Code;
