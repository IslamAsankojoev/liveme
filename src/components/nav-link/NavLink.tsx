import { AnchorHTMLAttributes, CSSProperties, FC } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { styled } from "@mui/material";
import clsx from "clsx";

// component props interface
export interface NavLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  style?: CSSProperties;
  className?: string;
}
// styled component
const StyledLink = styled(Link)<{ active: number }>(({ theme, active }) => ({
  position: "relative",
  transition: "color 150ms ease-in-out",
  fontSize: "1rem",
  color: active ? theme.palette.primary.main : "inherit",
  "&:hover": { color: `${theme.palette.primary.main} !important` },
}));

const NavLink: FC<NavLinkProps> = ({
  href,
  children,
  style,
  className,
  ...props
}) => {
  const { pathname } = useRouter();

  const checkRouteMatch = () => {
    if (href === "/") return pathname === href;
    return pathname.includes(href);
  };

  // active route
  const currentRoute = checkRouteMatch();

  return (
    <StyledLink
      href={href}
      style={style}
      className={clsx(className)}
      active={currentRoute ? 1 : 0}
      {...props}
    >
      {children}
    </StyledLink>
  );
};

export default NavLink;
