import React, { useEffect } from 'react'
import { getNews } from '../../store/news'
import { useDispatch, useSelector } from 'react-redux'
import CnnLogo from '../../images/logos/cnnLogo.png'
import WPLogo from '../../images/logos/washingtonsPostLogo.png'

export const Root = () => {

  const news = useSelector(state => state.news)
  const dispatch = useDispatch()

  useEffect(()=> {
    getNews(dispatch)
  },[])


  const getLogo = (id, name) => {
    if(id && id.includes('cnn'))
      return CnnLogo
    if(id && id.includes('washington'))
      return WPLogo
  }

  return (
    <div>
      <ul className='articles-wrapper'>
        {
          news[0] 
            ? news.map(article => (
              <li key={article.url} className={`article ${article.source.name.toLowerCase()} ${article.source.id}`}>
                <div className='flex-col article-card'>
                  <div className='flex-row article-header'>
                    <img src={getLogo( article.source.id, article.source.name.toLowerCase() )} alt="NEWS LOGO" />
                    <div className='flex-col' style={{textAlign:'center'}}>
                      <h2>{article.source.name}</h2>
                      <h3>{(article.title.split(' - ')[0])}</h3>
                    </div>
                  </div>
                  <img src={article.urlToImage} with='100%' alt="" />
                  <div className='flex-col article-description'>
                    <p>{article.description}</p>
                    <a href={article.url}>Read More</a>
                    <p>Published At: {new Date(article.publishedAt).toLocaleTimeString()} {new Date(article.publishedAt).toLocaleDateString()}</p>
                    <p>BY: {article.author}</p>
                  </div>
                </div>
              </li>)) 
            : <p>loading...</p>
        }

      </ul>

    </div>
  )
}
