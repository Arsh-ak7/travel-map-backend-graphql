const { AuthenticationError, UserInputError } = require("apollo-server");
const Pin = require("../../models/Pin");
const checkAuth = require("../../utils/checkAuth");

module.exports = {
	Query: {
		async getPins() {
			try {
				const pins = await Pin.find();
				return pins;
			} catch (err) {
				throw new Error(err);
			}
		},

		async getPin(_, { pinId }) {
			try {
				const pin = Pin.findById(pinId);
				if (pin) return pin;
				else throw new Error("Pin Not found");
			} catch (err) {
				throw new Error(err);
			}
		},
	},

	Mutation: {
		async createPin(
			_,
			{ title, desc: { body, rating, publishedAt }, lat, long },
			context
		) {
			const user = checkAuth(context);
			const username = user.username;
			if (body.trim() === "") {
				throw new Error("Body cannot be empty");
			}
			const newPin = new Pin({
				createdBy: username,
				title,
				desc: {
					username,
					body,
					rating,
					publishedAt,
				},
				lat,
				long,
			});
			const pin = await newPin.save();

			return pin;
		},
		async deletePin(_, { pinId }, context) {
			const user = checkAuth(context);
			const username = user.username;
			const pin = await Pin.findById(pinId);
			if (!pin) {
				throw new UserInputError("No pin with this id");
			}
			try {
				if (pin.createdBy === username) {
					await pin.delete();
					return "Pin deleted Successfully";
				} else
					throw new AuthenticationError(
						"You are not authorized to delete this pin"
					);
			} catch (err) {
				throw new Error(err);
			}
		},
		async createDescription(
			_,
			{ pinId, desc: { body, rating, publishedAt } },
			context
		) {
			const pin = await Pin.findById(pinId);
			if (!pin) throw new Error("Pin does not exist");

			const user = checkAuth(context);
			if (!user)
				throw new AuthenticationError(
					"You are not authorized to add details to the pin"
				);

			if (body === "") throw new Error("Body Cannot be empty");

			if (rating === null) throw new Error("Rating cannot be Null");

			if (publishedAt === "") throw new Error("Cannot be Null");

			const username = user.username;

			const addedDescription = {
				username,
				body,
				rating,
				publishedAt,
			};

			pin.desc.push(addedDescription);

			await pin.save();
			return pin;
		},
	},
};
