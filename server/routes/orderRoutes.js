const { Router } = require('express');
const router = Router();
const authorization = require("../middlewares/authorization");
const { getOrders, getUserOrders, createOrder, updateOrder,getOrderById,getReviewOrders } = require('../controllers/orderController');

router.get('/', authorization, getOrders);
router.get('/getuserorders', authorization, getUserOrders);
router.post('/', authorization, createOrder);
router.patch('/',authorization, updateOrder);
router.get('/getorderbyid/:orderId', authorization, getOrderById);
router.get('/user/:userId/product/:productId', getReviewOrders);

module.exports = router;
