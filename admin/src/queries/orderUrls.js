import request from "utils/request";

const getOrders = async (data) => request(`/orders?page=${data?.pageNo}&perpageitems=${data?.pageCount}`, 'GET', data)
const getBulkOrders = async (data) => request(`/orders/bulkorder?page=${data?.pageNo}&perpageitems=${data?.pageCount}`, 'GET', data)
const getOrderById = async (data) => request(`/orders/${data?.id}`, 'GET', data)

export {
  getOrders,
  getOrderById,
  getBulkOrders
};
