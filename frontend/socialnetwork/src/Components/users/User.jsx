import {useSelector, useDispatch} from 'react-redux';
import Header from '../Header';
import Menu from './Menu';
import Comments from './Comments';
import { setVisibleModal } from '../../redux/mainReducer';
import ModalWindow from '../ModalWindow'



function User() {
  const dispatch = useDispatch()
 const userData = useSelector((store) => store.data.mainUser);
 const isVisibleModal = useSelector((store) => store.data.isVisibleModal);
 console.log(userData)
 const showModal = () => {
  dispatch(setVisibleModal(true))
};


  return (
    <div className='personal-page'>
        <Header/>
        <div className='container'>
            <Menu/>
            <div className='body'>
            <div className='body-content'>
           
           <div className='body-img' >
            
           {userData.image ? (
             <img  onClick={showModal}  className='body-img-logo' src={`http://localhost:1000/${userData.image}`} alt="Изображение" />
           ):<img width='120px'  src="https://i.postimg.cc/x1FJjZnH/icons8-person-80.png" alt="person" />}
            {isVisibleModal && <ModalWindow data={userData}/>} 
           </div>
      
           <div className='body-name'>
          
            <div className='name-person'> {userData.name}  { userData.surname}  {userData.active?<span className='active-status online'></span>:<span className=' active-status offline'></span>}</div>
            
            <div className='body-status'>{userData.status}</div>
            </div>

           </div> 

           <div className='edit-content'>
              <div className='bold block'>Контактная информация</div>
             

            </div> 
            <hr />

             <table className='table-main'>
             {userData.gender?<tr className='tr-main'>
            <td>Пол:</td>
            <td>{userData.gender }</td>
        </tr>:''}

        {userData.cityOfResidence?<tr className='tr-main'>
            <td>Город проживания:</td>
            <td> 
              {userData.cityOfResidence }
            </td>
        </tr>:''}

        
        {userData.dateOfBirth? <tr className='tr-main'>
            <td>Дата рождения:</td>
            <td> 
            {userData.dateOfBirth }
            </td>
        </tr>:''}

        {userData.maritalStatus?<tr className='tr-main'>
            <td>Семейное положение:</td>
            <td> 
              {userData.maritalStatus }
            </td>
        </tr>:''}
        {userData.placeOfWork? <tr className='tr-main'>
            <td>Место работы: </td>
            <td> 
            {userData.placeOfWork }
            </td>
        </tr>:''}

        {userData.interests? <tr className='tr-main'>
            <td>Интересы, хобби: </td>
            <td>{userData.interests }</td>
        </tr>:''}

    </table> 
    <Comments user={userData}/>
            </div>
          
        </div>
        

    </div>
  )
}

export default User