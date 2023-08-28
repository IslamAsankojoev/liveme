import { useState } from "react";
import { Box, Container, Grid, Paper, Stack } from "@mui/material";
import Code from "components/Code";
import { H1, H4, Paragraph } from "components/Typography";
import DocsLayout from "components/layouts/DocsLayout";
import DropZone from "components/DropZone";
import MiniCart from "components/MiniCart";
import Topbar from "components/Topbar";
import BazaarCard from "components/BazaarCard";
import BazaarTextField from "components/BazaarTextField";
import BazaarSwitch from "components/BazaarSwitch";

const list = [
  "DropZone",
  "Mini Cart",
  "Topbar",
  "Bazaar Card",
  "Bazaar Text Field & Switch",
];

const ExtraComponents = () => {
  return (
    <DocsLayout>
      <Box bgcolor="grey.300" py={5}>
        <Container>
          <H1>Other Extra Components</H1>

          <Paragraph fontSize={16}>
            Folder Path: <Code>src/components</Code>
          </Paragraph>

          {list.map((item) => (
            <Box fontWeight={600} component="li" mt={1} key={item}>
              {item}
            </Box>
          ))}
        </Container>
      </Box>

      <Container sx={{ py: 6 }}>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
              <DropZone onChange={() => {}} />

              <H4 mt={3} textAlign="center">
                Dropzone
              </H4>
            </Paper>
          </Grid>

          <Grid item lg={4} xs={12}>
            <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
              <MiniCart toggleSidenav={() => {}} />

              <H4 mt={3} textAlign="center">
                Mini Cart
              </H4>
            </Paper>
          </Grid>

          <Grid item lg={8} xs={12}>
            <Stack spacing={4}>
              <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
                <Topbar />

                <H4 mt={3} textAlign="center">
                  Topbar
                </H4>
              </Paper>

              <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
                <BazaarCard hoverEffect sx={{ p: 5 }}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Impedit, maiores.
                </BazaarCard>

                <H4 mt={3} textAlign="center">
                  Bazaar Card
                </H4>
              </Paper>

              <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
                <BazaarTextField fullWidth />

                <Box mb={3} />
                <BazaarSwitch />

                <H4 mt={3} textAlign="center">
                  Bazaar Text Field & Switch
                </H4>
              </Paper>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </DocsLayout>
  );
};

export default ExtraComponents;
