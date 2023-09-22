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
import BalanceCheckPage from "./Pages/Transactions/BalanceCheckPage";
import WithdrawalPage from "./Pages/Transactions/WithdrawalPage";
import TransferPage from "./Pages/Transactions/TransferPage";
import DepositPage from "./Pages/Transactions/DepositPage";
import MiniStatementsPage from "./Pages/Transactions/MiniStatementsPage";
import ChangePinPage from "./Pages/ChangePinPage";
import UpdateCredentials from "./Pages/UpdateCredentials";
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
    path: "/updatecredentials/:id",
    element: (
      <ProtectedRoute>
        <UpdateCredentials />
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
    path: "/transactions/withdrawal/:id",
    element: (
      <ProtectedRoute>
        <WithdrawalPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/transactions/deposit/:id",
    element: (
      <ProtectedRoute>
        <DepositPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/transactions/transfer/:id",
    element: (
      <ProtectedRoute>
        <TransferPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/transactions/balancecheck/:id",
    element: (
      <ProtectedRoute>
        <BalanceCheckPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/transactions/ministatements/:id",
    element: (
      <ProtectedRoute>
        <MiniStatementsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/transactions/changepin/:id",
    element: (
      <ProtectedRoute>
        <ChangePinPage />
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
