import { Box, Container, Grid, Paper } from "@mui/material";
import Code from "components/Code";
import { H1, Paragraph } from "components/Typography";
import DocsLayout from "components/layouts/DocsLayout";
import Grocery2SideNav from "components/page-sidenav/Grocery2Sidenav";
import HealthBeautySidenav from "components/page-sidenav/HealthBeautySideNav";
import SideNavbar from "components/page-sidenav/SideNavbar";

const categoryNavigation = [
  { icon: "Carrot", title: "Vegetables", href: "#" },
  {
    icon: "Apple",
    title: "Fruits & Vegetables",
    href: "/product/search/Fruits & Vegetables",
    child: [
      {
        title: "Fresh Frutes",
        href: "/product/search/Fresh Frutes",
        child: [
          { title: "Pears, apples, quinces", href: "#" },
          { title: "Peaches, plums, apricots", href: "#" },
        ],
      },
      {
        title: "Fresh Vegetables",
        href: "/product/search/Fresh Vegetables",
        child: [
          { title: "Onion", href: "#" },
          { title: "Potato", href: "#" },
        ],
      },
    ],
  },
  { icon: "Milk", title: "Dairy & Eggs", href: "/product/search/Dairy & Eggs" },
  { icon: "Breakfast", title: "Breakfast", href: "/product/search/Breakfast" },
  { icon: "Yogurt", title: "Frozen", href: "/product/search/Frozen" },
];

const categoryNavigation2 = [
  {
    category: "Top Categories",
    categoryItem: [
      { icon: "Home", title: "Home", href: "#" },
      { icon: "Popular", title: "Popular Products", href: "#" },
    ],
  },
  {
    category: "Top Categories",
    categoryItem: [
      {
        icon: "Chair",
        title: "Chair",
        href: "#",
        child: [
          { title: "Grapes", href: "#" },
          { title: "Pears, apples, quinces", href: "#" },
          { title: "Peaches, plums, apricots", href: "#" },
        ],
      },
      {
        icon: "Decoration",
        title: "Decors",
        href: "#",
        child: [
          { title: "Onion", href: "#" },
          { title: "Potato", href: "#" },
        ],
      },
      { icon: "RoundTable", title: "Coffee Tea Table", href: "#" },
      { icon: "RoomSet", title: "Living Room Sets", href: "#" },
    ],
  },
];

const PageSideNav = () => {
  return (
    <DocsLayout>
      <Box bgcolor="grey.300" py={5}>
        <Container>
          <H1>Page Sidebar Navigation</H1>

          <Paragraph fontSize={16}>
            Folder Path: <Code>src/components/page-sidenav</Code>
          </Paragraph>
        </Container>
      </Box>

      <Container sx={{ py: 6 }}>
        <Grid container spacing={5}>
          <Grid item lg={4} md={6} xs={12}>
            <Paper elevation={1} sx={{ borderRadius: 2, p: 3 }}>
              <SideNavbar
                lineStyle="dash"
                sidebarHeight="100%"
                sidebarStyle="style2"
                navList={categoryNavigation2}
              />
            </Paper>
          </Grid>

          <Grid item lg={4} md={6} xs={12}>
            <Paper elevation={1} sx={{ borderRadius: 2, p: 3 }}>
              <SideNavbar navList={categoryNavigation2} />
            </Paper>
          </Grid>

          <Grid item lg={4} md={6} xs={12}>
            <Paper elevation={1} sx={{ borderRadius: 2, p: 3 }}>
              <HealthBeautySidenav navList={categoryNavigation} />
            </Paper>
          </Grid>

          <Grid item lg={4} md={6} xs={12}>
            <Paper elevation={1} sx={{ borderRadius: 2, p: 3 }}>
              <Grocery2SideNav groceryNavigation={categoryNavigation} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </DocsLayout>
  );
};

export default PageSideNav;
