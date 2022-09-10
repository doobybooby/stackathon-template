export const displayTimeDifference = (blogCreatedAt)=> {
  const currentTime = new Date()

  const timeDiff = ( currentTime.getTime() - new Date(blogCreatedAt) )/1000
  const seconds = Math.floor(timeDiff % 60)
  const minutes = Math.floor( timeDiff / 60)%60
  const hours = Math.floor(Math.floor(( timeDiff / 60) ) /60)%24
  const days = Math.floor(Math.floor(Math.floor( timeDiff / 60) /60) /24 )
  const mins = Math.floor((Math.floor((Math.abs(currentTime - timeDiff))/1000)/60)%60) 

  if(days > 0)
    return `${days} DAYS AGO`
  else if(hours > 0)
    return `${hours} HOURS AGO`
  else if(mins > 0)
    return `${minutes} MINS AGO`
  else return `${seconds} SECS AGO`
}
