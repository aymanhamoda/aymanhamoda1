import React, { useState, useEffect } from 'react'
import { Typeahead } from 'react-bootstrap-typeahead'
import {
  Form,
  Row,
  Col,
  Container,
  FormGroup,
  Button,
  FormLabel,
  Alert,
  ButtonToolbar,
} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Meta from '../../components/Meta'
import drugs from '../../data/drugs'
import rateUnits from '../../data/rateUnits'
import FilePreview from '../../components/FilePreview'

const RateCalc = () => {
  let answer = ''

  const [drug, setDrug] = useState('')
  const [weight, setWeight] = useState('')
  const [inputRateUnit, setInputRateUnit] = useState('')
  const [outputRateUnit, setOutputRateUnit] = useState('')
  const [ampNo, setAmpNo] = useState('')
  const [totalVolume, setTotalVolume] = useState('')
  const [rate, setRate] = useState('')
  const [mgContent, setMgContent] = useState('')
  const [finalAnswer, setFinalAnswer] = useState('')

  const [show, setShow] = useState(false)
  const [showResult, setShowResult] = useState(false)

  const handleClose = () => {
    setShow(false)
  }

  const calc = () => {
    if (
      !rate ||
      !inputRateUnit ||
      !outputRateUnit ||
      !weight ||
      !ampNo ||
      !totalVolume ||
      !drug
    ) {
      alert('all cells are required')
    } else {
      setShowResult(true)
    }
  }
  const Reset = () => {
    window.location.reload()
  }

  const handleDrug = (e) => {
    if (e.length !== 0) {
      setDrug(e['0'].label)
      setMgContent(e['0'].mg)
    }
  }

  useEffect(() => {
    setShowResult(false)
    answer = rate
    if (
      drug &&
      rate &&
      inputRateUnit &&
      outputRateUnit &&
      weight &&
      ampNo &&
      totalVolume
    ) {
      if (inputRateUnit.search('kg') >= 0 && outputRateUnit.search('kg') < 0) {
        answer = answer * weight
      }
      if (inputRateUnit.search('kg') < 0 && outputRateUnit.search('kg') >= 0) {
        answer = answer / weight
      }
      if (
        inputRateUnit.search('mg') >= 0 &&
        outputRateUnit.search('mcg') >= 0
      ) {
        answer = answer * 1000
      }
      if (
        inputRateUnit.search('mcg') >= 0 &&
        outputRateUnit.search('mg') >= 0
      ) {
        answer = answer / 1000
      }
      if (
        inputRateUnit.search('min') >= 0 &&
        outputRateUnit.search('hr') >= 0
      ) {
        answer = answer * 60
      }
      if (
        inputRateUnit.search('hr') >= 0 &&
        outputRateUnit.search('min') >= 0
      ) {
        answer = answer / 60
      }
      if (
        inputRateUnit.search('mcg') >= 0 &&
        outputRateUnit.search('ml') >= 0
      ) {
        answer = (answer * totalVolume) / 1000 / mgContent / ampNo
      }
      if (inputRateUnit.search('mg') >= 0 && outputRateUnit.search('ml') >= 0) {
        answer = (answer * totalVolume) / mgContent / ampNo
      }
      if (
        inputRateUnit.search('ml') >= 0 &&
        outputRateUnit.search('mcg') >= 0
      ) {
        answer = (answer * mgContent * ampNo * 1000) / totalVolume
      }
      if (inputRateUnit.search('ml') >= 0 && outputRateUnit.search('mg') >= 0) {
        answer = (answer * mgContent * ampNo) / totalVolume
      }
    }
    setFinalAnswer(answer)
  }, [rate, weight, inputRateUnit, outputRateUnit, totalVolume, ampNo, drug])

  return (
    <>
      <Meta
        title="Infusion Rate Converter"
        description="a simple tool to convert infusion rate units of specific drug to each other "
        keywords="Adrenaline,Atracurium,Cisatracurium,Dobutamine,Dopamine,Fentanyl,Midazolam,Nitroglycerine,NorAdrenaline,Omeprazole,Phentolamine,Propofol,infusion rate converter, infusion rate calculator app, infusion rate calculator ml/min, infusion rate calculator uk, infusion rate calculator pump, infusion rate calculator units, how to prepare adrenaline infusion, how to make up adrenaline infusion, how to prepare iv adrenaline, how to prepare epinephrine infusion, how to make epinephrine infusion"
      />
      <FilePreview
        fileToPreview="/uploads/freeVideos/calc.mp4"
        show={show}
        handleClose={handleClose}
      />
      <Container className="py-5">
        <Row>
          <Col>
            <h3>Infusion Rate Converter </h3>
          </Col>
          <Col style={{ textAlign: 'right' }}>
            <Link
              to="#"
              onClick={() => setShow(true)}
              style={{ color: 'green' }}>
              <h3>How?</h3>
            </Link>
          </Col>
        </Row>
      </Container>

      <Container>
        <Form>
          <Row>
            <Col className="py-2">
              <FormGroup>
                <FormLabel style={{ fontWeight: 'bold' }}>
                  Medication Name
                </FormLabel>
                <Typeahead
                  placeholder="Enter Medication"
                  options={drugs}
                  onChange={(e) => handleDrug(e)}
                  name="drug"
                  id="basic-example"
                  data-id={drugs.id}
                />
              </FormGroup>
            </Col>
          </Row>
          <div className="row">
            <div className="col-md-6  py-2">
              <Form.Group controlId="rate">
                <FormLabel style={{ fontWeight: 'bold' }}>Rate</FormLabel>
                <Form.Control
                  type="number"
                  placeholder="Enter Rate"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}></Form.Control>
              </Form.Group>
            </div>
            <div className="col-md-6  py-2">
              <FormGroup controlId="inputRateUnit">
                <FormLabel style={{ fontWeight: 'bold' }}>
                  Infusion Rate Unit
                </FormLabel>
                <select
                  className="custom-select"
                  type="text"
                  value={inputRateUnit}
                  onChange={(e) => setInputRateUnit(e.target.value)}>
                  {rateUnits.map((rateUnit) => (
                    <option
                      key={rateUnit.id}
                      value={rateUnit.id}
                      disabled={rateUnit.disabled}>
                      {rateUnit.label}
                    </option>
                  ))}
                </select>
              </FormGroup>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6  py-2">
              <Form.Group controlId="weight">
                <FormLabel style={{ fontWeight: 'bold' }}>Weight(kg)</FormLabel>
                <Form.Control
                  type="number"
                  placeholder="Enter Patient Weight"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}></Form.Control>
              </Form.Group>
            </div>
            <div className="col-md-6  py-2">
              <Form.Group controlId="ampNo">
                <FormLabel style={{ fontWeight: 'bold' }}>
                  Count of amp. in total volume
                </FormLabel>
                <Form.Control
                  type="number"
                  placeholder="Enter Number of Ampoules"
                  value={ampNo}
                  onChange={(e) => setAmpNo(e.target.value)}></Form.Control>
              </Form.Group>
            </div>
          </div>
          <div className="row py-2">
            <div className="col">
              <Form.Group controlId="totalVolume">
                <FormLabel style={{ fontWeight: 'bold' }}>
                  Total Volume (ml)
                </FormLabel>
                <Form.Control
                  type="number"
                  placeholder="Enter total volume (ml)"
                  value={totalVolume}
                  onChange={(e) =>
                    setTotalVolume(e.target.value)
                  }></Form.Control>
              </Form.Group>
            </div>
          </div>
          <Row className="py-2">
            <Col>
              <FormGroup controlId="outputRateUnit">
                <FormLabel style={{ fontWeight: 'bold' }}>
                  Output Rate Unit
                </FormLabel>
                <select
                  className="custom-select"
                  type="text"
                  value={outputRateUnit}
                  onChange={(e) => setOutputRateUnit(e.target.value)}>
                  {rateUnits.map((rateUnit) => (
                    <option
                      value={rateUnit.id}
                      key={rateUnit.id}
                      disabled={rateUnit.disabled}>
                      {rateUnit.label}
                    </option>
                  ))}
                </select>
              </FormGroup>
            </Col>
          </Row>

          <ButtonToolbar className="py-2" style={{ float: 'right' }}>
            <Button onClick={calc} className="btn btn-success mr-2">
              Calculate
            </Button>

            <Button onClick={Reset} className="btn btn-warning mr-2">
              Reset
            </Button>
          </ButtonToolbar>
        </Form>

        {showResult && (
          <Alert variant="success" className="mt-5">
            <h2>
              {' '}
              The corresponding rate is {finalAnswer} {outputRateUnit}
            </h2>
          </Alert>
        )}
      </Container>
    </>
  )
}

export default RateCalc
