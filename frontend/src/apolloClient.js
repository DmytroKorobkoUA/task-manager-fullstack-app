import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'; // Removed ApolloProvider
import { setContext } from '@apollo/client/link/context';

const GRAPHQL_API_URL = process.env.REACT_APP_GRAPHQL_API_URL || "http://localhost:3000/graphql";

const httpLink = createHttpLink({
    uri: GRAPHQL_API_URL,
});

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            ...headers,
            Authorization: token ? `Bearer ${token}` : '',
        }
    };
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

export default client;
