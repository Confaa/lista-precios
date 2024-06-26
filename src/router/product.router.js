import {
  addFile,
  updatePricePerItem,
  updateProduct,
} from '../controller/product.controller.js';
import RouterBase from './index.js';
import { uploadFile } from '../middlewares/uploadFile.middleware.js';
import { convertToBody } from '../middlewares/convertToBody.middleware.js';

export default class ProductRouter extends RouterBase {
  init() {
    this.post('/', ['MANAGER'], uploadFile, convertToBody, addFile);
    this.put('/', ['MANAGER'], updatePricePerItem);
    this.put('/:pid', ['MANAGER'], updateProduct);
  }
}
