import logo from './logo.svg';
import './App.css';
import AddCustomerPage from './Pages/AddCustomerPage';
import LoginPage from './Pages/LoginPage';
import GetCustomerById from './Pages/GetCustomerById';
import CreateAccountPage from './Pages/CreateAccountPage';
//import ProfilePage from './Pages/ProfilePage';
//import LoginwithToken from './Pages/LoginwithToken';
import { createBrowserRouter } from 'react-router-dom';
//import LayoutComponent from './Components/Layout.component';
import { AppProvider } from "../src/Context/AppContext";
import { RouterProvider } from 'react-router-dom';
import ProtectedRoute from './Components/ProtectedRoute';
//import TransactionsPage from './Pages/TransactionsPage';
//import CustomerPage from './Pages/CustomerPage';
import NavbarComponent from './Components/NavbarComponent';
import NavbarComponentCustomer from './Components/NavbarComponentCustomer';
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
// =======
{
    path: "/createaccount",
    element: <CreateAccountPage />,
  },
  /*{
    path: "/transactions",
    element: <TransactionsPage />,
  },*/

  {
    path: "/addcustomer",
    element: <ProtectedRoute>
      <AddCustomerPage />
    </ProtectedRoute>
  },
  {
    path: "/customer/getcustomer/",
    element: <ProtectedRoute>
      <GetCustomerById />
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