const Pin = require("../../models/Pin");

module.exports = {
	Query: {
		async getPins() {
			try {
				const posts = await Post.find();
				return posts;
			} catch (err) {
				throw new Error(err);
			}
		},

		async getPins(_, { pinId }) {
			try {
				const pin = Pin.findById(pinId);
				if (pin) return pin;
				else throw new Error("Pin Not found");
			} catch (err) {
				throw new Error(err);
			}
		},
	},
};
