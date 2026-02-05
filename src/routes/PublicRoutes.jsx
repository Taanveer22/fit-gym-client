import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import NotFound from "../pages/NotFound";
import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import Register from "../pages/Register";
import AddSchedule from "../pages/AddSchedule";
import ScheduleList from "../pages/ScheduleList";
import UpdateSchedule from "../components/UpdateSchedule";

const PublicRoutes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    errorElement: <NotFound></NotFound>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "/addSchedule",
        element: <AddSchedule></AddSchedule>,
      },
      {
        path: "/updateSchedule/:id",
        element: <UpdateSchedule></UpdateSchedule>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/schedule/${params.id}`),
      },
      {
        path: "/scheduleList",
        element: <ScheduleList></ScheduleList>,
        loader: () => fetch(`http://localhost:5000/schedule`),
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "signin",
        element: <SignIn></SignIn>,
      },
    ],
  },
]);

export default PublicRoutes;
