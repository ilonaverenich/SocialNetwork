import Menu from "../users/Menu"
import Header from "../Header"
import axios from "axios"
import {useState, useEffect} from 'react'

function NewsPage() {
  const [data,setData] = useState(null)

  useEffect(()=>{
    axios.get('http://localhost:1000/news').then(res=> setData(res.data))
 
  },[])

   console.log(data)
  return (
    <div className='personal-page'>
    <Header />
    <div className='container'>
      <Menu />
      <div className='body news-body '>
             {data && data.map(user=><p>{user.comments.map(el=><div className="post-news">
              
              <div className="post-news-item"><img className="news-logo" width='40px' height='40px' src={`http://localhost:1000/${user.image}`}></img>
          
            {el.name ? <div> На странице <span className="post-news-item-name"> { user.name} { user.surname} </span>написали</div>:<div><span className="post-news-item-name"> { user.name} { user.surname}</span> разместил(-а) новую запись</div>}
            
            </div>
             <div className="post-news-item-posts">  {el.name? <div className="posts-news-item">
             <img className="news-logo" width='40px' height='40px' src={`http://localhost:1000/${el.logo}`}></img> 
             <b>{el.name} {el.surname}</b> <i>{el.comment}</i>
             </div>
             : 
             <div className="posts-news">
             <p className="news-comment"> 
             {el.comment} 
             </p>
              {el.image  ? <img className="photo" width='35%' height='35%' src={`http://localhost:1000/${el.image}`}>
              </img>:''}
              </div>}
              </div>
             </div>)}</p>)}
             
  
      </div>
    </div>
  </div>
  )
}

export default NewsPage