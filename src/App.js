import './App.css';
import AddCustomerPage from './Pages/AddCustomerPage';
import LoginPage from './Pages/LoginPage';
import GetCustomerById from './Pages/GetCustomerById';
import CreateAccountPage from './Pages/CreateAccountPage';
import { createBrowserRouter } from 'react-router-dom';
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
const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/navigateadmin",
    element: <NavbarComponent />,
  },
  {
    path: "/navigatecustomer",
    element:<NavbarComponentCustomer />,
  },
{
    path: "/createaccount",
    element: <CreateAccountPage />,
  },
  {
    path: "/addcustomer",
    element: <ProtectedRoute>
      <AddCustomerPage />
    </ProtectedRoute>
  },
  {
    path: "/updatecustomer/",
    element: <ProtectedRoute>
      <UpdateCustomerPage />
    </ProtectedRoute>
  },
  {
    path: "/customer/getcustomer/",
    element: <ProtectedRoute>
      <GetCustomerById />
      </ProtectedRoute>
  },
  {
    path: "/deletecustomer/",
    element: <ProtectedRoute>
      <DeleteCustomerPage />
    </ProtectedRoute>
  },
  {
    path: "/transactions",
    element: 
    //<ProtectedRoute>
      <TransactionsPage />
    //</ProtectedRoute>
  },
  {
    path: "/transactions/withdrawal",
    element: 
    //<ProtectedRoute>
      <WithdrawalPage />
    //</ProtectedRoute>
  },
  {
    path: "/transactions/deposit",
    element: <ProtectedRoute>
      <DepositPage />
    </ProtectedRoute>
  },
  {
    path: "/transactions/transfer",
    element: <ProtectedRoute>
      <TransferPage />
    </ProtectedRoute>
  },
  {
    path: "/transactions/balancecheck",
    element: <ProtectedRoute>
      <BalanceCheckPage />
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

}

export default App;