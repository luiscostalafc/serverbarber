import { literal, where } from 'sequelize';
import Point from '../models/Point';
import CRUD from '../repository/crud';

class PointController {
	async store(req, res) {
		const point = await Point.create(req.body);

		return res.json(point);
	}

	async index(req, res) {
		const { latitude, longitude } = req.query;

		const haversine = `(6371 * acos(cos(radians(${latitude}))
    * cos(radians(latitude))
    * cos(radians(longitude)
    - radians(${longitude}))
    + sin(radians(${latitude}))
    * sin(radians(latitude))))`;

		const points = await CRUD.findAll(Point, {
			where: where(literal(haversine), '<=', 10),
		});

		return res.json(points);
	}
}

export default new PointController();
