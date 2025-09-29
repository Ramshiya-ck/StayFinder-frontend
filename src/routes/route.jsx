import {
    createBrowserRouter,
  } from "react-router-dom";
import { UserLayout } from "../layouts/UserLayout";
import { Home } from "../pages/Home";
import { Ratinghotel } from "../pages/Ratinghotel";
import { Category } from "../pages/Category";
import  Profile  from "../pages/profile"
import { Register } from "../pages/Register";
import { Login } from "../pages/Login";
import HotelList from "../pages/Hotel";
import { About } from "../pages/about";
import { Singlehotel } from "../pages/singlehotel";
import Room from "../pages/Room";
import Booking from "../pages/booking";
import PaymentSuccess from "../pages/payment_success";
import BookingCard from "../pages/my_booking";

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
        },
        {
          path:"booking/:id/:room_id",
          element:<Booking />
        },
        {
          path:'profile',
          element:< Profile />
        },
        {
          path:'/payment/success',
          element:< PaymentSuccess />

        },
        {
          path: "my-bookings/:booking_id",
          element: <BookingCard />
        }
      ]
    },
  ]);