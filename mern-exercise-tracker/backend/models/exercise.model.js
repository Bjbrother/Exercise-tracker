const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			trim: true,
			minLength: 3
		},

		description: {
			type: String,
			required: true
		},
		duration: {
			type: Number,
			required: true
		},
		date: {
			type: Date,
			required: true
		}
	},
	{
		timestamps: true
	}
);

const Exercise = mongoose.model('Exercise', exerciseSchema);
module.exports = Exercise;

// Mongoose schemas have a timestamps option that tells Mongoose to automatically manage createdAt and updatedAt properties on your documents.
