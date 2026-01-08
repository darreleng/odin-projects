import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from "react-router";
import './index.css'
import App from './App.jsx'
import Posts, { loader as postsLoader } from './Posts.jsx'
import Login, { action as loginAction } from './Login.jsx'
import { action as logoutAction } from './Logout.jsx'
import PostPage, { loader as postLoader } from './PostPage.jsx';
import NotFound from '../NotFound.jsx';

async function rootLoader() {
  const res = await fetch('http://localhost:5000/api/auth/me', { credentials: 'include' });

  if (res.status === 401) return { user: null };
  
  const user = await res.json();
  return { user };
}

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    id: "root",
    loader: rootLoader,
    children: [
      { index: true, element: <Navigate to="posts" replace/>},
      { path: "login", Component: Login, action: loginAction },
      { path: "logout", action: logoutAction },
      { path: "posts", Component: Posts, loader: postsLoader },
      { path: "posts/:id", Component: PostPage, loader: postLoader },
      { path: "*", Component: NotFound }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)


