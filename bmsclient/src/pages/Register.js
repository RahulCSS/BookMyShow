import React from 'react';
import { Form, Input, message as Message, Button } from "antd";
import { Link } from 'react-router-dom';
import { RegisterUser } from '../apicalls/users';
function Register() {

  
  
  const onFinish = async (values) => {
    const { confirm , ...filteredValues } = values;
    try{
      const response = await RegisterUser(filteredValues);
      if(response.success){
        Message.success(response.message);
        console.log(response.message);
      }else{
        Message.error(response.message);
        console.log(response.message);
      }
    }catch(error){
      Message.error(error.message);
    }
    //console.log(filteredValues);
  };

  return (
    <div className='flex justify-center items-center h-screen w-screen bg-slate-200'> 
      <Form layout='vertical' className='bg-white p-4' 
                              onFinish={
                              //(values)=>{console.log(values);}
                              onFinish
                              }   
      >
        <h2 className='font-bold text-3xl text-blue-600 text-center pb-4'> Welcome to Show Family</h2>
          <Form.Item
          name="name"
          label="Username"
          tooltip="What do you want site to address you?"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
              whitespace: true,
            },
          ]}
        >
        <Input />
        </Form.Item>

        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}
        >
        <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
          hasFeedback
        >
        <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The new password that you entered do not match!'));
              },
            }),
          ]}
        >
        <Input.Password />
        </Form.Item>

        <div className="flex flex-col items-center gap-1">
        <Button type="primary" htmlType = "submit">Register</Button>
          <Link to ='/login'> Already have an account? Login</Link>
        </div>

       </Form>
    </div>
  )
}

export default Register