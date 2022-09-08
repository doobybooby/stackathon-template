import React, { useEffect } from 'react'
import { getNews } from '../../store/news'
import { useDispatch, useSelector } from 'react-redux'
import { getLogo } from '../utils/getLogo'

export const Root = () => {

  const news = useSelector(state => state.news)
  const dispatch = useDispatch()

  useEffect(()=> {
    getNews(dispatch)
  },[])

  return (
    <div>
      <ul className='articles-wrapper'>
        {
          news[0] 
            ? news.map(article => { 
              console.log(article.source.name)
                return article.urlToImage && (
                  <li key={article.url} className={`article ${article.source.name.toLowerCase()} ${article.source.id}`}>
                    <div className='flex-col article-card'>
                      <div className='flex-row article-header'>
                        <div className='flex-row' style={{padding:'1rem', alignItems: 'center'}}>
                          { 
                            getLogo( article.source.id, article.source.name.toLowerCase() )
                              ? getLogo( article.source.id, article.source.name.toLowerCase() )
                              : <h2>{article.source.name}</h2>
                          } 
                          <h3 style={{paddingLeft:'1rem'}}>{(article.title.split(' - ')[0])}</h3>
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
                  </li>
                )}
              )
            : <p>loading...</p>
        }

      </ul>

    </div>
  )
}
