import * as Yup from 'yup';
import { literal, where } from 'sequelize';
import Point from '../models/Point';
import User from '../models/User';
import CRUD from '../repository/crud';

class PointController {
	async index(req, res) {
		const reg = await CRUD.findAll(Point);
		return res.json(reg);
	}

	async haversine(req, res) {
		const schema = Yup.object().shape({
			latitude: Yup.number().required(),
			longitude: Yup.number().required(),
		});

		schema.validate(req.body, { abortEarly: false }).catch(err => {
			return res
				.status(422)
				.set({ error: err.errors.join(', ') })
				.json({});
		});

		const { latitude, longitude } = req.body;

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

	async store(req, res) {
		const schema = Yup.object().shape({
			name: Yup.string().required(),
			latitude: Yup.number().required(),
			longitude: Yup.number().required(),
			user_id: Yup.number().required(),
		});

		schema.validate(req.body, { abortEarly: false }).catch(err => {
			return res
				.status(422)
				.set({ error: err.errors.join(', ') })
				.json({});
		});

		const point = await CRUD.create(Point, req.body);

		return res.json(point);
	}

	async show(req, res) {
		const reg = await CRUD.findByPk(Point, req.params.id, {
			include: [
				{
					model: User,
					as: 'user',
					attributes: ['id', 'name', 'provider', 'email', 'gender', 'is_admin'],
				},
			],
		});
		return res.json(reg);
	}

	async update(req, res) {
		const schema = Yup.object().shape({
			name: Yup.string().required(),
			latitude: Yup.number().required(),
			longitude: Yup.number().required(),
			user_id: Yup.number().required(),
		});

		schema.validate(req.body, { abortEarly: false }).catch(err => {
			return res
				.status(422)
				.set({ error: err.errors.join(', ') })
				.json({});
		});

		const point = await CRUD.findByIdAndUpdate(Point, req.params.id, req.body);
		return res.json(point);
	}

	async delete(req, res) {
		const reg = await CRUD.findByIdAndDestroy(Point, req.params.id);
		return res.json(reg);
	}
}

export default new PointController();
