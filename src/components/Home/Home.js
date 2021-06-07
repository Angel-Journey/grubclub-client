import React from 'react'
import { withRouter } from 'react-router-dom'
import '../../CSS/Home.scss'

const unauthenticatedOptions = (
  <div>
    <p className="ml-auto home mainbox" >Welcome to GrubClub. Please Sign Up or Sign In to get started.</p>
  </div>
)

const authenticatedOptions = (
  <div>
  </div>
)

const Home = ({ user }) => (
  <div className="home">
    { user ? authenticatedOptions : unauthenticatedOptions }
  </div>
)

export default withRouter(Home)
