import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from './Main/Main';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Login } from './LogAndReg/Login'
import { Register } from './LogAndReg/Register';
import { Movie } from './Main/NewMovie';
import FilmDetails from './Main/FilmDetails';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/main",
    element: <Main />
  },
  {
    path: "/reg",
    element: <Register />
  },
  {
    path: "/main/create",
    element: <Movie />
  },
  {
    path: "/film/:id",
    element: <FilmDetails />
  }
]);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
