import React from 'react'
import Slider from './Slider'

const WhyWe = () => {
  return (
    <section className='whyWe mt-[109px] mobile:mt-[55px] max-w-[1440px] mobile:max-w-[375px] mx-auto mobile:overflow-hidden '>
        <div className='pl-[51px]  pr-[43px] mobile:px-[14px]'>
            <h1 className='uppercase font-ferry font-black text-[45px]/[54px] mobile:text-[28px]/[33.6px] '>Почему именно мы</h1>
            <Slider />
            <img src={process.env.PUBLIC_URL + "/main-bottom_img.svg"} alt='main-bottom_img' className='w-[1307px] mobile:max-w-[891px] h-auto mobile:h-[392px] mobile:object-fill mobile:object-left mobile:mt-[80px]'/>
        </div>

    </section>
  )
}

export default WhyWe