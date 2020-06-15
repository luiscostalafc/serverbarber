import * as Yup from 'yup';
import Service from '../models/Service';
import CRUD from '../repository/crud';

class ServiceController {
	async index(req, res) {
		const categories = await CRUD.findAll(Service);
		return res.json(categories);
	}

	async store(req, res) {
		const schema = Yup.object().shape({
			name: Yup.string().required(),
		});

		schema.validate(req.body, { abortEarly: false }).catch(err => {
			return res
				.status(422)
				.set({ error: err.errors.join(', ') })
				.json({});
		});

		const ServiceExists = await CRUD.findOne(Service, {
			where: { name: req.body.name },
		});
		if (ServiceExists) {
			return res
				.status(400)
				.set({ error: 'Service already exists' })
				.json({});
		}

		const categories = await CRUD.create(Service, req.body);
		return res.json(categories);
	}

	async show(req, res) {
		const service = await CRUD.findByPk(Service, req.id);
		return res.json(service);
	}

	async update(req, res) {
		const schema = Yup.object().shape({
			name: Yup.string().required(),
		});

		schema.validate(req.body, { abortEarly: false }).catch(err => {
			return res
				.status(422)
				.set({ error: err.errors.join(', ') })
				.json({});
		});

		const ServiceExists = await CRUD.findOne(Service, {
			where: { name: req.body.name },
		});
		if (ServiceExists) {
			return res
				.status(400)
				.set({ error: 'Service already exists' })
				.json({});
		}

		const service = await CRUD.findByIdAndUpdate(
			Service,
			req.params.id,
			{ read: true },
			{ new: true }
		);
		return res.json(service);
	}

	async delete(req, res) {
		const service = await CRUD.findByPk(Service, req.id);
		await Service.destroy();
		return res.json(service);
	}
}

export default new ServiceController();
