import "./App.css";
import AddCustomerPage from "./Pages/AddCustomerPage";
import LoginPage from "./Pages/LoginPage";
import GetCustomer from "./Pages/GetCustomer";
import CreateAccountPage from "./Pages/CreateAccountPage";
import { createBrowserRouter } from "react-router-dom";
import { AppProvider } from "../src/Context/AppContext";
import { RouterProvider } from "react-router-dom";
import ProtectedRoute from "./Components/ProtectedRoute";
import UpdateCustomerPage from "./Pages/UpdateCustomerPage";
import DeleteCustomerPage from "./Pages/DeleteCustomerPage";
import NavbarComponent from "./Components/NavbarComponent";
import NavbarComponentCustomer from "./Components/NavbarComponentCustomer";
const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },

  {
    path: "/navigateadmin",
    element: (
      <ProtectedRoute>
        <NavbarComponent />
      </ProtectedRoute>
    ),
  },
  {
    path: "/navigatecustomer",
    element: (
      <ProtectedRoute>
        <NavbarComponentCustomer />
      </ProtectedRoute>
    ),
  },
  {
    path: "/createaccount",
    element: (
      <ProtectedRoute>
        <CreateAccountPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/addcustomer",
    element: (
      <ProtectedRoute>
        <AddCustomerPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/updatecustomer/:id",
    element: (
      <ProtectedRoute>
        <UpdateCustomerPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/getcustomer/:id",
    element: (
      <ProtectedRoute>
        <GetCustomer />
      </ProtectedRoute>
    ),
  },
  {
    path: "/deletecustomer/:id",
    element: (
      <ProtectedRoute>
        <DeleteCustomerPage />
      </ProtectedRoute>
    ),
  },
]);

const App = () => {
  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  );
};

export default App;
