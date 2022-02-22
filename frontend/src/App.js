import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/user/HomeScreen'
import AdminScreen from './screens/admin/AdminScreen'
import RegisterScreen from './screens/user/RegisterScreen'
import LoginScreen from './screens/user/LoginScreen'
import Youtube from './screens/user/Youtube'
import YoutubePlay from './screens/user/YoutubePlay'
import Courses from './screens/user/Courses'
import CourseDetails from './components/CourseDetails'
import About from './screens/user/About'
import RateCalcScreen from './screens/user/RateCalcScreen'
import YoutubeDashboard from './screens/admin/YoutubeDashboard'
import CoursePlay from './screens/user/CoursePlay'

const App = () => {
  return (
    <Router>
      <Header />
      {/* Overflow to disable transverse scrolling */}
      <div style={{ overflow: 'hidden' }}>
        <Route path="/" component={HomeScreen} exact />
        <Route path="/about" component={About} />

        <Route path="/admin" component={AdminScreen} />

        <Route path="/media" component={Youtube} exact />
        <Route path="/youtubes/admin" component={YoutubeDashboard} />
        <Route path="/youtube/:id" component={YoutubePlay} />

        <Route path="/register" component={RegisterScreen} />
        <Route path="/login" component={LoginScreen} />

        <Route path="/ratecalc" component={RateCalcScreen} />

        <Route path="/courses" component={Courses} exact />
        <Route path="/courses/:id" component={CourseDetails} />
        <Route path="/course-play/:id" component={CoursePlay} />
      </div>

      <Footer />
    </Router>
  )
}

export default App
