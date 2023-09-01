import {useNavigate} from 'react-router-dom';
function Menu() {
  const navigate = useNavigate();

  return (
    <div className='menu'>
            <div className='menu-link'>
                <div onClick={()=>navigate('/')}>Моя страница</div>
                <div onClick={()=>navigate('/friends')}>Друзья</div>
                <div onClick={()=>navigate('/message')}>Сообщения</div>
                <div onClick={()=>navigate('/news')}>Новости</div>
                <div onClick={()=>navigate('/game')}>Развлечения</div>
                
            </div>
    </div>
  )
}

export default Menu