import  CreditCard  from '../models/CreditCard';

class CardController {
  async index(req, res) {
    const cards = await CreditCard.findAll();

    return res.json(cards);
  }
}

export default new CardController();
