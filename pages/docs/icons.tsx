import { FC } from "react";
import Link from "next/link";
import { Box, Card, Container, Divider, Grid } from "@mui/material";
import Code from "components/Code";
import Icons from "components/icons";
import DuotoneIcons from "components/icons/duotone";
import DocsLayout from "components/layouts/DocsLayout";
import { H1, H3, Paragraph } from "components/Typography";

const IconsDemo = () => {
  const iconList = Object.keys(Icons);
  const duotoneIconList = Object.keys(DuotoneIcons);

  return (
    <DocsLayout>
      <Box bgcolor="grey.300" py={5}>
        <Container>
          <H1>Icons</H1>

          <Paragraph fontSize={16}>
            Bazaar uses Mui Icons and SVG icons, icons are located in{" "}
            <Code>src/components/icons</Code>
          </Paragraph>

          <Box fontWeight={600} component="li" mt={2}>
            <Link
              href="https://mui.com/material-ui/material-icons"
              target="_blank"
            >
              Material Icons
            </Link>
          </Box>

          <Box fontWeight={600} component="li" mt={1}>
            Solid Icons
          </Box>

          <Box fontWeight={600} component="li" mt={1}>
            Duotone Icons
          </Box>
        </Container>
      </Box>

      <Container sx={{ py: 6 }}>
        <H3>Solid Icons</H3>
        <Divider sx={{ mb: 3, mt: 1, borderColor: "grey.400" }} />

        <Grid container spacing={2}>
          {iconList.map((name, i) => {
            const Icon = Icons[name];
            return <IconViewCard Icon={Icon} name={name} key={i} />;
          })}
        </Grid>

        <H3 mt={6}>Duotone Icons</H3>
        <Divider sx={{ mb: 3, mt: 1, borderColor: "grey.400" }} />

        <Grid container spacing={2}>
          {duotoneIconList.map((name, i) => {
            const Icon = DuotoneIcons[name];
            return <IconViewCard Icon={Icon} name={name} key={i} />;
          })}
        </Grid>
      </Container>
    </DocsLayout>
  );
};

// ==============================================================
type IconViewCardProps = { Icon: any; name: string };
// ==============================================================

const IconViewCard: FC<IconViewCardProps> = ({ Icon, name }) => {
  return (
    <Grid item lg={2} md={3} sm={3} xs={4}>
      <Card elevation={3} sx={{ p: 2, display: "grid", placeItems: "center" }}>
        <Icon sx={{ color: "black", fontSize: 24, textAlign: "center" }} />

        <Paragraph mt={1} fontSize={12}>
          {name}
        </Paragraph>
      </Card>
    </Grid>
  );
};

export default IconsDemo;
