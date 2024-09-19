import React, { useEffect, useState } from 'react';
import  Button  from '../common/CustomButton';
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logout, selectUser } from "../../redux/users/userSlice";
import { useNavigate } from 'react-router-dom';
import { BASE_PATH, LOGIN_INFO_PATH } from '../../utils/vars';
import { IUserInfo } from '../../types';
import { AccauntInfo } from '.';
import { isOpen, selectBurgerState } from '../../redux/burger/burgerSlice';
import useMobileCheck from '../../utils/hooks/useMobileCheck';

const Navbar = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [count, setCount] = useState<number>(0)
  const [limit, setLimit] = useState<number>(0)

  const { isMobile } = useMobileCheck();
  
  const isBurgerOpen = useAppSelector(selectBurgerState)
  

  const dispatch = useAppDispatch();
  
  const navigate = useNavigate();

  const isAuth = useAppSelector(selectUser)

const handleAuth = () => {
  
  navigate('auth')
}



const handleAuthBack = () => {
  dispatch(logout())
  localStorage.removeItem("token")
}
  useEffect(() => {

    if(!isAuth) return
    setIsLoading(true)
    const fetchUserInfo = async () => {
  
       try {   
      const response = await fetch(`${BASE_PATH}${LOGIN_INFO_PATH}`, {
        
        headers: {
          "Authorization":`Bearer ${isAuth}`,
          "Accept": "application/json"
        }
      });
      if(!response.ok) {
        console.log(response.status, response.statusText, Response)
        throw new Error("Somthing wrong")
        
      }
      const result = await response.json()
      console.log(result)
      const { usedCompanyCount, companyLimit }: IUserInfo = result.eventFiltersInfo
      setCount(usedCompanyCount)
      setLimit(companyLimit)

      setIsLoading(false)
  
  
    } catch (error) {
      console.log(error)
    } 

    }

      fetchUserInfo()
      
  },[isAuth])


  return (
    <div className={`w-full h-[93px] py-[15px] mobile:py-[9px]  ${isMobile && isBurgerOpen === true ? 'bg-basic-blue-DEAFULT' : 'bg-basic-white-DEAFULT'}`}>
      <div className='max-w-[1440px] mobile:max-w-[375px] px-[60px] mobile:pl-3.5 mobile:pr-[26px] mx-auto  flex items-center justify-between font-inter text-main mobile:text-base/[19.36px] font-normal text-basic-black-DEAFULT'>
        <div className="logo w-[calc(100%/3)] medium-screen:w-[calc(100%/6)]">
          <img src={isMobile && isBurgerOpen === true ? `${process.env.PUBLIC_URL + "/logo-white.svg"}` : `${process.env.PUBLIC_URL + "/logo-green.svg"}`} alt='logo-scan' className='w-[141px] mobile:w-[111px] h-[93px] object-contain ' />
        </div>

      { !isMobile        
      ?
      <>
        <div className="nav w-[calc(100%/3)] medium-screen:w-[calc(100%/5)] flex gap-12 medium-screen:gap-6 justify-center">
          <div>
            <a href='#'>Главная</a>
          </div>
          <div>
            <a href='#'>Тарифы</a>
          </div>
          <div>
            <a href='#'>FAQ</a>
          </div>
        </div>      
      
             
        <div className="auth w-[calc(100%/3)] medium-screen:w-[calc(100%/2.5)] flex items-center gap-5 justify-end">
          {!isAuth
         ?
        <>
          <div className='text-basic-black-40'>Зарегистрироваться</div>
          <div className='border h-[26px] border-l-2 border-basic-blue-DEAFULT'></div>
          <Button 
            title="Войти"
            containerStyles="font-medium w-[65px] h-[26px] bg-second-light-blue-DEAFULT rounded-[5px]"
            handleClick={handleAuth}
          />
        </>
        :
        <>          
          <AccauntInfo isLoading={isLoading} count={count} limit={limit}
          />
          
  <div className='profile flex items-center gap-x-1'>
    <div className='flex flex-col'>
      <div className='text-basic-black-70'>Алексей А.</div>
      <div className='text-basic-black-40 text-min cursor-pointer' onClick={handleAuthBack}>Выйти</div>
    </div>
  <div>
    <img src={process.env.PUBLIC_URL + '/profile-ava.png'} alt='ava' className='w-8 h-auto object-contain rounded-full' />
  </div>
  </div>

 </>

}
  </div>          
        </>
      : 
      <> 
        {!isAuth
        ? null
      : <AccauntInfo isLoading={isLoading} count={count} limit={limit}
      />
      }
      {isBurgerOpen === true 
      ? <button className={`burger-btn-close bg-burger-close w-[25px] h-[25px]`} onClick={() => dispatch(isOpen(false))}></button>
      : <button className={`burger-btn bg-burger-menu w-[30px] h-[25px]`} onClick={() => dispatch(isOpen(true))}></button>
      }
      
      </>
       
}
            
      
    </div>
    </div>
  )
}

export default Navbar