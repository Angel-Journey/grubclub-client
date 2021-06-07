import React from 'react'
import { withRouter } from 'react-router-dom'
import '../../CSS/Home.scss'

const Home = ({ user }) => (
  <div className="ml-auto home mainbox">
    Thank you for being a GrubClub user. Select My Potlucks to begin.
  </div>
)

export default withRouter(Home)
