import React from 'react'
import Meta from '../../components/Meta'
import Youtube from './Youtube'
import Promotion from '../../components/Promotion'
import Courses from '../../screens/user/Courses'

import HomeCalcPart from '../../components/homeCalcPart'

const HomeScreen = () => {
  return (
    <>
      <Meta />
      <Promotion />
      <Youtube offMeta={true} limit="3" />
      <HomeCalcPart />
      <Courses offMeta={true} />
    </>
  )
}

export default HomeScreen
