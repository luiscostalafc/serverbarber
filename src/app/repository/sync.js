import coloredLog from '../../lib/ColoredLog';
import CRUD from './crud';

import Category from '../models/Category';
import User from '../models/User';
import Phone from '../models/Phone';
import File from '../models/File';

class Sync {
	async categoryAddUser(categoryId, userId) {
		const category = await CRUD.findByPk(Category, categoryId);
		if (!category) return { error: 'Category not found' };

		const user = await CRUD.findByPk(User, userId);
		if (!user) return { error: 'User not found' };

		try {
			const syncUser = await category.addUser(user);
			return syncUser || {};
		} catch (error) {
			const errorMsg = error.stack;
			// eslint-disable-next-line no-console
			console.error(
				coloredLog(`Sync error categoryAddUser: ${errorMsg}`, 'error')
			);
			return [];
		}
	}

	async phoneAddUser(phoneId, userId) {
		const phone = await CRUD.findByPk(Phone, phoneId);
		if (!phone) return { error: 'Phone not found' };

		const user = await CRUD.findByPk(User, userId);
		if (!user) return { error: 'User not found' };

		try {
			const syncUser = await phone.addUser(user);
			return syncUser || {};
		} catch (error) {
			const errorMsg = error.stack;
			// eslint-disable-next-line no-console
			console.error(
				coloredLog(`Sync error phoneAddUser: ${errorMsg}`, 'error')
			);
			return [];
		}
	}

	async fileAddUser(fileId, userId) {
		const file = await CRUD.findByPk(File, fileId);
		if (!file) return { error: 'file not found' };

		const user = await CRUD.findByPk(User, userId);
		if (!user) return { error: 'User not found' };

		try {
			const syncUser = await file.addUser(user);
			return syncUser || {};
		} catch (error) {
			const errorMsg = error.stack;
			// eslint-disable-next-line no-console
			console.error(coloredLog(`Sync error fileAddUser: ${errorMsg}`, 'error'));
			return [];
		}
	}
}

export default new Sync();
