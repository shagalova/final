import React from 'react'
import { Button } from '../common' 
import { useAppSelector } from '../../redux/hooks'
import { selectUser } from '../../redux/users/userSlice'
import { useNavigate } from 'react-router-dom'

const Hero = () => {
    const isAuth = useAppSelector(selectUser)
    const navigate = useNavigate()
    const handleSearchData = () => {
        navigate('search')
    }
  return (
    <section className='hero mt-6 mobile:mt-5 max-w-[1440px] mobile:max-w-[375px] px-[60px] mobile:px-[14px] mx-auto  flex mobile:flex-col font-inter font-normal text-basic-black-DEAFULT '>
        <div className='leftSide pt-11 mobile:pt-0 w-[56%] mobile:w-full '>
            <h1 className='relative uppercase font-ferry font-black text-6xl/[72px] medium-screen:text-[45px]/[54px] mobile:text-[28px]/[33.6px] z-10'>сервис по поиску публикаций о компании по его ИНН</h1>
            <p className=' w-[72%] mobile:w-full pt-5 text-xl/[24.2px] mobile:text-lg/[21.78px] '>Комплексный анализ публикаций, получение данных в формате PDF на электронную почту.</p>
            { isAuth ? 
            <Button 
            title="Запросить данные"
            containerStyles="mt-[70px] mobile:mt-8  mb-[90px] mobile:mb-6 font-medium w-[335px] h-[59px] bg-second-blue rounded-[5px] text-basic-white-DEAFULT text-[22px]/[26.63px] mobile:text-[20px]/[24.2px] tracking-[0.01em]"
            handleClick={handleSearchData}/>
            : null}
        </div>
        <div className='w-[48%] mobile:w-full h-auto'>
            <img src={process.env.PUBLIC_URL + '/main-hero.svg'} alt='main-hero' className='w-full mobile:w-[347px] h-full mobile:h-[327px] ml-[-52px] medium-screen:ml-0 mobile:ml-0 object-contain'/>
        </div>
    </section>
  )
}

export default Hero