import React, { useEffect, useState } from 'react';
import { useDispatch } from'react-redux';
import  moment  from 'moment';
import { message, Table, Button } from 'antd';
import { EditOutlined,DeleteOutlined } from '@ant-design/icons';
import { hideLoading, showLoading } from '../store/loaderSlice';
import MovieDetailsForm from './MovieDetailsForm';
import { GetMovie, DeleteMovie } from '../apicalls/movies';

function MovieLists() {
    const [movies, setMovies ] = useState([]);
    const [showModal, setshowModal] = useState(false);
    const [selectMovie, setselectMovie] = useState(null);
    const [formType,setformType] = useState('add');
    const dispatch = useDispatch();

    
    useEffect(() => {
        getData();
    },[]);

    const getData = async () => {
        try {
            dispatch(showLoading());
            const response = await GetMovie();
            if(response.success) {
                setMovies(response.data);
            } else {
                message.error(response.message);
            }
            dispatch(hideLoading());
        }catch (error){
            
            dispatch(hideLoading());
            message.error(error.message);
        }
    };

    const handleDelete = async (movieId) => {
        try {
            console.log(movieId);
            dispatch(showLoading());
            const response = await DeleteMovie(movieId);
            if(response.success) {
                message.success(response.message);
                getData();
            } else {
                message.error(response.message);
            }
            dispatch(hideLoading());
        }catch (error){
            dispatch(hideLoading());
            message.error(error.message);
        }
    };

    const columns = [
        {title: 'Poster',dataIndex: 'poster',
            render: (text, record) => (
              <img alt="poster" style={{ width: 50, height: 100 }} src={record.poster} />
            ),
        },
        {title: 'Name',dataIndex: 'title',},
        {title: 'Description',dataIndex: 'description',},
        {title: 'Duration( mins)',dataIndex: 'duration',},
        {title: 'Genre',dataIndex: 'genre',},
        {title: 'Language',dataIndex: 'language',},
        {title: 'Release Date',dataIndex: 'releasedate',
            render: (text, record) => {
            return moment(record.releaseDate).format('DD-MM-YYYY');
          },
        },
        {title: 'Action',dataIndex: 'action',
            render: (text, record) => {
                return (
                    <div className='flex'>
                        <Button className = 'mx-1' size='large' icon={<EditOutlined />}title= 'edit' type="primary" onClick={() => {
                            setshowModal(true);
                            setformType('edit');
                            setselectMovie(record);
                        }}/>
                        <Button className = 'mx-1' size='large' icon={<DeleteOutlined />}title= 'delete' type="primary" onClick={() => {handleDelete(record._id)}}/>
                    </div>
                )
            }
        },
    ];

  return (
    <div>
        <div className ='flex justify-end m-1'>
            <Button title='Add Movie' type="primary"  
                    onClick = {() => {
                        setshowModal(true);
                        setformType('add')
                    }}
            >
            Add Movie
            </Button>    
        </div>
        <Table columns={columns} dataSource={movies} />

        {showModal && (
            <MovieDetailsForm
            showModal = {showModal}
            setshowModal = {setshowModal}
            selectMovie = {selectMovie}
            setselectMovie = {setselectMovie}
            formType = {formType}
            getData = {getData}
            />
        )}
    </div>
  )
}

export default MovieLists