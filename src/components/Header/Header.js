import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import '../../CSS/Home.scss'

// removed as a create button now appears when potlucks are indexed
// <Nav.Link href="#create-potluck">Create</Nav.Link>

const authenticatedOptions = (
  <Fragment>
    <Nav.Link href="#index-potlucks">My Potlucks</Nav.Link>
    <Nav.Link href="#index-potlucks-all">All Potlucks</Nav.Link>
    <Nav.Link href="#change-password">Change Password</Nav.Link>
    <Nav.Link href="#sign-out">Sign Out</Nav.Link>
  </Fragment>
)

const unauthenticatedOptions = (
  <Fragment>
    <Nav.Link href="#sign-up">Sign Up</Nav.Link>
    <Nav.Link href="#sign-in">Sign In</Nav.Link>
  </Fragment>
)

// removed Home link from navbar, unnecessary and took up room
// const alwaysOptions = (
//   <Fragment>
//     <Nav.Link href="#/">Home</Nav.Link>
//   </Fragment>
// )
// { alwaysOptions }

const Header = ({ user }) => (
  <Navbar bg="primary" variant="dark" expand="md" sticky="top">
    <Navbar.Brand href="#">
      <p className="logo">GrubClub</p>
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto nav">
        { user && <span className="navbar-text mr-3">Welcome, {user.email}</span>}
        { user ? authenticatedOptions : unauthenticatedOptions }
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)
export default Header
