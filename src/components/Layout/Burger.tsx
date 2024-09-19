import React from 'react'
import {Button} from '../common'
import { IBurgerProps } from '../../types'



const Burger = ({isAuth, handleAuth, handleAuthBack, burgerActive}: IBurgerProps) => {
  return (
    <>
    
        <div className={`menu  w-screen h-[398px] ${burgerActive === true ? "block" : "hidden"}`}>
            <div className="menu__content flex flex-col items-center justify-around w-full h-full font-normal bg-basic-blue-DEAFULT text-basic-white-DEAFULT">
                <div className="links flex flex-col items-center gap-y-[26px]">
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
                {!!!isAuth 
                ? 
                <div className="auth flex flex-col items-center gap-5">
                    <div className="opacity-40">Зарегистрироваться</div>
                    <Button 
                    title="Войти"
                    containerStyles="font-medium text-xl/[24.2px] w-[295px] h-[52px] bg-second-light-blue-DEAFULT rounded-[5px]"
                    handleClick={handleAuth}/>
                </div>
                : 
                <div className="auth flex flex-col items-center ">
                    <Button 
                    title="Выйти"
                    containerStyles="font-medium text-xl/[24.2px] w-[295px] h-[52px] bg-second-light-blue-DEAFULT rounded-[5px]"
                    handleClick={handleAuthBack}/>
                </div>
                }
            
            </div>
        </div>
    </>
  )
}

export default Burger