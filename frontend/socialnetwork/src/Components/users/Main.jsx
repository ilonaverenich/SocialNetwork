import axios from 'axios';
import {useState, useEffect} from 'react';
import { Input, Button } from 'antd';
import {useSelector, useDispatch} from 'react-redux';
import TableMainPage from './TableMainPage';
import Menu from './Menu'
import Header from '../Header';
import Newsline from './Newsline';
import ModalWindow from '../ModalWindow';
import {setVisibleModal} from '../../redux/mainReducer'

function Main() {
  const token = localStorage.getItem('token');
  const dispatch = useDispatch()
  const [data,setData] = useState([])
  const [status,setStatus] = useState(false);
  const [statusData,setStatusData] = useState('');
  const contsInfo = useSelector((store) => store.data.userDatas);
  const isVisibleModal = useSelector((store) => store.data.isVisibleModal);

  const [sta,setSta] = useState(false)
  /* const [isModalVisible, setIsModalOpen] = useState(false); */
  
  useEffect(()=>{
    setTimeout(()=>{ axios.post('http://localhost:1000/main',{token}).then(res=>setData(res.data))},500)
    console.log(data)
    },[])

    const date = new Date(data.dateOfBirth);
    const currentDate = new Date();
    const yearsDiff = currentDate.getFullYear() - date.getFullYear();
    
   
  function setStatusHandler(){
     setStatus(true)
  }
  function editInfoHandler(){
    setSta(true)   
  }
   function saveInfoHandler(){
  setSta(false)


  const formData = new FormData();
 
  formData.append('email',  contsInfo.email )
  formData.append('gender',  contsInfo.gender)
  formData.append('cityOfResidence',  contsInfo.cityOfResidence)
  formData.append('dateOfBirth', contsInfo.dateOfBirth) 
  formData.append('maritalStatus', contsInfo.maritalStatus)
  formData.append('placeOfWork', contsInfo.placeOfWork)
  formData.append('interests', contsInfo.interests)
  formData.append('photo', contsInfo.photo)


  axios.post('http://localhost:1000/editprofile',formData,{
     headers: {
       'Content-Type': 'multipart/form-data'
     }
   
  }).then(res=>setData(res.data))  }

  function saveHandler(){
    const email = data.email;
    setStatus(false)
    axios.post('http://localhost:1000/status',{statusData, email}).then(res=>setData(res.data))
  }

  const showModal = () => {
    dispatch(setVisibleModal(true))
  };

     
  return (
    <div>
      {data && data.length === 0 ? (<div class="load">
    <hr/><hr/><hr/><hr/>
    </div>):  <div className='personal-page'>
    <Header/>
      <div className='container'>
          <Menu/>      
          <div className='body'>
            <div className='body-content'>
            <div className='body-img' >
             
             {data && data.image ? (
              <img  onClick={showModal}  width='50%' height='100%' className='body-img-logo'  src={`http://localhost:1000/${data && data.image}`} alt="Изображение" />
            ):<img width='120px'  src="https://i.postimg.cc/x1FJjZnH/icons8-person-80.png" alt="person" />} 
          {isVisibleModal && <ModalWindow data={data}/>} 
        
            </div>
           
            <div className='body-name'>
           
             <div className='name-person'> {data.name}  {data.surname}  {yearsDiff? yearsDiff:''}   {data.active?<span className='active-status online'></span>:<span className=' active-status offline'></span>}</div>
             
             {!status ?
             <div className='status' onClick={()=>setStatusHandler()}>{(data.status) == "" ?'установите статус': data.status}</div>: <Input onChange={(e)=>setStatusData(e.target.value)} value={statusData} className='input' onBlur={()=>saveHandler()}/>}</div>
            </div>  

               {/*  {sta? <input type="file" onChange={(e) => setPhoto(e.target.files[0])} />:''} */}

            <div className='edit-content'>
              <div className='bold block'>Контактная информация</div>
             {sta? <div className='edit' onClick={()=>saveInfoHandler() }>Сохранить изменения</div>: <div className='edit' onClick={()=>editInfoHandler() }>Редактировать профиль</div>}
            </div>
            <hr/>

          {sta ? <TableMainPage data={data} email={data.email}/>:  <table className='table-main'>
      <tr className='tr-main'>
            <td>Ваш пол:</td>
            <td>{data.gender =='' ? <span className='status'>Заполните информацию</span> : data.gender}</td>
        </tr>
        <tr className='tr-main'>
            <td>Город проживания:</td>
            <td> 
              {data.cityOfResidence =='' ? <span className='status'>Заполните информацию</span> : data.cityOfResidence }
            </td>
        </tr>
        <tr className='tr-main'>
            <td>Дата рождения:</td>
            <td> 
            {data.dateOfBirth =='' ? <span className='status'>Заполните информацию</span> :data.dateOfBirth }
            </td>
        </tr>
      

        <tr className='tr-main'>
            <td>Семейное положение:</td>
            <td> 
            {data.maritalStatus =='' ? <span className='status'>Заполните информацию</span> : data.maritalStatus }
            </td>
        </tr>
        <tr className='tr-main'>
            <td>Место работы: </td>
            <td> 
            {data.placeOfWork ==''? <span className='status'>Заполните информацию</span> :data.placeOfWork }
            </td>
        </tr>
        <tr className='tr-main'>
            <td>Интересы, хобби: </td>
            <td>{data.interests=='' ? <span className='status'>Заполните информацию</span> : data.interests }</td>

        </tr>
    
    </table>}

       <Newsline/>
          
          </div>       
      </div>
   

      </div> }
   
   
    </div>
  )
}

export default Main