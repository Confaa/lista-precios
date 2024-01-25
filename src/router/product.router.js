import { addFile } from "../controller/product.controller.js";
import RouterBase from "./index.js";
import { uploadFile } from "../middlewares/uploadFile.middleware.js";
import { convertToBody } from "../middlewares/convertToBody.middleware.js";

export default class ProductRouter extends RouterBase {
  init() {
    this.post("/", ["USER"], uploadFile, convertToBody, addFile);
  }
}
