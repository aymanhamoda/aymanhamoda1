import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import YoutubeNew from '../../components/admin/YoutubeNew'

const YoutubeDashboard = () => {
  const history = useHistory()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo) {
      history.push('/')
    }
  }, [userInfo])

  return (
    <div>
      <YoutubeNew />
    </div>
  )
}

export default YoutubeDashboard
