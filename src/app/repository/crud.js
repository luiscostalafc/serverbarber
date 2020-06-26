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

	async findById(Model, id) {
		try {
			const findByPk = await Model.findById(id);
			return findByPk;
		} catch (error) {
			const errorMsg = error;
			// eslint-disable-next-line no-console
			console.error(coloredLog(`FindById: ${errorMsg}`, 'error'));
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

	async create(Model, value, mongo = false) {
		try {
			const create = await Model.create(value);
			return create;
		} catch (error) {
			const errorMsg = mongo ? error : error.stack;
			// eslint-disable-next-line no-console
			console.error(coloredLog(`create: ${errorMsg}`, 'error'));
			return [];
		}
	}

	async findByIdAndUpdate(Model, id, data) {
		try {
			const findByIdAndUpdate = await Model.update(data, {
				returning: true,
				plain: true,
				where: { id },
			});
			return findByIdAndUpdate;
		} catch (error) {
			const errorMsg = error.stack;
			// eslint-disable-next-line no-console
			console.error(coloredLog(`findByIdAndUpdate: ${errorMsg}`, 'error'));
			return [];
		}
	}

	async findByIdAndUpdateMongo(Model, id, data) {
		try {
			const findByIdAndUpdateMongo = await Model.findByIdAndUpdate(id, data, {
				new: true,
			});
			return findByIdAndUpdateMongo;
		} catch (error) {
			const errorMsg = error.stack;
			// eslint-disable-next-line no-console
			console.error(coloredLog(`findByIdAndUpdateMongo: ${errorMsg}`, 'error'));
			return [];
		}
	}

	async findByIdAndDestroy(Model, id) {
		const find = await this.findByPk(Model, id);
		const findByIdAndDestroy = !find ? false : find.dataValues;

		if (!findByIdAndDestroy) return {};
		try {
			find.destroy();
			return findByIdAndDestroy;
		} catch (error) {
			const errorMsg = error.stack;
			// eslint-disable-next-line no-console
			console.error(coloredLog(`findByIdAndDestroy: ${errorMsg}`, 'error'));
			return [];
		}
	}

	async findByIdAndRemove(Model, id) {
		try {
			const findByIdAndRemove = Model.findByIdAndRemove(id);
			return findByIdAndRemove;
		} catch (error) {
			const errorMsg = error.stack;
			// eslint-disable-next-line no-console
			console.error(coloredLog(`findByIdAndDestroy: ${errorMsg}`, 'error'));
			return [];
		}
	}
}

export default new CRUD();
