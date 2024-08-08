import { gql } from '@apollo/client';

export const GET_TASKS = gql`
  query GetTasks {
    getAllTasks {
      id
      title
      completed
      user {
        id
        name
      }
    }
  }
`;

export const GET_TASK = gql`
  query GetTask($id: ID!) {
    getTaskById(id: $id) {
      id
      title
      completed
      user {
        id
        name
      }
    }
  }
`;

export const CREATE_TASK = gql`
  mutation CreateTask($title: String!, $completed: Boolean!, $userId: ID!) {
    createTask(title: $title, completed: $completed, userId: $userId) {
      id
      title
      completed
      user {
        id
        name
      }
    }
  }
`;

export const UPDATE_TASK = gql`
  mutation UpdateTask($id: ID!, $title: String!, $completed: Boolean!, $userId: ID!) {
    updateTask(id: $id, title: $title, completed: $completed, userId: $userId) {
      id
      title
      completed
      user {
        id
        name
      }
    }
  }
`;

export const DELETE_TASK = gql`
  mutation DeleteTask($id: ID!) {
    deleteTask(id: $id)
  }
`;
