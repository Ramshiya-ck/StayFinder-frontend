import {
    createBrowserRouter,
  } from "react-router-dom";
import { UserLayout } from "../layouts/UserLayout";
import { Home } from "../pages/Home";
import { Ratinghotel } from "../pages/Ratinghotel";
import { Category } from "../pages/Category";

  export const router = createBrowserRouter([
    {
      path: "/",
      element: <UserLayout />,

      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path:"tophotel",
          element: <Ratinghotel />
        },
        {
          path:"category",
          element: <Category />
        }
      ]
    },
  ]);