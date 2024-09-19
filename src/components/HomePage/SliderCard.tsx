import React from 'react'
import { ISlider } from '../../types'

const SliderCard = ({ icon, text }: ISlider) => {
  return (
    
    <div className='flex flex-col min-w-[400px] mobile:min-w-[268px] max-w-[400px] mobile:max-w-[268px] h-full min-h-[225px] mobile:h-auto mobile:min-h-[300px] border rounded-[10px] bg-basic-white-DEAFULT shadow-[0px_0px_20px_0px_rgba(0,_0,_0,_0.2)]
 px-5 mobile:px-[17px] py-[30px] my-[70px] mobile:mt-[32px] mobile:mb-0'>
        <img src={process.env.PUBLIC_URL + `${icon}`} alt={icon} className='mb-5 w-16 mobile:w-14 h-16'/>
        <p className='text-lg/[21.78px] font-inter font-normal'>{text}</p>
    </div>
  )
}


export default SliderCard