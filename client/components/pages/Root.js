import React, { useEffect } from 'react'
import { getNews } from '../../store/news'
import { useDispatch, useSelector } from 'react-redux'
import CnnLogo from '../../../public/cnn.svg'
import FoxLogo from '../../../public/fox.svg'
import CbsLogo from '../../../public/cbs.svg'
import CnetLogo from '../../../public/cnet.svg'
import WsjLogo from '../../../public/wsj.svg'
import AbcLogo from '../../../public/abcNews.svg'
import UsaTodayLogo from '../../../public/usaToday.svg'
import GoogleNewsLogo from '../../../public/googleNews.svg'
import WpLogo from '../../../public/wp.svg'

export const Root = () => {

  const news = useSelector(state => state.news)
  const dispatch = useDispatch()

  useEffect(()=> {
    getNews(dispatch)
  },[])

  const getLogo = (id, name) => {
    if(id && id.includes('cnn')) 
      return <CnnLogo />
    if(id && id.includes('cbs')) 
      return <CbsLogo />
    if((id && (id.includes('abc') )) || name.includes('abc'))
      return <AbcLogo />
    if((id && (id.includes('usa') )) || name.includes('usa'))
      return <UsaTodayLogo />
    if((id && (id.includes('cnet') )) || name.includes('cnet'))
      return <CnetLogo />
    if((id && (id.includes('google') )) || name.includes('google'))
      return <GoogleNewsLogo />
    if((id && (id.includes('fox') )) || name.includes('fox'))
      return <FoxLogo />
    if((id && (id.includes('wall') )) || name.includes('wall'))
    return <WsjLogo />
    if((id && (id.includes('washington') )) || name.includes('washington'))
      return <WpLogo />
  }

  return (
    <div>
      <ul className='articles-wrapper'>
        {
          news[0] 
            ? news.map(article => { 
                return article.urlToImage && (
                  <li key={article.url} className={`article ${article.source.name.toLowerCase()} ${article.source.id}`}>
                    <div className='flex-col article-card'>
                      <div className='flex-row article-header'>
                        <div className='flex-col' style={{textAlign:'center', alignItems: 'center'}}>
                          { 
                            getLogo( article.source.id, article.source.name.toLowerCase() )
                              ? getLogo( article.source.id, article.source.name.toLowerCase() )
                              : <h2>{article.source.name}</h2>
                          } 
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
                  </li>
                )}
              )
            : <p>loading...</p>
        }

      </ul>

    </div>
  )
}
