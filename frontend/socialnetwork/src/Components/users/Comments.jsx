import {useSelector} from 'react-redux'


function Comments() {
    const comments = useSelector((store) => store.data.mainUser.comments);
    const img = useSelector((store) => store.data.mainUser.image);
    console.log(img)
  return (
    <div>
          <div className='bold'>Лента</div>
        <hr></hr>
          {comments && comments.map(item=><div className='block-newsline'>
       <div className='box-newsline'>
              <div className='icon-newsline'><img width='35px' className='img' height='35px' src={`http://localhost:1000/${img}`} alt="Изображение" /></div> 
                <div className='comment-newsline'> {item.comment}</div>
          </div>        
        </div>)} 

    </div>
  )
}

export default Comments