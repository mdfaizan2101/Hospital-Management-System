import React, { useContext } from "react";
import Hero from '../components/Hero.jsx'
import Biography from '../components/Biography.jsx'
import Department from '../components/Departments.jsx'
import MessageForm from '../components/MessageForm.jsx'

const Home = () => {
  return (
    <>
      <Hero 
        title={
            "Welcome to TrueCare!  Where Quality Healthcare Meets Seamless Access"
        } 
        imageUrl={"/hero.png"} 
      />
      <Biography imageUrl={"/about.png"} />
      <Department />
      <MessageForm />
    </>
  )
}

export default Home;