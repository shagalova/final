import React from 'react'

const Footer = () => {
  return (
    
    <div className='bg-basic-blue-DEAFULT w-full h-[137px] mt-12 mobile:mt-[43px]'>
      
      <div className=" max-w-[1440px] mobile:max-w-[375px] pl-[60px] pr-[45px] mobile:py-[25px] mobile:px-[18px] mx-auto flex items-center mobile:items-start justify-between font-inter text-main font-normal text-basic-white-DEAFULT">
      
      <div className="logo mobile:-mt-[40px]">
        <img src={process.env.PUBLIC_URL + "/logo-white.svg"} alt='logo-scan' className='w-[141px] mobile:w-[111px]  h-auto object-contain' />
      </div>

      <div className="contacts w-[30%] medium-screen:w-[50%] mobile:w-[60%] text-right" >
        <div>
          <p>г. Москва, Цветной б-р, 40</p>
          <p>+7 495 771 21 11</p>
          <p>info@skan.ru</p>
        </div>
        <br></br>
        <p>
          <span>Copyright. 2022</span>
        </p>
      </div>
      
    </div>
    </div>
      
  )
}

export default Footer