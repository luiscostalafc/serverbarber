import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema(
	{
		reference: {
			type: String,
			required: true,
		},
		paymentMethod: {
			type: String,
			required: true,
		},
		extraAmount: {
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
				amount: Float, 
				quantity: Number
			}
		],
		sender: {
			email: String,
			name: String,
			cpf: String,
			areaCode: String,
			phone: String,
		},
		creditPayment: {
			cardToken: String,
			InstallmentQuantity: String,
			InstalmentValue: String,
			holderName: String,
			holderBirthDate: Date,
			holderAreaCode: String,
			holderPhone: String
		},
	},
	{
		timestamps: true,
	}
);

export default mongoose.model('Order', OrderSchema);
