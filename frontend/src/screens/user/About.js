import React from 'react'
import { Image } from 'react-bootstrap'
import Meta from '../../components/Meta'

const About = () => {
  return (
    <>
      <Meta title="Ayman Hamouda" />
      <div className="container">
        <div className="row text-center py-5">
          <div className="col-md-6">
            <Image src="images/lgLogo.png" alt="" />
          </div>
          <div className="col-md-6">
            <h1> أيمن محمد حمودة </h1>
            <p className="lead"> مواليد بورسعيد 14 مارس 82 </p>
            <p className="lead">متزوج ورزقني الله عز وجل أربعة من الولد</p>
            <p className="lead">
              حاصل على بكالوريوس صيدلة جامعة قناة السويس بتقدير عام ممتاز مع
              مرتبة الشرف - الترتيب التاسع
            </p>
            <p className="lead">
              حاصل على الزمالة المصرية للصيدلة الإكلينيكية تخصص عناية مركزة
            </p>
            <p className="lead">
              رئيس قسم الصيدلة الإكلينيكية بمجمع الإسماعيلية الطبي حالياً
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default About
