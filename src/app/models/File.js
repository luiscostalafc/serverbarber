import Sequelize, { Model } from 'sequelize';

class File extends Model {
	static init(sequelize) {
		super.init(
			{
				name: Sequelize.STRING,
				path: Sequelize.STRING,
				url: {
					type: Sequelize.VIRTUAL,
					get() {
						return `http://167.99.165.125/files/${this.path}`;
					},
				},
			},
			{
				sequelize,
			}
		);

		return this;
	}
}

export default File;
