import { FC } from "react";
import Link from "next/link";
import { Small } from "components/Typography";

// ==============================================================
type NavLinkProps = {
  url: string;
  title: string;
  color?: string;
  borderColor?: string;
};
// ==============================================================

const NavLink2: FC<NavLinkProps> = ({
  url,
  color,
  title = "SHOP NOW",
  borderColor = "primary.600",
}) => {
  return (
    <Link href={url}>
      <Small
        fontWeight="700"
        borderBottom={2}
        color={color}
        borderColor={borderColor}
      >
        {title}
      </Small>
    </Link>
  );
};

export default NavLink2;
