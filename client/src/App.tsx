/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, useMemo, useState } from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  from,
  HttpLink,
} from '@apollo/client';

import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';

export const UserContext = createContext<any>(null);

function App() {
  const [user, setUser] = useState<string>('');
  const value = useMemo(() => ({ user, setUser }), [user, setUser]);
  const link = from([new HttpLink({ uri: 'http://localhost:4000/graphql' })]);

  const client = new ApolloClient({
    cache: new InMemoryCache({
      //addTypename: false,
    }),
    link: link,
  });
  return (
    <ApolloProvider client={client}>
      <UserContext.Provider value={value}>
        <BrowserRouter>
          <div className="App">{Routes}</div>
        </BrowserRouter>
      </UserContext.Provider>
    </ApolloProvider>
  );
}

export default App;
