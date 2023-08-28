import { FC } from "react";
import dynamic from "next/dynamic";
import { Props } from "react-apexcharts";

// apex chart instance
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const ApexChart: FC<Props> = (props) => <ReactApexChart {...props} />;

export default ApexChart;
