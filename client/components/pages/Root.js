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
      {
        news[0] 
          ? news.map(article => <li key={article.url}>
            <p>{article.source.name}</p>
            <p>{article.title}</p>
            <img src={article.urlToImage} alt="" width='50%' />
            <h3>{article.description}</h3>
            <a href={article.url}>... Read More</a>
            <p>BY: {article.author}</p>
          </li>) 
          : null
      }

    </div>
  )
}
