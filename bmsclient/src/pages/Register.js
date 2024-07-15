import React from 'react';
import { Form, Input } from "antd";
import Button from "../components/Button";
import { Link } from 'react-router-dom';
function Register() {
  return (
    <div className='flex justify-center items-center h-screen w-screen bg-slate-200'> 
      <Form  className='bg-white p-4'>
        <h2 className='font-bold text-3xl text-blue-600 text-center pb-4'> Welcome to Show Family</h2>
          <Form.Item
          name="username"
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
          <Button />
          <Link to ='/login'> Already have an account? Login</Link>
        </div>

       </Form>
    </div>
  )
}

export default Register