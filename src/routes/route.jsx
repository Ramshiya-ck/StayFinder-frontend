import {
    createBrowserRouter,
  } from "react-router-dom";
import { UserLayout } from "../layouts/UserLayout";
import { Home } from "../pages/Home";
import { Ratinghotel } from "../pages/Ratinghotel";
import { Category } from "../pages/Category";
import { Profile } from "../pages/profile";
import { Register } from "../pages/Register";
import { Login } from "../pages/Login";
import HotelList from "../pages/Hotel";
import { About } from "../pages/about";
import { Singlehotel } from "../pages/singlehotel";
import Room from "../pages/Room";

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
          path: "login",
          element: <Login />
        },

        {
          path:"tophotel",
          element: <Ratinghotel />
        },
        {
          path:"category",
          element: <Category />
        },
        {
          path:"hotelpage",
          element:<HotelList />
        },
        {
          path:"about",
          element:<About />
        },
        {
          path:"singlehotel/:id/",
          element:<Singlehotel />
        },
        {
          path:"room/:id",
          element:<Room />
        }
      ]
    },
  ]);