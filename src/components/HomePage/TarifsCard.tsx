import React from 'react'
import { Button } from '../common' 
import { TarifsCardProps } from '../../types'
import { useAppSelector } from '../../redux/hooks'
import { selectUser } from '../../redux/users/userSlice'


const TarifsCard = ({ tarif }: TarifsCardProps) => {
    const {title, description, icon, mainColor, curPrice, prevPrice, partPrice, include, isActive} = tarif

    const isAuth = useAppSelector(selectUser);

    const setBorder = (mainColor: TarifsCardProps["tarif"]["mainColor"]) => {
        let cardContainer = "tarifs-card";
    if(mainColor === "#000000") {
        cardContainer += " black-border"
    } 
    else if(mainColor === "#FFB64F") {
        cardContainer += " orange-border"
    }
    else if(mainColor === "#7CE3E1") {
        cardContainer += " blue-border"
    } return cardContainer;
    }
    
    const setBg = (mainColor: TarifsCardProps["tarif"]["mainColor"]) => {
        let headerStyle;
    if(mainColor === "#000000") {
        headerStyle = "black-theme"
    } 
    else if(mainColor === "#FFB64F") {
        headerStyle = "orange-theme"
    }
    else if(mainColor === "#7CE3E1") {
        headerStyle = "blue-theme"
    } return headerStyle;
    }

  return (
    
    <div className={isAuth && isActive === true ? setBorder(mainColor) : "tarifs-card"}>
       
        <div className={setBg(mainColor)}>
            <div className="pl-[30px] mobile:pl-[24px] pt-2 flex justify-between">
                <div className="pt-6 pb-7">
                    <h3 className='font-medium text-[30px]/[36.31px] mobile:text-[20px]/[24.2px] pb-2.5 mobile:pb-[22px]'>{title}</h3>
                    <p className='font-normal text-lg/[21.78px] '>{description}</p>
                </div>
                <div className="w-24 mobile:w-[70px] h-[85px] mobile:h-[60px]">
                    <img src={process.env.PUBLIC_URL + `/${icon}`} alt={icon} className='w-full h-full object-contain' />
                </div>
            </div>

        </div>
        <div className="body relative">
            {
                isAuth && isActive === true
                ? <span className='current absolute right-2.5 top-3 font-normal text-main text-basic-white-DEAFULT bg-[#3BA5E0] rounded-[10px] px-3 py-[3px]'>Текущий тариф</span>
                : null
            }
            <div className="price pl-[30px] py-[30px] min-h-[118px]">
                    <span className='font-medium text-3xl/[36.31px] pb-2.5'>{curPrice} &#8381;</span> <span className='font-medium text-[25px]/[30.26px] opacity-50 pl-[19px] line-through'>{prevPrice} &#x20bd;</span>
                    {!!description && <p className='font-normal text-lg/[21.78px]'>{partPrice}</p>}
            </div>
            <div className="benefits pl-[30px] py-[30px] mobile:pt-[6px] ">
                <p className='font-medium text-xl/[24.2px] pb-2.5 '>В тариф входит:</p>
                <ul className='list-none '>
                    <>
                    { 
                       !!include.length && include.map((item,index) => (
                            <li key={index} className=' font-normal text-lg/[21.78px]  '   >
                        <img src={process.env.PUBLIC_URL + '/chek.svg'} alt='chek' className='inline pr-2' />
                        {item}</li>
                       ))
                    }
                    </>
                </ul>

            </div>
            <>
            {
            isAuth && isActive === true 
            ? <Button
            title="Перейти в личный кабинет"
            containerStyles="mx-[30px] mobile:mx-[24px] my-6  mobile:mt-[7px] mobile:mb-0 self-center font-normal w-[calc(100%-60px)] mobile:w-[calc(100%-48px)] h-[59px] bg-[#D2D2D2] rounded-[5px] "
            />
            : <Button
            title="Подробнее"
            containerStyles="mx-[30px] mobile:mx-[24px] my-6 mobile:mt-[7px] mobile:mb-0 self-center font-normal w-[calc(100%-60px)] mobile:w-[calc(100%-48px)] h-[59px] bg-second-blue text-basic-white-DEAFULT rounded-[5px] "
            />
            }
            </>
            
            </div>
            
            </div>
    
  )
}

export default TarifsCard