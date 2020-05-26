import  Stock  from '../models/Stock';

class StockController {
  async show(req, res) {
    const { id } = req.params;

    const stock = await Stock.find(id);

		return res.json(stock);
  }
}

export default new StockController();
