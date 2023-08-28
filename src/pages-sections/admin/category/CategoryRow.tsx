import { FC, useState } from "react";
import { Avatar } from "@mui/material";
import { Delete, Edit, RemoveRedEye } from "@mui/icons-material";
import BazaarSwitch from "components/BazaarSwitch";
import {
  StyledTableRow,
  CategoryWrapper,
  StyledIconButton,
  StyledTableCell,
} from "../StyledComponents";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { CategoryService } from "api/category.service";

// ========================================================================
type CategoryRowProps = {
  item: any;
  selected: any[];
  refetch: any;
};
// ========================================================================

const CategoryRow: FC<CategoryRowProps> = ({ item, selected, refetch }) => {
  const { image, name, featured, id, slug } = item;

  const router = useRouter();
  const [featuredCategory, setFeaturedCategory] = useState(featured);
  const isItemSelected = selected.indexOf(name) !== -1;

  const {mutate} = useMutation('delete category', (id: number)=> CategoryService.delete(id), {
    onSuccess: () => {
      refetch();
    }
  })

  const handleRemove = () => {
    mutate(id);
  };

  const handleNavigate = () => router.push(`/admin/categories/${slug}`);

  return (
    <StyledTableRow tabIndex={-1} role="checkbox" selected={isItemSelected}>
      <StyledTableCell align="left">#{id}</StyledTableCell>

      <StyledTableCell align="left">
        <CategoryWrapper>{name}</CategoryWrapper>
      </StyledTableCell>

      <StyledTableCell align="left">
        <Avatar src={image} sx={{ borderRadius: "8px" }} />
      </StyledTableCell>

      <StyledTableCell align="left">
        <BazaarSwitch
          color="info"
          checked={featuredCategory}
          onChange={() => setFeaturedCategory((state: boolean) => !state)}
        />
      </StyledTableCell>

      <StyledTableCell align="center">
        {/* <StyledIconButton onClick={handleNavigate}>
          <Edit />
        </StyledIconButton> */}

        {/* <StyledIconButton onClick={handleNavigate}>
          <RemoveRedEye />
        </StyledIconButton> */}

        <StyledIconButton onClick={handleRemove}>
          <Delete />
        </StyledIconButton>
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default CategoryRow;
