import { styled } from "@mui/material";
import {
  Children,
  cloneElement,
  FC,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from "react";

// styled component props type
type StyledWrapperProps = {
  open: boolean;
  parent_height: number;
  header_height: number;
};

// styled component
const Wrapper = styled("div")<StyledWrapperProps>((props) => ({
  cursor: "pointer",
  overflow: "hidden",
  transition: "height 250ms ease-in-out",
  height: props.open ? props.parent_height : props.header_height,
}));

// ==============================================================
type AccordionProps = {
  expanded?: boolean;
  children: ReactElement[] | any;
};
// ==============================================================

const Accordion: FC<AccordionProps> = ({ expanded = false, children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(expanded);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [parentHeight, setParentHeight] = useState(0);

  const toggle = () => setOpen(!open);

  useEffect(() => {
    let parent = ref.current;
    if (parent) {
      setHeaderHeight(parent.children[0].scrollHeight);
      setParentHeight(parent.scrollHeight);
    }
  }, []);

  const modifiedChildren = Children.map(children, (child, ind) => {
    if (ind === 0) return cloneElement(child, { open, onClick: toggle });
    else return child;
  });

  return (
    <Wrapper
      ref={ref}
      open={open}
      header_height={headerHeight}
      parent_height={parentHeight}
    >
      {modifiedChildren}
    </Wrapper>
  );
};

export default Accordion;
