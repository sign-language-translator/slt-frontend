import React, { Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import { Layout } from './components';

// Lazily load the components
const Landing = React.lazy(() => import('./pages/Landing'));
const Translator = React.lazy(() => import('./pages/Translator'));

function App() {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        {
          path: '/',
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <Landing />
            </Suspense>
          ),
        },
        {
          path: '/translator',
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <Translator />
            </Suspense>
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
