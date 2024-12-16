const { Router } = require('express');
const router = Router();
const { getCategory, addCategory, deleteCategory ,updateCategory,getCategoryById,getadminCategory} = require('../controllers/categoryController');
const { upload } = require('../middlewares/multer');

router.get('/adminCategory', getadminCategory); 
router.get('/', getCategory);
router.get('/:id', getCategoryById);
router.post("/",upload.single('image'), addCategory);
router.patch("/",upload.single('image'),updateCategory);
router.delete("/:id", deleteCategory);

module.exports = router;
