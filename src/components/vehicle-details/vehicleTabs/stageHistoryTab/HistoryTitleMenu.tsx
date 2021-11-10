// react
import { useState } from "react";
// material-ui
import IconButton from '@mui/material/IconButton';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
// THIS PROJECT
// components
import { FlexCenter } from '../../../common/flex';
import { ContentTitle } from '../../../common/cardContent';
// types
import { ListOrder, Set } from "../../../../types/misc";

interface HistoryTitleMenuProps {
  order: ListOrder;
  setOrder: Set<ListOrder>;
};
export default function HistoryTitleMenu(props: HistoryTitleMenuProps): React.ReactElement {
  const { order, setOrder } = props;

  const [orderAnchor, setOrderAnchor] = useState<null | HTMLElement>(null);

  const handleOrderClick = (e: React.MouseEvent<HTMLElement>) => {
    setOrderAnchor(e.currentTarget);
  };

  const handleOrderClose = (order: ListOrder) => {
    setOrderAnchor(null);
    setOrder(order);
  };

  return (
    <FlexCenter>
      <ContentTitle variant='h6'>Stage History:</ContentTitle>
      <IconButton
        aria-controls="order-menu"
        aria-haspopup="true"
        onClick={handleOrderClick}
        size="large">
        {order === 'asc' ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
      </IconButton>
      <Menu
        id="order-menu"
        anchorEl={orderAnchor}
        keepMounted
        open={Boolean(orderAnchor)}
        onClose={() => handleOrderClose(order)}
      >
        <MenuItem onClick={() => { handleOrderClose('desc'); }}>Oldest First</MenuItem>
        <MenuItem onClick={() => { handleOrderClose('asc'); }}>Newest First</MenuItem>
      </Menu>
    </FlexCenter>
  );
}