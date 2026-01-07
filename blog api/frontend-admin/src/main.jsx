import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from "react-router";
import './index.css'
import App from './App.jsx'
import Posts, { loader as postsLoader } from './Posts.jsx'
import Login, { action as loginAction } from './Login.jsx'
import PostPage, { loader as postLoader } from './PostPage.jsx';
import NotFound from '../NotFound.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { index: true, element: <Navigate to="posts" replace/>},
      { path: "login", Component: Login, action: loginAction },
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


