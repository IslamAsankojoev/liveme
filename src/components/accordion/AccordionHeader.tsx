import { FC, ReactNode } from "react";
import { BoxProps, styled, SxProps } from "@mui/material";
import { ChevronRight } from "@mui/icons-material";
import { FlexBox } from "components/flex-box";

// styled components
const StyledFlexBox = styled<FC<AccordionHeaderProps>>(
  ({ children, open, ...rest }) => <FlexBox {...rest}>{children}</FlexBox>
)<AccordionHeaderProps>(({ open, theme }) => ({
  alignItems: "center",
  justifyContent: "space-between",
  ".caretIcon": {
    transition: "transform 250ms ease-in-out",
    ...(theme.direction === "rtl"
      ? { transform: `rotate(${open ? "90deg" : "180deg"})` }
      : { transform: `rotate(${open ? "90deg" : "0deg"})` }),
  },
}));

// =================================================================
type AccordionHeaderProps = {
  sx?: SxProps;
  open?: boolean;
  showIcon?: boolean;
  children: ReactNode;
};
// =================================================================

const AccordionHeader: FC<AccordionHeaderProps & BoxProps> = (props) => {
  const { sx, open, children, showIcon, ...others } = props;

  return (
    <StyledFlexBox open={open} sx={sx} {...others}>
      {children}
      {showIcon && <ChevronRight className="caretIcon" fontSize="small" />}
    </StyledFlexBox>
  );
};

//  set default props data
AccordionHeader.defaultProps = {
  px: "1rem",
  py: "0.5rem",
  showIcon: true,
};

export default AccordionHeader;
