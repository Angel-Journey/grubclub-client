import React, { Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import '../../CSS/Home.scss'

const unauthenticatedOptions = (
  <div>
    <p className="ml-auto home" >Welcome to GrubClub. Please Sign Up or Sign In to get started.</p>
  </div>
)

const authenticatedOptions = (
  <div>
  </div>
)

const Home = ({ user }) => (
  <Fragment>
    { user ? authenticatedOptions : unauthenticatedOptions }
  </Fragment>
)

export default withRouter(Home)
