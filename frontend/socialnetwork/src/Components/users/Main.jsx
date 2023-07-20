import axios from 'axios';
import {useState, useEffect} from 'react';
import { Input} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import TableMainPage from './TableMainPage';
import Menu from './Menu'
import Header from '../Header';
import Newsline from './Newsline'
import  { setStatusAuth }  from '../../redux/mainReducer';


function Main() {
  const token = localStorage.getItem('token');
  const [data,setData] = useState([])
  const [status,setStatus] = useState(false);
  const [statusData,setStatusData] = useState('');
  const [photo,setPhoto] = useState('');
  const stateEdit = useSelector((store) => store.data.user.stateEdit);
  const contsInfo = useSelector((store) => store.data.userData);
  const state = useSelector((store) => store.data.state);
  const statusAuth = useSelector((store) => store.data.statusAuth);
  const [sta,setSta] = useState(false)
  const dispatch = useDispatch()
  
  useEffect(()=>{
    axios.post('http://localhost:1000/main',{token}).then(res=>setData(res.data));
    },[])

    const date = new Date(data.dateOfBirth);
    const currentDate = new Date();
    const yearsDiff = currentDate.getFullYear() - date.getFullYear();
    console.log(yearsDiff)

    useEffect(()=>{
      const email = data.email;
      if (photo) {
        const formData = new FormData();
        formData.append('img', photo);
        formData.append('email', email);
  
        axios.post('http://localhost:1000/img', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then((res) => {
          setData(res.data)
          
        })
        .catch((err) => {
          console.error(err);
        });
      }
    },[state]) 
   
  function setStatusHandler(){
     setStatus(true)

  }
  function editInfoHandler(){
    setSta(true)   
  }
 async function saveInfoHandler(){
  setSta(false)
  await  axios.post('http://localhost:1000/editprofile',contsInfo).then(res=>setData(res.data))

  }

  function saveHandler(){
    const email = data.email;
    setStatus(false)
  
    axios.post('http://localhost:1000/status',{statusData, email}).then(res=>setData(res.data))
   

  }
  return (
    <div className='personal-page'>
    <Header/>
      <div className='container'>
          <Menu/>      
          <div className='body'>
            <div className='body-content'>
           
            <div className='body-img' >
             
            {data.image ? (
              <img width='200px' height='200px' src={`http://localhost:1000/${data.image}`} alt="Изображение" />
            ):<img width='120px'  src="https://i.postimg.cc/x1FJjZnH/icons8-person-80.png" alt="person" />}
            
            </div>
       
            <div className='body-name'>
           
             <div className='name-person'> {data.name}  { data.surname}, {yearsDiff? yearsDiff:''}  {statusAuth?<span className='active'>online</span>:''} </div>
             
             {!status ?
             <div className='status' onClick={()=>setStatusHandler()}>{(data.status) == "" ?'установите статус': data.status}</div>: <Input onChange={(e)=>setStatusData(e.target.value)} value={statusData} className='input' onBlur={()=>saveHandler()}/>}</div>
        

            </div>  

                {sta? <input type="file" onChange={(e) => setPhoto(e.target.files[0])} />:''}

            <div className='edit-content'>
              <div className='bold block'>Контактная информация</div>
             {sta? <div className='edit' onClick={()=>saveInfoHandler() }>Сохранить изменения</div>: <div className='edit' onClick={()=>editInfoHandler() }>Редактировать профиль</div>}
            </div>
            <hr/>

          {sta ? <TableMainPage data={data} email={data.email}/>:  <table className='table-main'>
      <tr className='tr-main'>
            <td>Ваш пол:</td>
            <td>{!data.gender ? <span className='status'>Заполните информацию</span> : data.gender }</td>
        </tr>
        <tr className='tr-main'>
            <td>Город проживания:</td>
            <td> 
              {!data.cityOfResidence ? <span className='status'>Заполните информацию</span> : data.cityOfResidence }
            </td>
        </tr>
        <tr className='tr-main'>
            <td>Дата рождения:</td>
            <td> 
            {!data.dateOfBirth ? <span className='status'>Заполните информацию</span> : data.dateOfBirth }
            </td>
        </tr>
      

        <tr className='tr-main'>
            <td>Семейное положение:</td>
            <td> 
            {!data.maritalStatus ? <span className='status'>Заполните информацию</span> : data.maritalStatus }
            </td>
        </tr>
        <tr className='tr-main'>
            <td>Место работы: </td>
            <td> 
            {!data.placeOfWork ? <span className='status'>Заполните информацию</span> : data.placeOfWork }
            </td>
        </tr>
        <tr className='tr-main'>
            <td>Интересы, хобби: </td>
            <td>{!data.interests ? <span className='status'>Заполните информацию</span> : data.interests }</td>

        </tr>
    
    </table>}

       <Newsline/>
          
          </div>       
      </div>
    {/*   <div className='footer'>2023, Ilona Verenich</div> */}

    </div>
  )
}

export default Main