import React from 'react';
import { Link } from'react-router-dom';
import { Button, Form, Input } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
function Forgot() {
  return (
    <div>
        <div className='flex justify-center items-center h-screen w-screen bg-slate-200'>
      <Form className='bg-white p-4'>
      <h2 className='font-bold text-3xl text-blue-600 text-center pb-4'> Reset Password</h2>
    
      <Form.Item
          name="email"
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
        <Input
          prefix={<MailOutlined className="site-form-item-icon" />}
          type="email"
          placeholder="E-mail"
        />
        </Form.Item>
    
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
          hasFeedback
        >
        <Input.Password 
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
        />
        </Form.Item>

        <Form.Item
          name="confirm"
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
        <Input.Password 
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Confirm Password"/>
        </Form.Item>

      <div className='flex flex-col items-center gap-2'>
        <Button type="primary" htmlType="submit" className="login-form-button" >
          Reset Password
        </Button>
        <Link to='/login'>Click here to Login</Link>
      </div>
    </Form>
    </div>
    </div>
  )
}

export default Forgot;