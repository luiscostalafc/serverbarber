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
					attributes: ['name', 'email', 'provider', 'gender', 'is_admin'],
				},
			],
		});

		return res.json(reg);
	}

	async update(req, res) {
		return res
			.status(501)
			.set({ error: 'Not implemented' })
			.json({});
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
