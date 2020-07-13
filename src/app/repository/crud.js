import coloredLog from '../../lib/ColoredLog';

class CRUD {
	async find(Model, query = {}) {
		try {
			console.time('⏱ Find');
			const findAll = await Model.find(query);
			console.timeEnd('⏱ Find');
			return findAll;
		} catch (error) {
			const errorMsg = error.stack;
			// eslint-disable-next-line no-console
			console.error(coloredLog(`🚨 FindAll: ${errorMsg}`, 'error'));
			return [];
		}
	}

	async findAll(Model, query) {
		try {
			console.time('⏱ Find all');
			const findAll = await Model.findAll(query);
			console.timeEnd('⏱ Find all');
			return findAll;
		} catch (error) {
			const errorMsg = error.stack;
			// eslint-disable-next-line no-console
			console.error(coloredLog(`🚨 FindAll: ${errorMsg}`, 'error'));
			return [];
		}
	}

	async findOne(Model, query, add = {}, sort = {}) {
		try {
			console.time('⏱ Find one');
			const findOne = await Model.findOne(query, add, sort);
			console.timeEnd('⏱ Find one');
			return findOne;
		} catch (error) {
			const errorMsg = error.stack;
			// eslint-disable-next-line no-console
			console.error(coloredLog(`🚨 FindOne: ${errorMsg}`, 'error'));
			return [];
		}
	}

	async findByPk(Model, id, add) {
		const include = add || {};
		try {
			console.time('⏱ Find by pk');
			const findByPk = await Model.findByPk(id, include);
			console.timeEnd('⏱ Find by pk');
			return findByPk;
		} catch (error) {
			const errorMsg = error.stack;
			// eslint-disable-next-line no-console
			console.error(coloredLog(`🚨 FindByPk: ${errorMsg}`, 'error'));
			return [];
		}
	}

	async findById(Model, id) {
		try {
			console.time('⏱ Find by id');
			const findByPk = await Model.findById(id);
			console.timeEnd('⏱ Find by id');
			return findByPk;
		} catch (error) {
			const errorMsg = error;
			// eslint-disable-next-line no-console
			console.error(coloredLog(`🚨 FindById: ${errorMsg}`, 'error'));
			return [];
		}
	}

	async findAndSort(Model, findQuery, sort, limit = 20) {
		try {
			console.time('⏱ Find and sort');
			const find = await Model.find(findQuery)
				.sort(sort)
				.limit(limit);
			console.timeEnd('⏱ Find and sort');
			return find;
		} catch (error) {
			const errorMsg = error.stack;
			// eslint-disable-next-line no-console
			console.error(coloredLog(`🚨 find: ${errorMsg}`, 'error'));
			return [];
		}
	}

	async create(Model, value, mongo = false) {
		console.log(value);
		try {
			console.time('⏱ Create');
			const create = await Model.create(value);
			console.timeEnd('⏱ Create');
			return create;
		} catch (error) {
			const errorMsg = mongo ? error : error.stack;
			// eslint-disable-next-line no-console
			console.error(coloredLog(`🚨 create: ${errorMsg}`, 'error'));
			return [];
		}
	}

	async findByIdAndUpdate(Model, id, data) {
		try {
			console.time('⏱ Find by id and update');
			const findByIdAndUpdate = await Model.update(data, {
				returning: true,
				plain: true,
				where: { id },
			});
			console.timeEnd('⏱ Find by id and update');
			return findByIdAndUpdate;
		} catch (error) {
			const errorMsg = error.stack;
			// eslint-disable-next-line no-console
			console.error(coloredLog(`🚨 findByIdAndUpdate: ${errorMsg}`, 'error'));
			return [];
		}
	}

	async findByIdAndUpdateMongo(Model, id, data) {
		try {
			console.time('⏱ Find by id and update (mongo)');
			const findByIdAndUpdateMongo = await Model.findByIdAndUpdate(id, data, {
				new: true,
			});
			console.timeEnd('⏱ Find by id and update (mongo)');
			return findByIdAndUpdateMongo;
		} catch (error) {
			const errorMsg = error.stack;
			// eslint-disable-next-line no-console
			console.error(coloredLog(`🚨 findByIdAndUpdateMongo: ${errorMsg}`, 'error'));
			return [];
		}
	}

	async findByIdAndDestroy(Model, id) {
		const find = await this.findByPk(Model, id);
		const findByIdAndDestroy = !find ? false : find.dataValues;

		if (!findByIdAndDestroy) return {};
		try {
			console.time('⏱ Find by id and destroy');
			find.destroy();
			console.timeEnd('⏱ Find by id and destroy');
			return findByIdAndDestroy;
		} catch (error) {
			const errorMsg = error.stack;
			// eslint-disable-next-line no-console
			console.error(coloredLog(`🚨 findByIdAndDestroy: ${errorMsg}`, 'error'));
			return [];
		}
	}

	async findByIdAndRemove(Model, id) {
		try {
			console.time('⏱ Find by id and remove');
			const findByIdAndRemove = Model.findByIdAndRemove(id);
			console.timeEnd('⏱ Find by id and remove');
			return findByIdAndRemove;
		} catch (error) {
			const errorMsg = error.stack;
			// eslint-disable-next-line no-console
			console.error(coloredLog(`🚨 findByIdAndDestroy: ${errorMsg}`, 'error'));
			return [];
		}
	}
}

export default new CRUD();
