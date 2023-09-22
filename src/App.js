import "./App.css";
import AddCustomerPage from "./Pages/AddCustomerPage";
import LoginPage from "./Pages/LoginPage";
import GetCustomer from "./Pages/GetCustomer";
import CreateAccountPage from "./Pages/CreateAccountPage";
import GetAccountDetails from "./Pages/GetAccountDetails";
import { createBrowserRouter } from "react-router-dom";
import { AppProvider } from "../src/Context/AppContext";
import { RouterProvider } from "react-router-dom";
import ProtectedRoute from "./Components/ProtectedRoute";
import UpdateCustomerPage from "./Pages/UpdateCustomerPage";
import GetspecAccount from "./Pages/GetspecAccount";
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
    path: "/createaccount/:id",
    element: (
      <ProtectedRoute>
        <CreateAccountPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/getaccountdetails/:id",
    element: (
      <ProtectedRoute>
        <GetAccountDetails />
      </ProtectedRoute>
    ),
  },
  {
    path: "/getaccountspec/:id",
    element: (
      <ProtectedRoute>
        <GetspecAccount />
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
]);

const App = () => {
  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  );
};

export default App;
