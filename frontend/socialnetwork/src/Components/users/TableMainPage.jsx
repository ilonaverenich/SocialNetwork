import {Input, Select,Radio} from 'antd';
import {useState,useEffect} from 'react';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {setUserData} from '../../redux/mainReducer'



function TableMainPage({email}) {
  const [contsInfo,setContsInfo] = useState([])


  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.post('http://localhost:1000/main', { token }).then((res) => {

      if (res.data) {
        setContsInfo({
          ...contsInfo,
          email:email,
          gender: res.data.gender || '', 
          cityOfResidence: res.data.cityOfResidence || '',
          dateOfBirth: res.data.dateOfBirth || '',
          maritalStatus: res.data.maritalStatus || '',
          placeOfWork: res.data.placeOfWork || '',
          interests: res.data.interests || '',
        });
      }
    });
  }, []);

  const dispatch = useDispatch()
  const { Option } = Select;
  const RadioButton = Radio.Button;
  const RadioGroup = Radio.Group;
 

  useEffect(()=>{
   dispatch(setUserData(contsInfo))
   
  })


  const handleGenderChange = (e) => {
    setContsInfo({ ...contsInfo, gender: e.target.value });
  };

  const handleCityChange = (e) => {
    setContsInfo({ ...contsInfo, cityOfResidence: e.target.value });
  };

  const handleDateOfBirthChange = (e) => {
    setContsInfo({ ...contsInfo, dateOfBirth: e.target.value });
  };

  const handleMaritalStatusChange = (value) => {
    setContsInfo({ ...contsInfo, maritalStatus: value });
  };

  const handlePlaceOfWorkChange = (e) => {
    setContsInfo({ ...contsInfo, placeOfWork: e.target.value });
  };

  const handleInterestsChange = (e) => {
    setContsInfo({ ...contsInfo, interests: e.target.value });
  };
  const handlePhotoChange = (e) => {
    setContsInfo({ ...contsInfo, photo: e.target.files[0] });
  };
 
  return ( 
    <div>
     Изменить фото: <input type="file"  onChange={handlePhotoChange}  />
      <table className="edit-table">
      <tbody>
        <tr>
          <td>Выберите пол:</td>
          <td>
            <RadioGroup onChange={handleGenderChange} value={contsInfo.gender}   >
              <RadioButton value="мужчина">М</RadioButton>
              <RadioButton value="женщина">Ж</RadioButton>
            </RadioGroup>
          </td>
        </tr>
        <tr>
          <td>Город проживания: </td>
          <td>
            <Input type="text" onChange={handleCityChange } defaultValue={contsInfo.cityOfResidence} placeholder={contsInfo.cityOfResidence} />
          </td>
        </tr>
        <tr>
          <td>Дата рождения</td>
          <td>
            <Input type="date" onChange={handleDateOfBirthChange} placeholder = {contsInfo.dateOfBirth} />
          </td>
        </tr>
        <tr>
          <td>Семейное положение:</td>
          <td>
            <Select className='select' onChange={handleMaritalStatusChange} placeholder={contsInfo.maritalStatus}>
              <Option value="Не замужем\Не женат">Не замужем (Не женат)</Option>
              <Option value="Замужем\Женат">Замужем (Женат)</Option>
              <Option value="Ищу друга\подругу">Ищу друга (подругу)</Option>
            </Select>
          </td>
        </tr>
        <tr>
          <td>Место работы: </td>
          <td>
            <Input type="text" onChange={handlePlaceOfWorkChange}  placeholder={contsInfo.placeOfWork}  />
          </td>
        </tr>
        <tr>
          <td>Интересы, хобби:</td>
          <td>
            <Input type="text" onChange={handleInterestsChange}placeholder={contsInfo.interests} />
          </td>
        </tr>

      </tbody>
    </table>


      

    </div>
  )
}

export default TableMainPage