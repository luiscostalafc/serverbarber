import * as Yup from 'yup';
import File from '../models/File';
import User from '../models/User';
import CRUD from '../repository/crud';
import SYNC from '../repository/sync';

class FileController {
	async index(req, res) {
		const reg = await CRUD.findAll(File);
		return res.json(reg);
	}

	async store(req, res) {
		const schema = Yup.object().shape({
			name: Yup.string().required(),
			path: Yup.string().required(),
		});

		if (!req.file) {
			return res
				.status(422)
				.set({ error: 'File is required' })
				.json({});
		}

		schema.validate(req.file, { abortEarly: false }).catch(err => {
			return res
				.status(422)
				.set({ error: err.errors.join(', ') })
				.json({});
		});

		const { originalname: name, filename: path } = req.file;

		const file = await CRUD.create(File, {
			name,
			path,
		});

		return res.json(file);
	}

	async show(req, res) {
		const reg = await CRUD.findByPk(File, req.params.id, {
			include: [
				{
					model: User,
					attributes: ['name', 'email'],
				},
			],
		});

		return res.json(reg);
	}

	async update(req, res) {
		const schema = Yup.object().shape({
			name: Yup.string().required(),
			path: Yup.string().required(),
		});

		if (!req.file) {
			return res
				.status(422)
				.set({ error: 'File is required' })
				.json({});
		}

		schema.validate(req.file, { abortEarly: false }).catch(err => {
			return res
				.status(422)
				.set({ error: err.errors.join(', ') })
				.json({});
		});

		const { originalname: name, filename: path } = req.file;

		const file = await CRUD.findByIdAndUpdate(File, req.params.id, {
			name,
			path,
		});

		return res.json(file);
	}

	async delete(req, res) {
		const reg = await CRUD.findByIdAndDestroy(File, req.params.id);
		return res.json(reg);
	}

	async sync(req, res) {
		const { fileId } = req.params;
		const { userId } = req.params;
		const sync = await SYNC.fileAddUser(fileId, userId);
		return res.json(sync);
	}
}

export default new FileController();
