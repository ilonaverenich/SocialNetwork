import {useNavigate} from 'react-router-dom';
function Menu() {
  const navigate = useNavigate();

  return (
    <div className='menu'>
            <div className='menu-link'>
                <div onClick={()=>navigate('/')}>Моя страница</div>
                <div onClick={()=>navigate('/friends')}>Друзья</div>
                <div>Сообщения</div>
            </div>
    </div>
  )
}

export default Menu