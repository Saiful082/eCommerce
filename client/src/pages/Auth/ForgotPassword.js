import React from 'react';
import Layout from '../../components/Layout/Layout';
import { useState }  from "react";
import toast from 'react-hot-toast';
import axios from 'axios';
import {useNavigate } from 'react-router-dom';
import '../../styles/AuthStyle.css';

const ForgotPassword = () => {

    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [answer, setAnswer] = useState('');



    const navigate = useNavigate();


    // function from 
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post('/api/v1/auth/forgot-password',
            {
                email,
                newPassword,
                answer,
                }
            );

            if(res && res.data.success){
                toast.success(res && res.data.message);
               
                navigate('/login');
            }else{
                toast.error(res.data.message);
            }

        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
            
        }
    };
    return (
        <Layout title={'Forgot password - eCommerce'}>
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
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="from-control"
              id="exampleInputEmail"
              placeholder="Enter Your Father Name"
              required
            />
          </div>

          <div className="mb-3">
             <input
               type="password"
               value={newPassword}
               onChange={(e) => setNewPassword(e.target.value)}
               className="from-control"
               id="exampleInputPassword1"
               placeholder="Enter Your Password"
               required
               />
          </div>

          
          <button type="submit" className="btn btn-primary">
            Reset
          </button>
        </form>
      </div>
        </div>
     </div>
        </Layout>
    );
};

export default ForgotPassword;