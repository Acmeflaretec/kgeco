/* eslint-disable react/prop-types */
import { useState } from 'react';
import Box from 'components/Box';
import { useNavigate } from 'react-router-dom';

import Typography from 'components/Typography';
import Table from 'examples/Tables/Table';
import { Avatar, Select, MenuItem, Icon, TextField, Button, Pagination } from '@mui/material';
import Badge from 'components/Badge';
import { Link } from 'react-router-dom';
import { useGetOrders, useUpdateOrderStatus } from 'queries/OrderQuery';

// function Blogs({ key, image, name, category, qty, totalPrice }) {
//   console.log("pass value ", key, image, name, category, qty, totalPrice);
//   return (
//     <Box display="flex" key={key} alignItems="center" px={1} py={0.5}>
//       <Box mr={2}>
//         <Avatar src={image} alt={name} size="sm" variant="rounded" />
//       </Box>
//       <Box display="flex" flexDirection="column">
//         <Typography variant="button" fontWeight="medium">
//           {name}
//         </Typography>
//         <Typography variant="caption" color="secondary">
//           {category}
//         </Typography>
//         <Typography variant="caption" color="secondary">
//           Quantity: {qty}
//         </Typography>
//         <Typography variant="caption" color="secondary">
//           Total Price: ${totalPrice}
//         </Typography>
//       </Box>
//     </Box>
//   );
// }

const TableData = () => {
  const navigate = useNavigate()
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [sortBy, setSortBy] = useState('createdAt');
  const [order, setOrder] = useState('desc');
  const [search, setSearch] = useState('');

  const { data, isLoading } = useGetOrders({ page, perPage, sortBy, order, search })
  const { mutate: updateOrderStatus, isLoading: deleting } = useUpdateOrderStatus();

  const handleStatusChange = (orderId, newStatus) => {
    updateOrderStatus({ orderId, newStatus });
  };
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const columns = [
    { name: 'User', align: 'left' },
    // { name: 'PaymentMode', align: 'center' },
    // { name: 'Amount', align: 'center' },
    // { name: 'orderPerson', align: 'center' },
    // { name: 'Address', align: 'center' },
    // { name: 'Products', align: 'center' },
    // { name: 'Ordered', align: 'center' },
    { name: 'Status', align: 'center' },
    { name: 'Action', align: 'center' },
  ];

  const rows = data?.data?.map(item => ({
    User: (
      <>
        <Typography variant="caption" color="secondary" fontWeight="medium">
          <Link to={`/orders/editOrder/${item?._id}`} state={{ item }}>
            <span style={{ color: 'grey' }} >  {item?.userId?.username} </span>  <br />
            {item?.userId?.email}
          </Link>

        </Typography> <br />

        <Typography variant="caption" color="secondary" fontWeight="medium">
          {item._id}
        </Typography>
      </>

    ),
    // PaymentMode: (
    //   <Typography variant="caption" color="secondary" fontWeight="medium">
    //     {item?.payment_mode}
    //   </Typography>
    // ),
    // Amount: (
    //   <Typography variant="caption" color="secondary" fontWeight="medium">
    //     ₹{item?.amount}
    //   </Typography>
    // ),
    // orderPerson: (
    //   <Typography variant="caption" color="secondary" fontWeight="medium">
    //     {item?.address?.firstname} {item?.address?.lastname}
    //   </Typography>
    // ),
    //     Address: (
    //       <Typography
    //   variant="caption"
    //   color="secondary"
    //   fontWeight="medium"
    //   sx={{ textAlign: 'left', display: 'block' }}
    // >
    //   {item?.address?.address_line_1},<br />
    //   {item?.address?.address_line_2},<br />
    //   {item?.address?.city},<br />
    //   {item?.address?.state}, {item?.address?.zip},<br />
    //   {item?.address?.mobile}
    // </Typography>

    //     ),

    Status: (
      <Select
        value={item?.status}
        onChange={(e) => handleStatusChange(item._id, e.target.value)}
      >
        {['Pending', 'Placed', 'Shipped', 'Out for delivery', 'Delivered', 'Delayed', 'Canceled'].map(status => (
          <MenuItem key={status} value={status}>
            {status}
          </MenuItem>
        ))}
      </Select>
    ),
    // Ordered: (
    //   <Typography variant="caption" color="secondary" fontWeight="medium">
    //     {new Date(item?.createdAt).toDateString()}
    //   </Typography>
    // ),
    Action: (
      // <Link to={`/orders/editOrder/${item?._id}`}>
      <Link to={`/orders/editOrder/${item?._id}`} state={{ item }}>
        <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small">
          more_vert
        </Icon>
      </Link>
    ),
  }));

  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="space-between" py={2}>
        <TextField
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          variant="outlined"
          size="small"
          style={{ marginLeft: '5px' }}
        />
        <Box>
          <Button onClick={() => setOrder(order === 'asc' ? 'desc' : 'asc')}>
            Sort by {sortBy} ({order})
          </Button>
        </Box>
      </Box>
      {isLoading ? (
        <Typography fontSize={14} sx={{ paddingX: 5 }}>loading...</Typography>
      ) : (
        <Table columns={columns} rows={rows} />
      )}
      <Box style={{ display: 'flex', justifyContent: 'center', Margin: '10px' }}>
        <Pagination
          count={Math.ceil((data?.totalDocs || 0) / perPage)}
          page={page}
          onChange={handlePageChange}
        />
      </Box>
    </>
  );
};


  export default TableData;

