import React from 'react'
import { Loading } from '../common'
import { IAccauntInfoProps } from '../../types'

const AccauntInfo = ({isLoading, count, limit}: IAccauntInfoProps) => {
  return (
    
        <div className='flex medium-screen:w-[35%] mobile:w-[35%] justify-between'>
            <div className={`limit-info w-[175px] mobile:w-[132px] h-[63px] mobile:h-[75px] bg-[rgba(217,_217,_217,_0.3)] rounded-[5px] flex flex-col gap-[7px] px-3 mobile:px-2.5 justify-center ${isLoading === true ? "items-center" : "items-end mobile:items-start" }`}>
                {isLoading === true
                    ? 
                        <Loading styles='w-[24px] [h-24px]' />
                    : 
                    <>
                        <div className="w-full flex mobile:flex-col justify-between items-center mobile:items-start">
                            <div className="text-min mobile:text-[8px]/[9.68px] text-basic-black-40 ">Использовано компаний</div>
                            <div className='w-[16%] text-sm/[16.94px] font-bold  pl-[9px] text-basic-black-DEAFULT'>{count}</div>
                        </div>
                        <div className="w-full flex mobile:flex-col justify-between items-center mobile:items-start">
                            <div className="text-min mobile:text-[8px]/[9.68px] text-basic-black-40">Лимит по компаниям</div>
                            <div className='w-[16%] text-sm/[16.94px] font-bold text-[#8AC540]  pl-[9px] '>{limit}</div>
                        </div> 
                    </>
                }
                  
            </div>
        </div>

  )
}

export default AccauntInfo