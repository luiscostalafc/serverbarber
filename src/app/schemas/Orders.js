import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema(
	{
		reference: {
			type: String,
			required: true,
		},
		user: {
			id: Number,
			name: String,
			email: String,
			provider: Boolean,
			created_at: Date,
			updated_at: Date,
			avatart_id: Number,
		},
		provider: {
			id: Number,
			name: String,
			email: String,
			provider: Boolean,
			created_at: Date,
			updated_at: Date,
			avatart_id: Number,
		},
		items: [
			{
				id: String,
				description: String,
				unit_price: Number, 
				quantity: Number,
				currency_id: String
			}
		],
	},
	{
		timestamps: true,
	}
);

export default mongoose.model('Order', OrderSchema);
