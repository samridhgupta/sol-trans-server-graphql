export const typeDefs = `
  type Author {
    id: Int
    firstName: String
    lastName: String
  }

  type Query {
    author: [Author]
  }

  schema {
    query: Query
  }
`;