import logo from './logo.svg';
import './App.css';
import AddCustomerPage from './Pages/AddCustomerPage';
import LoginPage from './Pages/LoginPage';
//import ProfilePage from './Pages/ProfilePage';
//import LoginwithToken from './Pages/LoginwithToken';
import { createBrowserRouter } from 'react-router-dom';
//import LayoutComponent from './Components/Layout.component';
import { AppProvider } from "../src/Context/AppContext";
import { RouterProvider } from 'react-router-dom';
import ProtectedRoute from './Components/ProtectedRoute';
//import CustomerPage from './Pages/CustomerPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <AddCustomerPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  /*{
    path: "/customer",
    element: <ProtectedRoute>
      <CustomerPage />
    </ProtectedRoute>
  },
  {
    path: "/profile",
    element: <ProtectedRoute>
      <ProfilePage />
    </ProtectedRoute>,
  },*/
]);

const App = () => {
  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  );

}

export default App;