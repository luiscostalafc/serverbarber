import File from '../models/File';
import CRUD from '../repository/crud';

class FileController {
	async store(req, res) {
		const { originalname: name, filename: path } = req.file;

		const file = await CRUD.create(File, {
			name,
			path,
		});

		return res.json(file);
	}
}

export default new FileController();
