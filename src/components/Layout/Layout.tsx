import React, { useEffect, useState }  from 'react';
import { Navbar } from '.';
import { Footer } from '.';
import { Burger } from '.';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { selectBurgerState } from '../../redux/burger/burgerSlice';
import { useNavigate } from 'react-router-dom';
import { logout, selectTokenDate, selectUser } from '../../redux/users/userSlice';
import useMobileCheck from '../../utils/hooks/useMobileCheck';

const Layout = ({ children }: {children: React.ReactNode}) => {

  const isAuth = useAppSelector(selectUser)
  const isBurgerOpen = useAppSelector(selectBurgerState)
  const {isMobile} = useMobileCheck()
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleAuth = () => {
    
    navigate('auth')
  }

  

  const handleAuthBack = () => {

    dispatch(logout())
    localStorage.removeItem("token")
  }

  return (
    <>
      
        <Navbar />

        <main>
        {isMobile && isBurgerOpen === true 
      ? <Burger 
        burgerActive={isBurgerOpen}
        isAuth={isAuth}
        handleAuth={handleAuth}
        handleAuthBack={handleAuthBack}
        />
      : null
      }
          {children}
        </main>
        <Footer />
      
    </>
  )
}

export default Layout