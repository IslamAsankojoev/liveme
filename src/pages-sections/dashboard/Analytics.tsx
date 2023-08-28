import { FC, useState } from "react";
import dynamic from "next/dynamic";
import { KeyboardArrowDown } from "@mui/icons-material";
import { styled, useTheme } from "@mui/material";
import Card from "@mui/material/Card";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import ApexChart from "components/ApexChart";
import { H5 } from "components/Typography";
import { FlexBetween } from "components/flex-box";
import { analyticsChartOptions } from "./chartsOptions";

const categories = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// styled component
const StyledSelect = styled(Select)(({ theme }) => ({
  fontSize: 14,
  fontWeight: 500,
  color: theme.palette.grey[600],
  "& fieldset": { border: "0 !important" },
  "& .MuiSelect-select": { padding: 0, paddingRight: "8px !important" },
}));

const Analytics: FC = () => {
  const theme = useTheme();
  const [selectType, setSelectType] = useState("yearly");

  const series = [
    {
      name: "Sales",
      data: [
        15000, 45000, 12000, 50000, 75000, 13000, 30000, 99000, 75000, 90000,
        55000, 15000,
      ],
    },
    {
      name: "Expense",
      data: [
        1500, 48000, 19000, 59000, 25000, 9000, 36000, 9000, 79000, 70000,
        57000, 5000,
      ],
    },
  ];

  return (
    <Card sx={{ p: 3 }}>
      <FlexBetween>
        <H5>Analytics</H5>

        <StyledSelect
          value={selectType}
          IconComponent={() => <KeyboardArrowDown />}
          onChange={(e: SelectChangeEvent<string>) =>
            setSelectType(e.target.value)
          }
        >
          <MenuItem value="yearly">Yearly</MenuItem>
          <MenuItem value="monthly">Monthly</MenuItem>
          <MenuItem value="Weekily">Weekily</MenuItem>
        </StyledSelect>
      </FlexBetween>

      <ApexChart
        type="bar"
        height={300}
        series={series}
        options={analyticsChartOptions(theme, categories)}
      />
    </Card>
  );
};

export default Analytics;
