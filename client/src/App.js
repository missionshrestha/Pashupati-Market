import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import About from './pages/About';
import Contact from './pages/Contact';
import Policy from './pages/Policy';
import PageNotFound from './pages/PageNotFound';
import Register from './pages/Auth/register';
import Login from './pages/Auth/login';
import Dashboard from './pages/user/Dashboard';
import PrivateRoute from './components/Routes/Private.js'
import ForgotPassword from './pages/Auth/ForgotPassword';
import AdminRoute from './components/Routes/AdminRoute';
import AdminDashBoard from './pages/Admin/AdminDashBoard';
import CreateCategory from './pages/Admin/CreateCategory';
import CreateProduct from './pages/Admin/CreateProduct';
import Users from './pages/Admin/Users';
import Profile from './pages/user/Profile';
import Orders from './pages/user/Orders';



function App() {
  return (
    <>
      <Routes>

        <Route path='/' element={<HomePage />} />
        <Route path='/dashboard' element={<PrivateRoute />}>
          <Route path='user' element={<Dashboard />} />
          {/* This /dashboard is protected, at first Private route 
          will be checked then only this dashboard page can be accessed */}

          <Route path='user/profile' element={<Profile />}></Route>
          <Route path='user/orders' element={<Orders />}></Route>
        </Route>
        <Route path='/dashboard' element={<AdminRoute />}>
          <Route path='admin' element={<AdminDashBoard />}></Route>
          <Route path='admin/create-category' element={<CreateCategory />}></Route>
          <Route path='admin/create-product' element={<CreateProduct />}></Route>
          <Route path='admin/users' element={<Users />}></Route>

        </Route>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/policy' element={<Policy />} />
        {/* for pages other than above */}
        <Route path='*' element={<PageNotFound />} />
      </Routes >


    </>
  );
}

export default App;
