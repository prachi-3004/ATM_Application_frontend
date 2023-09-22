import "./App.css";
import AddCustomerPage from "./Pages/AddCustomerPage";
import LoginPage from "./Pages/LoginPage";
import GetCustomer from "./Pages/GetCustomer";
import CreateAccountPage from "./Pages/CreateAccountPage";
import { createBrowserRouter } from "react-router-dom";
import { AppProvider } from "../src/Context/AppContext";
import { RouterProvider } from 'react-router-dom';
import ProtectedRoute from './Components/ProtectedRoute';
import TransactionsPage from './Pages/TransactionsPage';
import UpdateCustomerPage from './Pages/UpdateCustomerPage';
import DeleteCustomerPage from './Pages/DeleteCustomerPage';
import NavbarComponent from './Components/NavbarComponent';
import NavbarComponentCustomer from './Components/NavbarComponentCustomer';
import WithdrawalPage from './Pages/Transactions/WithdrawalPage';
import DepositPage from './Pages/Transactions/DepositPage';
import TransferPage from './Pages/Transactions/TransferPage';
import BalanceCheckPage from './Pages/Transactions/BalanceCheckPage';
import MiniStatementsPage from "./Pages/Transactions/MiniStatementsPage";
import ChangePinPage from "./Pages/ChangePinPage";

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
  {
    path: "/transactions",
    element: 
    <ProtectedRoute>
      <TransactionsPage />
    </ProtectedRoute>
  },
  {
    path: "/transactions/withdrawal/:id",
    element: 
    <ProtectedRoute>
      <WithdrawalPage />
    </ProtectedRoute>
  },
  {
    path: "/transactions/deposit/:id",
    element: <ProtectedRoute>
      <DepositPage />
    </ProtectedRoute>
  },
  {
    path: "/transactions/transfer/:id",
    element: <ProtectedRoute>
      <TransferPage />
    </ProtectedRoute>
  },
  {
    path: "/transactions/balancecheck/:id",
    element: <ProtectedRoute>
      <BalanceCheckPage />
    </ProtectedRoute>
  },
  {
    path: "/transactions/ministatements/:id",
    element: <ProtectedRoute>
      <MiniStatementsPage />
    </ProtectedRoute>
  },
  {
    path: "/transactions/changepin/:id",
    element: <ProtectedRoute>
      <ChangePinPage />
    </ProtectedRoute>
  },
  // {
  //   path: "/profile",
  //   element: <ProtectedRoute>
  //     <ProfilePage />
  //   </ProtectedRoute>,
  // },
]);

const App = () => {
  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  );
};

export default App;
