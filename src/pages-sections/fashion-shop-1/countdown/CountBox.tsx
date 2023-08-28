import { H3, Span } from "components/Typography";
import React, { FC } from "react";

// component props interface
interface CountBoxProps {
  digit: number;
  title: string;
}

const CountBox: FC<CountBoxProps> = ({ digit, title }) => {
  return (
    <H3>
      {digit}{" "}
      <Span color="grey.600" fontSize="14px" fontWeight="600">
        {title}
      </Span>
    </H3>
  );
};

export default CountBox;

CountBox.defaultProps = {
  digit: 365,
  title: "DAYS",
};
