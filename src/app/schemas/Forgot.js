import mongoose from 'mongoose';

const ForgotSchema = new mongoose.Schema(
	{
		password_hash: {
			type: String,
			required: true,
		},
		user_id: {
			type: Number,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

export default mongoose.model('Forgot', ForgotSchema);
