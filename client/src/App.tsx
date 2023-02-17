import axios from "axios";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Protected } from "./middleware/Protected";

// Axios baseUrl
axios.defaults.baseURL = import.meta.env.VITE_SERVER_DOMAIN;

// Routes
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import SendOTP from "./pages/SendOTP";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/recover",
    element: <SendOTP />,
  },
  {
    path: "/me",
    element: (
      <Protected>
        <Profile />
      </Protected>
    ),
  },
]);

const App = () => {
  return (
    <main>
      <RouterProvider router={router}></RouterProvider>
    </main>
  );
};

export default App;
