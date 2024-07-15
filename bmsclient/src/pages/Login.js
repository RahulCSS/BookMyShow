import React from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { Link } from 'react-router-dom';
function Login() {
  return (
    <div className='flex justify-center items-center h-screen w-screen bg-slate-200'>
      <Form className='bg-white p-4'>
      <h2 className='font-bold text-3xl text-blue-600 text-center pb-4'> Book my Show</h2>
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
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
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="">
          Forgot password
        </a>
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