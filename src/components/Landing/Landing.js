import React from 'react'
import { withRouter } from 'react-router-dom'
import '../../CSS/Home.scss'

const Home = ({ user }) => (
  <div className="ml-auto home mainbox">
    Thank you for being a GrubClub user. Click My Potlucks from the above menu to manage your potlucks.
  </div>
)

export default withRouter(Home)
