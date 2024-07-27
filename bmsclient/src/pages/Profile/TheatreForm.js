import React from 'react';
import { Button, Modal, Form, Input, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { AddTheatre, UpdateTheatre } from '../../apicalls/theatre';
import { hideLoading, showLoading } from '../../store/loaderSlice';
function TheatreForm({theatreModal,settheatreModal, selectTheatre, setselectTheatre, formType,getData}){

  const {user} = useSelector((state) => state.users);
  const dispatch = useDispatch();
    const onFinish = async (values) => {
      values.isActive = false;
      console.log(values.owner);
      console.log(user._id);
      values.owner = user._id;
      console.log(values);
        try {
            dispatch(showLoading());
            let response = null;
            if(formType === 'add'){
              response = await AddTheatre(values);
              console.log(response);
            }if(formType === 'edit'){
              values.theatreId = selectTheatre._id;
              console.log(values);
              console.log(selectTheatre._id);
                response = await UpdateTheatre({...values,theatreId: selectTheatre._id});
            }
            if(response.success){
                getData();
                message.success(response.message);
                settheatreModal(false);
                setselectTheatre(null);
            } else {
                message.error(response.message);
            }
            dispatch(hideLoading());
        }catch(error){
            dispatch(hideLoading());
            message.error(error.message);
        } 
    };
     
  return (
    <Modal
      title={formType === 'add' ? 'Add Movie' : 'Edit Movie'}
      open={theatreModal}
      cancelText="Cancel"
      onCancel={() => {
        settheatreModal(false);
        setselectTheatre(null);
      }}
      footer={null}
      width={500}
    >
      <Form layout="vertical" initialValues={selectTheatre} onFinish={onFinish} >
        <Form.Item
          name="theatreName"
          label="Theatre Name"
          rules={[
            {
              required: true,
              message: 'Please enter theatre name',
            },
          ]}
        >
          <Input type='text' />
        </Form.Item>

        <Form.Item
          name="address"
          label="Theatre address"
          rules={[
            {
              required: true,
              message: 'Please enter theatre address',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Phone Number"
          rules={[
            {
              required: true,
              message: 'Please enter Theatre Phone number',
            },
          ]}
        >
          <Input type='text' />
        </Form.Item>

        <Form.Item
            name= 'email'
            label = 'E Mail'
            rules={[
                {
                  required: true,
                  message: 'Please enter E mail address',
                },
              ]}
            >
            <Input type='email'/>
        </Form.Item>

        <div className="flex justify-end gap-2">
            <Button type="primary"  htmlType='submit'>
            Save
            </Button>
            <Button onClick={()=>{
                settheatreModal(false);
                setselectTheatre(null);
            }}>
            Cancel
            </Button>
        </div>
      </Form>
    </Modal>
  )
}

export default TheatreForm