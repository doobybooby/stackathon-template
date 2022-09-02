import React, { useEffect } from 'react'
import axios from 'axios'
import { getNews } from '../../store/news'
import { useDispatch, useSelector } from 'react-redux'


export const Root = () => {

  const news = useSelector(state => state.news)
  const dispatch = useDispatch()


  useEffect(()=> {
    getNews(dispatch)
    console.log('---', news)
  },[news.length])

  return (
    <div>
      ROOTS
      <ul className='articles-wrapper'>
        {
          news[0] 
            ? news.map(article => (
              <li key={article.url} className='article'>
                <div className='article-header'>
                  <p>{article.source.name}</p>
                  <img src="" alt="NEWS SRC LOGO" />
                  <p>{(article.title)}</p>
                </div>
                <div>
                  <img src={article.urlToImage} alt="" width='50%' />
                  <h3>{article.description}</h3>
                  <a href={article.url}>... Read More</a>
                  <p>BY: {article.author}</p>
                </div>
                {/* <iframe data={article.url}></iframe> */}
                
              </li>)) 
            : <p>loading...</p>
        }

      </ul>

    </div>
  )
}
