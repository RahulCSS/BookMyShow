// import React, { useEffect, useState } from 'react';
// import { useDispatch } from'react-redux';
// import  moment  from 'moment';
// import { message, Table, Button } from 'antd';
// import { EditOutlined,DeleteOutlined } from '@ant-design/icons';
// import { hideLoading, showLoading } from '../store/loaderSlice';
// import MovieForm from './MovieForm';
// import { GetMovie, DeleteMovie } from '../apicalls/movies';

// function MovieList() {
//     const [movies, setMovies ] = useState([]);
//     const [showModal, setshowModal] = useState(false);
//     const [selectMovie, setselectMovie] = useState(null);
//     const [formType,setformType] = useState('add');
//     const dispatch = useDispatch();

//     const getData = async () => {
//         try {
//             dispatchEvent(showLoading());
//             const response = await GetMovie();
//             if(response.success) {
//                 setMovies(response.data);
//             } else {
//                 message.error(response.message);
//             }
//             dispatchEvent(hideLoading());
//         }catch (error){
//             dispatchEvent(hideLoading());
//             message.error(error.message);

//         }
//     };

//     const handleDelete = async (movieId) => {
//         try {
//             dispatchEvent(showLoading());
//             const response = await DeleteMovie(movieId);
//             if(response.success) {
//                 message.success(response.message);
//                 getData();
//             } else {
//                 message.error(response.message);
//             }
//             dispatchEvent(hideLoading());
//         }catch (error){
//             dispatchEvent(hideLoading());
//             message.error(error.message);
//         }
//     }

//     useEffect(() => {
//         getData();
//     },[]);
//     const moviesdata = [
//         {
//           key: '1',
//           name: 'Mike',
//           age: 32,
//           address: '10 Downing Street',
//         },
//         {
//           key: '2',
//           name: 'John',
//           age: 42,
//           address: '10 Downing Street',
//         },
//       ];
      
//       const columns = [
//         {
//             title: 'Poster',
//             dataIndex: 'poster',
//             render: (text, record) => (
//               <img alt="poster" style={{ width: 50, height: 100 }} src={record.poster} />
//             ),

//         },
//         {
//           title: 'Name',
//           dataIndex: 'name',
//         },
//         {
//           title: 'Description',
//           dataIndex: 'description',
//         },
//         {
//           title: 'Duration',
//           dataIndex: 'duration',
//         },
//         {
//           title: 'Genre',
//           dataIndex: 'genre',
//         },
//         {
//           title: 'Language',
//           dataIndex: 'language',
//         },
//         {
//           title: 'Release Date',
//           dataIndex: 'releasedate',
//           render: (text, record) => {
//             return moment(record.releaseDate).format('DD-MM-YYYY');
//           },
//         },
//         {
//             title: 'Action',
//             dataIndex: 'action',
//             render: (text, record) => {
//                 return (
//                     <div className='flex'>
//                         <Button className = 'mx-1' size='large' icon={<EditOutlined />}title= 'edit' type="primary" onClick={() => {
//                             setshowModal(true);
//                             setformType('edit');
//                             setselectMovie(record);
//                         }}/>
//                         <Button className = 'mx-1' size='large' icon={<DeleteOutlined />}title= 'delete' type="primary" onClick={() => {handleDelete(record._id)}}/>
//                     </div>
//                 )
//             }
//         },
//       ];
      

//   return (
//     <div>
//         <div className ='flex justify-end m-1'>
//             <Button title='Add Movie' type="primary"  
//                     onClick = {() => {
//                         setshowModal(true);
//                         setformType('add')
//                     }}
//             >
//             Add Movie
//             </Button>    
//         </div>
//         <Table columns={columns} dataSource={moviesdata} />

//         {showModal && (
//             <MovieForm
//             showModal = {showModal}
//             setshowModal = {setshowModal}
//             selectMovie = {selectMovie}
//             setselectMovie = {setselectMovie}
//             formType = {formType}
//             getData = {getData}
//             />
//         )}
//     </div>
//   )
// }

// export default MovieList;