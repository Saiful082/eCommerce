import React from 'react';
import { useState }  from "react";
import Layout from "../../components/Layout/Layout";
import toast from 'react-hot-toast';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import '../../styles/AuthStyle.css';
import { useAuth } from '../../context/ContextAuth';

const Login = () => {

    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [auth, setAuth] = useAuth();


    const navigate = useNavigate();


    // function from 
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post('/api/v1/auth/login',
            {
                email,
                password
                }
            );

            if(res && res.data.success){
                toast.success(res && res.data.message);
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token,
                });
                localStorage.setItem('auth', JSON.stringify(res.data));
                navigate('/');
            }else{
                toast.error(res.data.message);
            }

        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
            
        }
    };

    return (
        
            
        <Layout title="Login - eCommerce-App">
         <div className="register-bg">
        <div className="from-container">
        <div className="register">
        <h1 className='title'>Login Page</h1>
        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="from-control"
              id="exampleInputEmail"
              placeholder="Enter Your Email"
              required
            />
          </div>

          <div className="mb-3">
             <input
               type="password"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               className="from-control"
               id="exampleInputPassword1"
               placeholder="Your Password"
               required
               />
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
        </div>
     </div>
    </Layout>
           
        
    );
};

export default Login;