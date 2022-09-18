import React, { useEffect, useState } from 'react'
import { getNews } from '../../store/news'
import { useDispatch, useSelector } from 'react-redux'
import { getLogo } from '../utils/getLogo'
import { Popup } from '../Popup'
import { BsFillShareFill } from 'react-icons/bs'
import { FiExternalLink } from 'react-icons/fi'
import axios from 'axios'

export const Root = () => {

  const news = useSelector(state => state.news)
  const dispatch = useDispatch()
  const [shouldPopUp, setShouldPopUp] = useState(false)
  const [articleUrl, setArticleUrl ] = useState('')
  
  useEffect(()=> {
    getNews(dispatch)
  },[])

  const newsToBlog = (article) => {
    setArticleUrl(article.url)
    setShouldPopUp(true)
  }

  const fetchNewsFromBackend = async() => {
    const response = await axios.get('/api/news')
    console.log('from the front end', response)
    
  }

  return (
    <div style={{ paddingTop:'5rem' }}>
      <button onClick={fetchNewsFromBackend}>FETCH NEWS FROM BACKEND</button>
      <h1 style={{ textAlign:'center'}}>LATEST NEWS</h1>
      <ul className='articles-wrapper'>
        {
          news[0] 
            ? news.map( article => { 
              // console.log(article.source)
                return article.urlToImage && (
                  <li key={article.url} className={`article ${article.source.name.toLowerCase()} ${article.source.id}`}>
                    <div className='flex-col article-card'>
                      <div className='flex-row article-header'>
                        <div className='flex-row' style={{ padding:'1rem', alignItems: 'center' }}>
                          { 
                            getLogo( article.source.id, article.source.name.toLowerCase() )
                              ? getLogo( article.source.id, article.source.name.toLowerCase() )
                              : <h2>{article.source.name}</h2>
                          } 
                          <h3 style={{ paddingLeft:'1rem' }}>{( article.title.split(' - ')[0] )}</h3>
                          <BsFillShareFill size={'2.5rem'} onClick={()=>newsToBlog(article)} />
                        </div>
                      </div>
                      <img src={article.urlToImage} with='100%' alt="" />
                      <div className='flex-col article-description'>
                        <p>{article.description}</p>
                        <p>Published At: { new Date(article.publishedAt).toLocaleTimeString() }{ new Date(article.publishedAt).toLocaleDateString() }</p>
                        <p>BY: {article.author}</p>
                        <div id='link-to-articleUrl' className='flex-row flex-center'>
                          <a target='_blank' style={{ color:'white'}} href={article.url}>Read More <FiExternalLink size={'1rem'}/></a>
                        </div>
                      </div>
                      {/* <BsFillShareFill size={'2rem'} onClick={()=>newsToBlog(article)} style={{ alignSelf:'flex-start' }} /> */}
                    </div>
                    <Popup trigger={shouldPopUp}  setTrigger={setShouldPopUp} articleUrl={articleUrl} >
                    </Popup>
                  </li>
                )}
              )
            : <p>loading...</p>
        }
      </ul>
    </div>
  )
}
