import axios from 'axios';
import {useState, useEffect} from 'react';
import { Input} from 'antd';
import {useSelector} from 'react-redux';
import TableMainPage from './TableMainPage';
import Menu from './Menu'
import Header from '../Header';
import Newsline from './Newsline';



function Main() {
  const token = localStorage.getItem('token');
  const [data,setData] = useState([])
  const [status,setStatus] = useState(false);
  const [statusData,setStatusData] = useState('');
  const [photo,setPhoto] = useState('');
  const contsInfo = useSelector((store) => store.data.userData);
  const state = useSelector((store) => store.data.state);
  const statusAuth = useSelector((store) => store.data.statusAuth);
  const [sta,setSta] = useState(false)
  
  useEffect(()=>{
    setTimeout(()=>{ axios.post('http://localhost:1000/main',{token}).then(res=>setData(res.data))},500)
    console.log(data)
    },[])

  const date = new Date(data.dateOfBirth);
    const currentDate = new Date();
    const yearsDiff = currentDate.getFullYear() - date.getFullYear();
    

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
              <img width='230px' height='230px' className='body-img-logo' src={`http://localhost:1000/${data && data.image}`} alt="Изображение" />
            ):<img width='120px'  src="https://i.postimg.cc/x1FJjZnH/icons8-person-80.png" alt="person" />}
            
            </div>
           
            <div className='body-name'>
           
             <div className='name-person'> {data&& data.name}  {data&& data.surname}  {yearsDiff? yearsDiff:''}   {statusAuth?<span className='active'>online</span>:''} </div>
             
             {!status ?
             <div className='status' onClick={()=>setStatusHandler()}>{(data&& data.status) == "" ?'установите статус': data&& data.status}</div>: <Input onChange={(e)=>setStatusData(e.target.value)} value={statusData} className='input' onBlur={()=>saveHandler()}/>}</div>
        

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
            <td>{data&&!data.gender ? <span className='status'>Заполните информацию</span> :data&& data.gender }</td>
        </tr>
        <tr className='tr-main'>
            <td>Город проживания:</td>
            <td> 
              {data&&!data.cityOfResidence ? <span className='status'>Заполните информацию</span> :data&& data.cityOfResidence }
            </td>
        </tr>
        <tr className='tr-main'>
            <td>Дата рождения:</td>
            <td> 
            {data&&!data.dateOfBirth ? <span className='status'>Заполните информацию</span> :data&& data.dateOfBirth }
            </td>
        </tr>
      

        <tr className='tr-main'>
            <td>Семейное положение:</td>
            <td> 
            {data&&!data.maritalStatus ? <span className='status'>Заполните информацию</span> :data&& data.maritalStatus }
            </td>
        </tr>
        <tr className='tr-main'>
            <td>Место работы: </td>
            <td> 
            {data&&!data.placeOfWork ? <span className='status'>Заполните информацию</span> :data&& data.placeOfWork }
            </td>
        </tr>
        <tr className='tr-main'>
            <td>Интересы, хобби: </td>
            <td>{data&&!data.interests ? <span className='status'>Заполните информацию</span> :data&& data.interests }</td>

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