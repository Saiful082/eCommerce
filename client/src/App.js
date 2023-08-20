
import { Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import About from './pages/About';
import Contact from './pages/Contact';
import Policy from './pages/Policy';
import PageNotFound from './pages/PageNotFound';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import Dashboard from './pages/user/Dashboard';
import PrivateRoute from './components/Routes/Private';
import ForgotPassword from './pages/Auth/ForgotPassword';
import AdminRoute from './components/Routes/AdminRoute';
import AdminDashboard from './pages/Admin/AdminDashboard';
import CreateCategory from './pages/Admin/CreateCategory';
import CreateProduct from './pages/Admin/CreateProduct';
import Users from './pages/Admin/Users';
import Order from './pages/user/Order';
import Profile from './pages/user/Profile';



function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<HomePage></HomePage>}></Route>
      <Route path='/about' element={<About></About>}></Route>
      <Route path='/contact' element={<Contact></Contact>}></Route>
      <Route path='/policy' element={<Policy></Policy>}></Route>
      <Route path='/*' element={<PageNotFound></PageNotFound>}></Route>
      <Route path='/forgot-password' element={<ForgotPassword></ForgotPassword>}></Route>
      <Route path='/register' element={<Register></Register>}></Route>
      <Route path='/login' element={<Login></Login>}></Route>
      
      <Route path='/dashboard' element={<PrivateRoute/>}>
         <Route path='user' element={<Dashboard/>}/>
         <Route path='user/profile' element={<Profile/>}/>
         <Route path='user/orders' element={<Order/>}/>
      </Route> 

      <Route path='/dashboard' element={<AdminRoute/>}>
         <Route path='admin' element={<AdminDashboard/>}/>
         <Route path='admin/create/category' element={<CreateCategory/>}/>
         <Route path='admin/create/product' element={<CreateProduct/>}/>
         <Route path='admin/users' element={<Users/>}/>
      </Route> 

      </Routes>  
    </>

    
  );
}

export default App;
