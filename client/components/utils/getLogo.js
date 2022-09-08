import React from 'react'
import CnnLogo from '../../../public/cnn.svg'
import FoxLogo from '../../../public/fox.svg'
import CbsLogo from '../../../public/cbs.svg'
import CnetLogo from '../../../public/cnet.svg'
import WsjLogo from '../../../public/wsj.svg'
import AbcLogo from '../../../public/abcNews.svg'
import UsaTodayLogo from '../../../public/usaToday.svg'
import GoogleNewsLogo from '../../../public/googleNews.svg'
import WpLogo from '../../../public/wp.svg'
import ReutersLogo from '../../../public/reuters.svg'

export const getLogo = function(id, name){
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
  if((id && (id.includes('reuters') )) || name.includes('reuters'))
    return <ReutersLogo />
}