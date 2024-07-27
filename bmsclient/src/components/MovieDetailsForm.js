import React, { useState } from 'react';
import { Button, Modal, Form, Input, message } from 'antd';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../store/loaderSlice';
import { AddMovie, UpdateMovie } from '../apicalls/movies';
import moment from 'moment';

function MovieDetailsForm({showModal, setshowModal, selectMovie, setselectMovie, getData, formType}) {

    if (selectMovie) {
        selectMovie.releaseDate = moment(selectMovie.releaseDate).format('YYYY-MM-DD');
    }

    const dispatch = useDispatch();
    const onFinish = async (values) => {
        try {
            dispatch(showLoading());
            let response = null;
            if(formType === 'add'){
                response = await AddMovie(values);
                console.log(response);
            }if(formType === 'edit'){
                response = await UpdateMovie({...values,movieId: selectMovie._id});
            }
            if(response.success){
                getData();
                message.success(response.message);
                setshowModal(false);
                setselectMovie(null);
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
      open={showModal}
      cancelText="Cancel"
      onCancel={() => {
        setshowModal(false);
        setselectMovie(null);
      }}
      footer={null}
      width={500}
    >
      <Form layout="vertical" initialValues={selectMovie} onFinish={onFinish}>
        <Form.Item
          name="title"
          label="Movie Name"
          rules={[
            {
              required: true,
              message: 'Please enter movie name',
            },
          ]}
        >
          <Input type='text' />
        </Form.Item>

        <Form.Item
          name="description"
          label="Movie Description"
          rules={[
            {
              required: true,
              message: 'Please enter movie descripton',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="duration"
          label="Movie Duration (Minutes)"
          rules={[
            {
              required: true,
              message: 'Please enter movie duration',
            },
          ]}
        >
          <Input type='text' />
        </Form.Item>

        <Form.Item
          name="language"
          label="Language"
          rules={[
            {
              required: true,
              message: 'Please select a language',
            },
          ]}
        >
          <select name='' id =''>
            <option value=''>Select Language</option>
            <option value='English'>English</option>
            <option value='Hindi'>Hindi</option>
            <option value='French'>French</option>
            <option value='Spanish'>Spanish</option>
            <option value='Chinese'>Chinese</option>
          </select>
        </Form.Item>  

        <Form.Item
            name= 'releaseDate'
            label = 'Moivie Release Date'
            rules={[
                {
                  required: true,
                  message: 'Please select a language',
                },
              ]}
            >
            <Input type='date'/>
        </Form.Item>

        <Form.Item
            name="genre"
            label="Genre"
            rules={[
              {
                required: true,
                message: 'Please select a genre',
              },
            ]}
            >
            <select name='' id=''>
                <option value=''>Select Genre</option>
                <option value='Action'>Action</option>
                <option value='Adventure'>Adventure</option>
                <option value='Comedy'>Comedy</option>
                <option value='Drama'>Drama</option>
                <option value='Thriller'>Thriller</option>
            </select>
        </Form.Item>

        <Form.Item
            name='poster'
            label='Poster URL'
            >
            <Input type='text'/>
        </Form.Item>

        <div className="flex justify-end gap-2">
            <Button type="primary"  htmlType='submit'>
            Save
            </Button>
            <Button onClick={()=>{
                setshowModal(false);
                setselectMovie(null);
            }}>
            Cancel
            </Button>
        </div>
      </Form>
    </Modal>
  );
}

export default MovieDetailsForm