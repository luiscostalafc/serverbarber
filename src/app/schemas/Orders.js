import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema(
	{
		reference: {
			type: String,
			required: true,
		},
		user_id: {
			type: Number,
			required: true,
		},
		provider_id: {
			type: Number,
			required: true,
		},
		items: [
			{
				id: String,
				description: String,
				unit_price: Number,
				quantity: Number,
				currency_id: String,
			},
		],
	},
	{
		timestamps: true,
	}
);

export default mongoose.model('Order', OrderSchema);
