import {useDispatch, useSelector} from 'react-redux';
import Header from '../Header';
import Menu from './Menu';
import Comments from './Comments'


function User() {

 const userData = useSelector((store) => store.data.mainUser);
 console.log(userData)
  return (
    <div className='personal-page'>
        <Header/>
        <div className='container'>
            <Menu/>
            <div className='body'>
            <div className='body-content'>
           
           <div className='body-img' >
            
           {userData.image ? (
             <img width='200px' height='200px' src={`http://localhost:1000/${userData.image}`} alt="Изображение" />
           ):<img width='120px'  src="https://i.postimg.cc/x1FJjZnH/icons8-person-80.png" alt="person" />}
           
           </div>
      
           <div className='body-name'>
          
            <div className='name-person'> {userData.name}  { userData.surname} </div>
            
            <div>{userData.status}</div>
            </div>

           </div> 

           <div className='edit-content'>
              <div className='bold block'>Контактная информация</div>
             

            </div> 
            <hr />

             <table className='table-main'>
      <tr className='tr-main'>
            <td>Пол:</td>
            <td>{userData.gender }</td>
        </tr>
        <tr className='tr-main'>
            <td>Город проживания:</td>
            <td> 
              {userData.cityOfResidence }
            </td>
        </tr>
        <tr className='tr-main'>
            <td>Дата рождения:</td>
            <td> 
            {userData.dateOfBirth }
            </td>
        </tr>
      

        <tr className='tr-main'>
            <td>Семейное положение:</td>
            <td> 
            {userData.maritalStatus }
            </td>
        </tr>
        <tr className='tr-main'>
            <td>Место работы: </td>
            <td> 
            {userData.placeOfWork }
            </td>
        </tr>
        <tr className='tr-main'>
            <td>Интересы, хобби: </td>
            <td>{userData.interests }</td>

        </tr>
    
    </table> 
    <Comments/>
            </div>
          
        </div>
        

    </div>
  )
}

export default User