import './App.css';
import AddCustomerPage from './Pages/AddCustomerPage';
import LoginPage from './Pages/LoginPage';
import GetCustomerById from './Pages/GetCustomerById';
import CreateAccountPage from './Pages/CreateAccountPage';
import { createBrowserRouter } from 'react-router-dom';
import { AppProvider } from "../src/Context/AppContext";
import { RouterProvider } from 'react-router-dom';
import ProtectedRoute from './Components/ProtectedRoute';
//import TransactionsPage from './Pages/TransactionsPage';
import UpdateCustomerPage from './Pages/UpdateCustomerPage';
import DeleteCustomerPage from './Pages/DeleteCustomerPage';
import NavbarComponent from './Components/NavbarComponent';
import NavbarComponentCustomer from './Components/NavbarComponentCustomer';
const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  //currentForm === "login" ? <LoginPage onFormSwitch={toggleForm} /> : <RegisterPage onFormSwitch={toggleForm} />
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

  // {
  //   path: "/profile",
  //   element: <ProtectedRoute>
  //     <ProfilePage />
  //   </ProtectedRoute>,
  // },
]);

const App = () => {
  // const [currentForm, setCurrentForm] = useState('login');

  // const toggleForm = (formName) => {
  //   setCurrentForm(formName);}
  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  );

}

export default App;