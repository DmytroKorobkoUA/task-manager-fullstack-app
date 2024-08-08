import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type Task {
    id: ID!
    title: String!
    completed: Boolean!
    user: User
  }

  type User {
    id: ID!
    name: String!
  }

  type Query {
    getAllTasks: [Task]
    getTaskById(id: ID!): Task
  }

  type Mutation {
    createTask(title: String!, completed: Boolean!, userId: ID!): Task
    updateTask(id: ID!, title: String, completed: Boolean, userId: ID!): Task
    deleteTask(id: ID!): Boolean
  }
`;

export default typeDefs;
