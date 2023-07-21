import {Input, Select,Radio} from 'antd';
import {useState,useEffect} from 'react';
import axios from 'axios';
import {useDispatch,useSelector} from 'react-redux';
import {setUserData} from '../../redux/mainReducer'



function TableMainPage({email}) {
  const [data,setDatas] = useState([])

  const token = localStorage.getItem('token');

  useEffect(()=>{
    axios.post('http://localhost:1000/main',{token}).then(res=>setDatas(res.data));
    },[]) 

    console.log(data)
  const dispatch = useDispatch()
  const { Option } = Select;
  const RadioButton = Radio.Button;
  const RadioGroup = Radio.Group;
  const [contsInfo, setContsInfo] = useState({

    email: email,
    gender: data.gender,
    cityOfResidence: data.cityOfResidence,
    dateOfBirth: data.dateOfBirth,
    maritalStatus: data.maritalStatus,
    placeOfWork:data.placeOfWork,
    interests: data.interests,
    photo: data.photo

  })
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
 
  return ( 
    <div>
      <table className="edit-table">
      <tbody>
        <tr>
          <td>Выберите пол:</td>
          <td>
            <RadioGroup onChange={handleGenderChange} value={data.gender}   >
              <RadioButton value="мужчина">М</RadioButton>
              <RadioButton value="женщина">Ж</RadioButton>
            </RadioGroup>
          </td>
        </tr>
        <tr>
          <td>Город проживания: </td>
          <td>
            <Input type="text" onChange={handleCityChange} defaultValue={data.cityOfResidence} placeholder={data.cityOfResidence} />
          </td>
        </tr>
        <tr>
          <td>Дата рождения</td>
          <td>
            <Input type="date" onChange={handleDateOfBirthChange} value = {data.dateOfBirth} />
          </td>
        </tr>
        <tr>
          <td>Семейное положение:</td>
          <td>
            <Select className='select' onChange={handleMaritalStatusChange} value={contsInfo.maritalStatus} defaultValue={contsInfo.maritalStatus}>
              <Option value="Не замужем\Не женат">Не замужем (Не женат)</Option>
              <Option value="Замужем\Женат">Замужем (Женат)</Option>
              <Option value="Ищу друга\подругу">Ищу друга (подругу)</Option>
            </Select>
          </td>
        </tr>
        <tr>
          <td>Место работы: </td>
          <td>
            <Input type="text" onChange={handlePlaceOfWorkChange} value={contsInfo.placeOfWork} placeholder={data.placeOfWork}  />
          </td>
        </tr>
        <tr>
          <td>Интересы, хобби:</td>
          <td>
            <Input type="text" onChange={handleInterestsChange} value={contsInfo.interests} placeholder={data.interests} />
          </td>
        </tr>

      </tbody>
    </table>


      

    </div>
  )
}

export default TableMainPage