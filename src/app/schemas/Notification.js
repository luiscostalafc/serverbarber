import mongoose from 'mongoose';

const NotificationSchema = new mongoose.Schema(
	{
		content: {
			type: String,
			required: true,
		},
		user: {
			// id: Number,
			// name: String,
			// email: String,
			// provider: Boolean,
			// created_at: Date,
			// updated_at: Date,
			// avatart_id: Number,
		},
		provider: {
			// id: Number,
			// name: String,
			// email: String,
			// provider: Boolean,
			// created_at: Date,
			// updated_at: Date,
			// avatart_id: Number,
		},
		items: [
			// {
			// 	id: String,
			// 	description: String,
			// 	unit_price: Number,
			// 	quantity: Number,
			// 	currency_id: String,
			// },
		],
		read: {
			type: Boolean,
			required: true,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

export default mongoose.model('Notification', NotificationSchema);
