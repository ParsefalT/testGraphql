const transactionTypeDef = `#graphql
    type Transaction {
        id: String!
        userId: String!
        description: String!
        paymentType: String!
        category: String!
        amount: Float!
        location: String!
        date: String!
    }

    type Query {
        transactions: [Transaction!]!
        transactionById(transactionId: ID!): Transaction
    }

    type Mutation {
        createTransaction(input: CreateTransactionInput!): Transaction!
        updateTransaction(input: UpdateTransactionInput!): Transaction!
        deleteTransaction(transactionId: ID!): Transaction!
    }

    input CreateTransactionInput {
        userId: String!
        description: String!
        paymentType: String!
        category: String!
        amount: Float!
        location: String!
        date: String!
    }

    input UpdateTransactionInput {
        transactionId: ID!
        userId: String
        description: String
        paymentType: String
        category: String
        amount: Float
        location: String
        date: String
    }
`;
export default transactionTypeDef;
