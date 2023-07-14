import Account from "./pages/AccountPage";
import Homepage from "./pages/HomePage";
import Login from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink  } from '@trpc/client';
import { useState } from 'react';
import { trpc } from './utils/trpc';


export function App() {
  const [queryClient] = useState(() => new QueryClient());
  const serverURL: string = process.env.REACT_APP_URL + ":" + process.env.REACT_APP_SERVER_PORT + "/trpc";
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink ({
          url: serverURL,
          fetch(url, options) {
            return fetch(url, {
              ...options,
              credentials: 'include',
            });
          },
        }),
      ],
    }),
  );


  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
              <Route path="/" element={<Homepage />}/>
              <Route path="/login" element={<Login />}/>
              <Route path="/signup" element={<SignUpPage/>}/>
              <Route path="/account" element={<Account />}/>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </trpc.Provider>
  );
}

export default App;
