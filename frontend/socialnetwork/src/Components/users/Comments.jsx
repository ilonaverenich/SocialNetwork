import {useSelector} from 'react-redux'


function Comments() {

    const data = useSelector((store) => store.data.mainUser);
    const comments = useSelector((store) => store.data.mainUser.comments);
    const img = useSelector((store) => store.data.mainUser.image);
    console.log(img)
  return (
    <div>
      <div className='bold'>Лента</div>
        <hr></hr>
        <div className='content-newsline'>
              {comments && comments.map(item => (
          <div className='content-newsline-post' key={item.postId}>
            <div className='posts'>
                <div className='post-header'>
                <div className='post-header-logo'> 
                      {data.image && <img width='50px' height='50px' src={`http://localhost:1000/${data.image}`} alt="Изображение" />}  
                </div>
                      <div className='post-header-body'>
                      
                        <div className='post-body-name'>
                                {data.name} {data.surname}  <span className='post-body-email'>@{(data.email).slice(0,8)}</span> 
                        </div>
                       
                      
                        <div className='post-time-edit'> 
                        <div className='post-time-delete'>
                          
                          <div>{item.timestamp.slice(8,10)}.{item.timestamp.slice(5,7)}.20{item.timestamp.slice(2,4)}</div>
                          <div>{item.timestamp.slice(11,16)}</div>

                      </div>
                        
                          </div>
                      </div>
                </div>
                <div className='post-body-comment'>{item.comment}</div>
                <div className='post-body'>
                {item.image ? <img  className='post-body-img' src={`http://localhost:1000/${item.image}`} alt="Изображение" /> :''}
                </div>

                <div className='post-footer'>
                <div className='post-footer-comment'>комментировать</div>
                <div><img className='post-footer-like' src="https://i.postimg.cc/PrQMYBwy/icons8-like-30.png" alt="" /></div>
                </div>

              </div>
          
              <div >
    
            </div>
          </div>
        ))} 
          
      </div>

    </div>
  )
}

export default Comments