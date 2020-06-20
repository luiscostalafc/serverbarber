import File from '../models/File';
import CRUD from '../repository/crud';

class FileController {
	async index(req, res) {
		return res.status(501).json({ error: 'Not implemented' });
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
		return res.status(501).json({ error: 'Not implemented' });
	}

	async update(req, res) {
		return res.status(501).json({ error: 'Not implemented' });
	}

	async delete(req, res) {
		return res.status(501).json({ error: 'Not implemented' });
	}
}

export default new FileController();
