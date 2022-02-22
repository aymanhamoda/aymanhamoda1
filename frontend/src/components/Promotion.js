import React from 'react'
import { Carousel, Image } from 'react-bootstrap'
import promotions from '../data/promotions'

const Promotion = () => {
  return (
    <>
      <div className="justify-content-center bg-dark mt-5 d-flex">
        <Carousel
          pause="hover"
          className="py-5 row"
          style={{ maxWidth: '600px' }}>
          {promotions.map((promotion) => (
            <Carousel.Item key={promotion._id} interval={3000}>
              <Image src={promotion.image} fluid />
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </>
  )
}

export default Promotion
