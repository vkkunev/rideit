import gql from 'graphql-tag';

const UserType = gql`
    type User {
        id: ID!
        username: String!
        password: String!
    }

    input RegisterInput {
        username: String!
        password: String!
        confirmPassword: String!
    }

    type Mutation {
        register(registerInput: RegisterInput): User!
        login(username: String!, password: String!): User!
    }
`;