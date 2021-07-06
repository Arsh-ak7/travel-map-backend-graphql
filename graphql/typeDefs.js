const { gql } = require("apollo-server");

module.exports = gql`
	type User {
		id: ID!
		username: String!
		email: String!
		token: String!
		createdAt: String!
	}
	type Description {
		username: String!
		body: String!
		rating: Int!
		publishedAt: String!
	}
	type Pin {
		id: ID!
		createdBy: String!
		title: String!
		description: [Description]!
		lat: Float!
		long: Float!
	}
	input RegisterInput {
		username: String!
		password: String!
		confirmPassword: String!
		email: String!
	}
	input DescriptionInput {
		username: String!
		body: String!
		rating: Int!
		publishedAt: String!
	}
	type Query {
		getPins: [Pin]
		getPin(pinId: ID!): Pin
	}
	type Mutation {
		register(registerInput: RegisterInput): User!
		login(username: String!, password: String!): User!
		createPin(title: String!): Pin!
		deletePin(pinId: ID!): Pin!
		createDescription(pinId: ID!, description: DescriptionInput!): Pin!
	}
`;
