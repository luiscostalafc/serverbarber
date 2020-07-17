import multer from 'multer';
import FileController from '../app/controllers/FileController';
import multerConfig from '../config/multer';

const upload = multer(multerConfig);
const router = require('express').Router();

// router.get('/files', FileController.index);
router.post('/files', upload.single('file'), FileController.store);
router.get('/files/:id', FileController.show);
router.put('/files', FileController.update);
router.delete('/files/:id', FileController.delete);

module.exports = router;
