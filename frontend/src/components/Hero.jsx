import React from 'react'

const Hero = ({ title, imageUrl }) => {
  return (
    <div className='hero container'>

      <div className="banner">
        <h1>{title}</h1>
        <p>
          Our team of experienced doctors, specialists, and 
          healthcare professionals is committed to providing 
          compassionate care tailored to your unique health 
          needs. At TrueCare, we blend medical expertise with 
          advanced technology to guide you on a seamless journey 
          toward better health, healing, and lifelong wellness.
        </p>
      </div>
      <div className="banner">
        <img src={imageUrl} alt="hero" className='animated-image' />
        <span>
          <img src="/Vector.png" alt="vector" />
        </span>
      </div>
      
    </div>
  )
}

export default Hero