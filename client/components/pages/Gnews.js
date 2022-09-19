import React, { useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getGNews } from '../../store/gnews'

export const Gnews = () => {
  const dispatch = useDispatch()
  const news = useSelector(state => state.gnews)

  useEffect(()=> {
    getGNews(dispatch)
    console.log(news)
  },[])
  return (
    <div>
      <h2>GNEWS</h2>
      {
        news && 
        <>
          {
            (news || []).map(article => <div>
              <h3>{article.title}</h3> 
              <img src={article.image} alt="" width='50%'/>
              <a href={article.url}> {article.url}</a>
              <p>{article.description}</p>
              <p>{article.publishedAt} {article.source.name}</p>

              <p>{article.content}</p>
            </div>
          )}
        </>
      }
    </div>
  )
}
