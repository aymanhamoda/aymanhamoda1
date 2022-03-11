import React from 'react'
import { Image } from 'react-bootstrap'
import Meta from '../../components/Meta'

const About = () => {
  return (
    <>
      <Meta
        metaImage="https://www.aymanhamoda.com/images/lgLogo.png"
        title="Ayman Hamouda"
        description="Ayman Hamouda, ICU Clinical Pharmacist, Egyptian Fellowship for Clinical Pharmacy - ICU specialty. I am a self-motivated clinical pharmacy professional with more than 9 years of experience as a clinical pharmacist at many governmental and private hospitals."
        keywords="ayman hamouda, aymanhamouda, ayman mohamed , aymanhamoda, ayman hamoda"
      />
      <div className="container">
        <div className="row text-center py-5">
          <div className="col-md-6">
            <Image src="images/lgLogo.png" alt="ِAyman Hamouda" />
          </div>
          <div className="col-md-6">
            <h1> أيمن محمد حمودة </h1>
            <p className="lead">
              رئيس قسم الصيدلة الإكلينيكية بمجمع الإسماعيلية الطبي حالياً
            </p>
            <p className="lead"> مواليد بورسعيد 14 مارس 82 </p>
            <p className="lead">متزوج ورزقني الله عز وجل أربعة من الولد</p>
            <p className="lead">
              حاصل على بكالوريوس صيدلة جامعة قناة السويس بتقدير عام ممتاز مع
              مرتبة الشرف - الترتيب التاسع
            </p>
            <p className="lead">
              حاصل على الزمالة المصرية للصيدلة الإكلينيكية تخصص عناية مركزة
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default About
