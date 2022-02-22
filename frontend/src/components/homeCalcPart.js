import React from 'react'
import { Image, Row, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
const homeCalcPart = () => {
  return (
    <div className=" bg-light">
      <Container>
        <Row>
          <div className="col-md-6 py-5 align-self-center">
            <h3>Infusion rate converter</h3>
            <p className="lead">
              Now, you can predict any infusion rate in your ICU, just input the
              rate you want/see in my calculator and get the corresponding rate.
            </p>
            <div>
              <Link className="btn btn-primary" to="/ratecalc">
                Try now for FREE
              </Link>
            </div>
          </div>
          <div className="col-md-6 text-center py-5">
            <Image
              className="img-fluid rounded-circle"
              src="/uploads/images/app.jpg"
              fluid
            />
          </div>
        </Row>
      </Container>
    </div>
  )
}

export default homeCalcPart
