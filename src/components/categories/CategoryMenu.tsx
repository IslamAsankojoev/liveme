import { Box, styled } from "@mui/material";
import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import CategoryMenuCard from "./CategoryMenuCard";

// styled component
const Wrapper = styled(Box)<{ open: boolean }>(
  ({ open, theme: { direction } }) => ({
    cursor: "pointer",
    position: "relative",
    "& .dropdown-icon": {
      transition: "all 250ms ease-in-out",
      transform: `rotate(${
        open ? (direction === "rtl" ? "-90deg" : "90deg") : "0deg"
      })`,
    },
  })
);

// ===========================================================
type CategoryMenuProps = {
  open?: boolean;
  children: React.ReactElement;
};
// ===========================================================

const CategoryMenu: FC<CategoryMenuProps> = ({
  open: isOpen = false,
  children,
}) => {
  const [open, setOpen] = useState(isOpen);
  const popoverRef = useRef(open);
  popoverRef.current = open;

  const toggleMenu = (e: React.MouseEvent<Document, MouseEvent>) => {
    e.stopPropagation();
    if (!isOpen) setOpen((open) => !open);
  };

  const handleDocumentClick = useCallback(() => {
    if (popoverRef.current && !isOpen) setOpen(false);
  }, [isOpen]);

  useEffect(() => {
    window.addEventListener("click", handleDocumentClick);

    return () => window.removeEventListener("click", handleDocumentClick);
  }, [handleDocumentClick]);

  return (
    <Wrapper open={open}>
      {React.cloneElement(children, {
        open,
        onClick: toggleMenu,
        className: `${children.props.className}`,
      })}

      <CategoryMenuCard open={open} />
    </Wrapper>
  );
};

export default CategoryMenu;
