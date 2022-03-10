import React, { useState } from 'react'
import { Container, Image, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
const Header = () => {
  const [expanded, setExpanded] = useState(false)
  return (
    <>
      <Navbar
        expanded={expanded}
        bg="dark"
        expand="lg"
        variant="dark"
        className="py-3">
        <Container>
          <Navbar.Brand href="/">
            <Image src="/images/logo.png" alt="Ayman Hamouda" />
          </Navbar.Brand>
          <Navbar.Brand href="/">Ayman Hamoda</Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={() => setExpanded(expanded ? false : 'expanded')}
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Link
                onClick={() => setExpanded(expanded ? false : 'expanded')}
                className="text-white p-3"
                to="/">
                {' '}
                <i className="fas fa-home"></i> Home
              </Link>
              <Link
                onClick={() => setExpanded(expanded ? false : 'expanded')}
                className="text-white p-3"
                to="/media">
                <i className="fas fa-play"></i> Media
              </Link>
              <Link
                onClick={() => setExpanded(expanded ? false : 'expanded')}
                className="text-white p-3"
                to="/clinicalpharmacycourses">
                <i className="fas fa-shopping-cart"></i> Courses
              </Link>
              <Link
                onClick={() => setExpanded(expanded ? false : 'expanded')}
                to="/ratecalc"
                className="text-white p-3">
                <i className="fas fa-calculator"></i> Calculator
              </Link>
              <Link
                onClick={() => setExpanded(expanded ? false : 'expanded')}
                className="text-white p-3"
                to="/aymanhamouda">
                {' '}
                <i className="fas fa-user"></i> About
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default Header
