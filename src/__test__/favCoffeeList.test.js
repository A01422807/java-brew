import { render, screen } from '@testing-library/react';
import FavCoffeeList from '../components/favCoffeeList';
// 1
import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache
} from '@apollo/client';
import { baseURL } from '../config';

test('renders CoffeeList', () => {
  

  // 2
  let httpLink = createHttpLink({
    uri: baseURL+'/graphql/'
  });

  // 3
  let client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
  });
  render(
    <ApolloProvider client={client}>
      <FavCoffeeList />
    </ApolloProvider>
    );
});
