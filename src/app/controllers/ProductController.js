import  Product  from '../models/Product';

class ProductController {
  async index(req, res) {
    const products = await Product.findAll();

    return res.json(products);
  }

  async show(req, res) {
    const { id } = req.params;

    const product = await Product.find(id);

    return res.json(product);
  }
}

export default new ProductController();
