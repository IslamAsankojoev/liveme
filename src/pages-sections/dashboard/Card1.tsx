import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import { Card } from "@mui/material";
import { FlexBetween, FlexBox } from "components/flex-box";
import { H3, H6, Paragraph } from "components/Typography";
import React, { FC } from "react";

// ========================================================
type Card1Props = {
  color: string;
  title: string;
  amount1: string | number;
  amount2: string | number;
  percentage: string | number;
  status?: "up" | "down";
};
// ========================================================

const Card1: FC<Card1Props> = (props) => {
  const { status, color, title, amount1, amount2, percentage } = props;

  return (
    <Card sx={{ p: 2 }}>
      <H6 mb={1} color="grey.600">
        {title}
      </H6>
      <H3 mb={0.3}>{amount1}</H3>

      <FlexBetween>
        <Paragraph fontWeight={500} color="grey.500">
          {amount2}
        </Paragraph>

        <FlexBox alignItems="center" color={color}>
          {status === "up" && <ArrowDropUp />}
          {status === "down" && <ArrowDropDown />}
          <Paragraph fontSize={12}>{percentage}</Paragraph>
        </FlexBox>
      </FlexBetween>
    </Card>
  );
};

// set default props for status and color
Card1.defaultProps = { status: "up", color: "info.main" };

export default Card1;
