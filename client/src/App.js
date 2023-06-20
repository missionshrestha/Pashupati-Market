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



function App() {
  return (
    <>
      <Routes>

        <Route path='/' element={<HomePage />} />
        <Route path='/dashboard' element={<PrivateRoute />}>
          <Route path='/dashboard' element={<Dashboard />} />
          {/* This /dashboard is protected, at first Private route 
          will be checked then only this dashboard page can be accessed */}
        </Route>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
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
