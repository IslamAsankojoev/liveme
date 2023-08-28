import Link from "next/link";
import { GetStaticProps, NextPage } from "next";
import {
  Box,
  Chip,
  IconButton,
  Pagination,
  styled,
  Typography,
} from "@mui/material";
import { East } from "@mui/icons-material";
import { format } from "date-fns";
import TableRow from "components/TableRow";
import { Span } from "components/Typography";
import { FlexBox } from "components/flex-box";
import CustomerService from "components/icons/CustomerService";
import UserDashboardHeader from "components/header/UserDashboardHeader";
import CustomerDashboardLayout from "components/layouts/customer-dashboard";
import CustomerDashboardNavigation from "components/layouts/customer-dashboard/Navigations";
import api from "utils/__api__/ticket";
import Ticket from "models/Ticket.model";

// styled components
const StyledChip = styled(Chip)<{ green?: any }>(({ theme, green }) => ({
  height: 26,
  margin: "6px",
  padding: " 0 0.25rem",
  color: green ? theme.palette.success.main : theme.palette.primary.main,
  backgroundColor: green
    ? theme.palette.success[100]
    : theme.palette.primary.light,
}));

// =============================================
type TicketListProps = { ticketList: Ticket[] };
// =============================================

const TicketList: NextPage<TicketListProps> = ({ ticketList }) => {
  return (
    <CustomerDashboardLayout>
      {/* TITLE HEADER AREA */}
      <UserDashboardHeader
        title="Support Ticket"
        icon={CustomerService}
        navigation={<CustomerDashboardNavigation />}
      />

      {/* SUPPORT TICKET LIST AREA */}
      {ticketList.map((item) => (
        <Link href={`/support-tickets/${item.slug}`} key={item.id}>
          <TableRow sx={{ my: "1rem", p: "15px 24px" }}>
            <Box>
              <span>{item.title}</span>
              <FlexBox alignItems="center" flexWrap="wrap" pt={1} m={-0.75}>
                <StyledChip label={item.type} size="small" />
                <StyledChip label={item.status} size="small" green={1} />

                <Span className="pre" m={0.75} color="grey.600">
                  {format(new Date(item.date), "MMM dd, yyyy")}
                </Span>

                <Span m={0.75} color="grey.600">
                  {item.category}
                </Span>
              </FlexBox>
            </Box>

            <Typography
              flex="0 0 0 !important"
              textAlign="center"
              color="grey.600"
            >
              <IconButton>
                <East
                  fontSize="small"
                  color="inherit"
                  sx={{
                    transform: ({ direction }) =>
                      `rotate(${direction === "rtl" ? "180deg" : "0deg"})`,
                  }}
                />
              </IconButton>
            </Typography>
          </TableRow>
        </Link>
      ))}

      {/* PAGINATION AREA */}
      <FlexBox justifyContent="center" mt={5}>
        <Pagination
          count={5}
          color="primary"
          variant="outlined"
          onChange={(data) => console.log(data)}
        />
      </FlexBox>
    </CustomerDashboardLayout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const ticketList = await api.getTicketList();
  return { props: { ticketList } };
};

export default TicketList;
