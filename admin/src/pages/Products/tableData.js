/* eslint-disable react/prop-types */
import { useState } from "react";
import Box from "components/Box";
import Typography from "components/Typography";
import Avatar from "components/Avatar";
import Badge from "components/Badge";
import toast from 'react-hot-toast';
import Table from "examples/Tables/Table";
import { useGetProducts } from "queries/ProductQuery";
import { Link } from "react-router-dom";
import { Icon,TextField, Button, TablePagination,Pagination  } from "@mui/material";

function Author({ image, name, desc,price,stock,id }) {
  const truncateText = (text, wordLimit) => {
    const words = text.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return text;
  };
  return (

    <Box display="flex" alignItems="center" px={1} py={0.5}>
      <Link to={`/products/editProduct/${id}`} >
      <Box mr={2}>
        <Avatar src={image} alt={name} size="sm" variant="rounded" />
      </Box>
      </Link>
     
      <Box display="flex" flexDirection="column">
      <Link  to={`/products/editProduct/${id}`}  >
      <Typography variant="button" fontWeight="medium">
          {name}
        </Typography>
      </Link>
      
       
        <Typography variant="button" fontWeight="medium">
        price:  {price}
        </Typography>
        <Typography variant="button" fontWeight="medium">
         stock: {stock}
        </Typography>
        <Typography variant="caption" color="secondary" x={{ whiteSpace: 'pre-line' }}>
        desc: {truncateText(desc, 20)}
        </Typography>
      </Box>
    </Box>
  );
}

const TableData = () => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [sortBy, setSortBy] = useState('createdAt');
  const [order, setOrder] = useState('desc');
  const [search, setSearch] = useState('');

  const { data, isLoading } = useGetProducts({ page, perPage, sortBy, order, search });
  const handlePageChange = (event, value) => {
    setPage(value);
  };
  const columns = [
    { name: "product", align: "left" },
    // { name: "price", align: "center" },
    // { name: "stock", align: "center" },
    // { name: "sale_rate", align: "center" },
    // { name: "discount", align: "center" },
    { name: "status", align: "center" },
    // { name: "createdon", align: "center" },
    // { name: "Lastupdated", align: "center" },
    { name: "action", align: "center" },
  ]

  const rows = data?.docs?.map(item => ({
    product: <Author image={`${process.env.REACT_APP_API_URL}/uploads/${item?.image?.[0]}`} name={item?.name} desc={item?.subheading}
    price={item?.price} stock={item?.stock } id={item?._id} />,
    status: (
      <Badge variant="gradient" badgeContent={item?.isAvailable ? 'Available' : 'Unavailable'} color={item?.isAvailable ? "success" : 'secondary'} size="xs" container />
    ),
    // price: (
    //   <Typography variant="caption" color="secondary" fontWeight="medium">
    //     {item?.price}
    //   </Typography>
    // ),
    // stock: (
    //   <Typography variant="caption" color="secondary" fontWeight="medium">
    //     {item?.stock}
    //   </Typography>
    // ),
    // sale_rate: (
    //   <Typography variant="caption" color="secondary" fontWeight="medium">
    //     {item?.sale_rate}
    //   </Typography>
    // ),
    // discount: (
    //   <Typography variant="caption" color="secondary" fontWeight="medium">
    //     {item?.discount}
    //   </Typography>
    // ),
   
    // createdon: (
    //   <Typography variant="caption" color="secondary" fontWeight="medium">
    //     {new Date(item?.createdAt).toDateString()}
    //   </Typography>
    // ),
    // Lastupdated: (
    //   <Typography variant="caption" color="secondary" fontWeight="medium">
    //     {new Date(item?.updatedAt).toDateString()}
    //   </Typography>
    // ),
    action: (
      <Link to={`/products/editProduct/${item?._id}`}>
        <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small">
          more_vert
        </Icon>
      </Link>
    ),
  }))
  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="space-between" py={2}>
        <TextField
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          variant="outlined"
          size="small"
          style={{marginLeft:'5px'}}
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
      
      {/* <TablePagination
        component="div"
        count={data?.totalDocs || 0}
        page={page - 1}
        onPageChange={(event, newPage) => setPage(newPage + 1)}
        rowsPerPage={perPage}
        onRowsPerPageChange={(event) => setPerPage(parseInt(event.target.value, 10))}
      /> */}
      <Box style={{display:'flex',justifyContent:'center', Margin:'10px'}}>
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
