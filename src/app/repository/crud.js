import coloredLog from '../../lib/ColoredLog';

class CRUD {
	async findAll(Model, query) {
		try {
			const findAll = await Model.findAll(query);
			return findAll;
		} catch (error) {
			const errorMsg = error.stack;
			// eslint-disable-next-line no-console
			console.error(coloredLog(`FindAll: ${errorMsg}`, 'error'));
			return [];
		}
	}

	async findOne(Model, query) {
		try {
			const findOne = await Model.findOne(query);
			return findOne;
		} catch (error) {
			const errorMsg = error.stack;
			// eslint-disable-next-line no-console
			console.error(coloredLog(`FindOne: ${errorMsg}`, 'error'));
			return [];
		}
	}

	async findByPk(Model, id, add) {
		const include = add || {};
		try {
			const findByPk = await Model.findByPk(id, include);
			return findByPk;
		} catch (error) {
			const errorMsg = error.stack;
			// eslint-disable-next-line no-console
			console.error(coloredLog(`FindByPk: ${errorMsg}`, 'error'));
			return [];
		}
	}

	async findAndSort(Model, findQuery, sort, limit = 20) {
		try {
			const find = await Model.find(findQuery)
				.sort(sort)
				.limit(limit);
			return find;
		} catch (error) {
			const errorMsg = error.stack;
			// eslint-disable-next-line no-console
			console.error(coloredLog(`find: ${errorMsg}`, 'error'));
			return [];
		}
	}

	async create(Model, value) {
		try {
			const create = await Model.create(value);
			return create;
		} catch (error) {
			const errorMsg = error.stack;
			// eslint-disable-next-line no-console
			console.error(coloredLog(`create: ${errorMsg}`, 'error'));
			return [];
		}
	}

	async findByIdAndUpdate(Model, id, read, newParam) {
		const qread = read || {};
		const qnew = newParam || {};

		try {
			const findByIdAndUpdate = await Model.findByIdAndUpdate(id, qread, qnew);
			return findByIdAndUpdate;
		} catch (error) {
			const errorMsg = error.stack;
			// eslint-disable-next-line no-console
			console.error(coloredLog(`findByIdAndUpdate: ${errorMsg}`, 'error'));
			return [];
		}
	}
}

export default new CRUD();
