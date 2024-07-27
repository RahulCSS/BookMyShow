import React, { useEffect } from 'react'
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { LoginUser } from '../apicalls/users';
function Login() {

  const navigate = useNavigate();
  const onFinish = async (values) => {
    try{
      const response = await LoginUser(values);
      if(response.success){
        message.success(response.message);
        localStorage.setItem('token', response.data);
        navigate('/');
        //console.log(response.message);
      }else{
        message.error(response.message);
        console.error(response.message);
  
      }
    }catch(error){
      message.error(error.message);
    }
    //console.log(filteredValues);
  };

  useEffect(()=>{
    if(localStorage.getItem('token')){
      navigate('/');
    }
  },[]);

  return (
    <div className='flex justify-center items-center h-screen w-screen bg-slate-200'>
      <Form className='bg-white p-4'
            onFinish={
              //(values)=>{console.log(values);}
              onFinish
              } 
      >
      <h2 className='font-bold text-3xl text-blue-600 text-center pb-4'> Book my Show</h2>
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="E-Mail" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item >
        <Link className="login-form-forgot" to ='/forgot'> Forgot password</Link>
      </Form.Item>

      <div className='flex justify-center gap-2'>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        <p>or</p>
        <Link to='/register'>register now!</Link>
      </div>
    </Form>
    </div>
  )
}

export default Login