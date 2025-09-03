import React from "react";

const Biography = ({ imageUrl }) => {
  return (
    <>
      <div className="container biography">
        <div className="banner">
          <img src={imageUrl} alt="About Us" />
        </div>
        <div className="banner">
          <h2>About Us</h2>
          <p>
            At TrueCare, we are a dedicated team of healthcare 
            professionals, innovators, and caregivers driven 
            by a singular mission — to transform healthcare 
            experiences through compassion, expertise, and advanced 
            technology. 
          </p>
          <p>
            Since our inception in 2024, 
            we have been committed to making quality healthcare 
            accessible, personalized, and empowering for every 
            individual. Our efforts span across building 
            patient-centered solutions, adopting cutting-edge 
            technologies, and ensuring holistic wellness support.
          </p>
          <p>
            Our current projects harness the power of the MERN Stack 
            to deliver seamless, intuitive, and secure healthcare 
            platforms that simplify appointments, medical records, 
            and patient-doctor interactions.
          </p>
          <p>
            At TrueCare, we believe in the power of innovation, collaboration, 
            and empathy to create a healthier tomorrow. 
            Join us on our journey as we redefine healthcare for the modern world.
          </p>
          <p>
            Because your health deserves nothing less than the best.
          </p>
        </div>
      </div>
    </>
  );
};

export default Biography;
