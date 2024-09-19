import React from 'react'
import { TarifsCard } from '.'
import { tarifs } from '../../utils/data'

const Tarifs = () => {

  return (
    <section className='tarifs mt-[107px] mobile:mt-[80px] max-w-[1320px] mobile:max-w-[375px] mx-auto mobile:pl-[14px] mobile:pr-[26px] '>    
        <h1 className='uppercase font-ferry font-black text-[45px]/[54px] mobile:text-[28px]/[33.6px] '>наши тарифы</h1>
        <div className='wrapper flex w-full flex-wrap gap-x-[37px] mobile:gap-x-0 '>
        <>
            {
                !!tarifs.length && tarifs.map((item,index) => (
                    <TarifsCard key={index} tarif={item} />
                ))
            }
        </>
   
        </div>

</section>
  )
}

export default Tarifs