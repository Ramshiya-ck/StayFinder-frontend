import {
    createBrowserRouter,
  } from "react-router-dom";
import { UserLayout } from "../layouts/UserLayout";
import { Home } from "../pages/Home";
import { Ratinghotel } from "../pages/Ratinghotel";
import { Category } from "../pages/Category";
import { Profile } from "../pages/profile";
import { Register } from "../pages/Register";

  export const router = createBrowserRouter([
    {
      path: "/",
      element: <UserLayout />,

      // path: 'profile',
      // element: <Profile /> ,       

      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: "register",
          element: <Register />
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