import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../common";
import { useAppDispatch } from "../../redux/hooks";
import { login } from "../../redux/users/userSlice";
import { BASE_PATH, LOGIN_PATH } from "../../utils/vars";
import { IUserAccount } from "../../types";
import { makeRequest } from "../../utils/otherFunc";

function RegisterPage() {

    const [account, setAccount] = useState<string>("");
    const [pass, setPass] = useState<string>("");
    const [errorMessagePass, setErrorMessagePass] = useState<boolean>(false)
    const [errorMessageLogin, setErrorMessageLogin] = useState<boolean>(false)
    const [isDisabled, setIsDisabled] = useState<boolean>(true)
    const [notUserMessage, setNotUserMessage] = useState<boolean>(false)

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    
    async function loginUser() {
            const url = `${BASE_PATH}${LOGIN_PATH}`;
            const data = {login: account, password: pass}
            try {
                // const response = await fetch (url, {
                //     method: "POST",
                //     body: JSON.stringify(data),
                //     headers: {
                //         "Content-Type": "application/json",
                //         "Accept": "application/json",
                //     },
                // });
                // if(!response.ok) {
                //     throw new Error ("ответ сети был не ок.");
                // }
                // const result: IUserAccount = await response.json();

                const result: IUserAccount = await makeRequest(url, "POST", data);

                const { accessToken, expire } = result;
                localStorage.setItem("token", accessToken);
                dispatch(login({login:account, token: accessToken, date: expire}))
                navigate("/")

            } catch (error) {
                console.log("Пользователь не найден");
                setNotUserMessage(true)
            }
        }
    const handleHandle =(e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        loginUser();
    }

    const handleChangeLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if(e.target.value && e.target.validity.valid) {
            setAccount(e.target.value)
            setErrorMessageLogin(false)
        } else {
            setErrorMessageLogin(true)
        }
        
    }

    const handleChangePass = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if(e.target.value && e.target.validity.valid) {
            setPass(e.target.value)
            setErrorMessagePass(false)
        } else {
            setErrorMessagePass(true)
        }
        
    }

    useEffect(() => {
        if(!account || !pass || errorMessageLogin === true || errorMessagePass === true) {
            setIsDisabled(true)
        } else {
            setIsDisabled(false)
        }
    }, [account, pass, errorMessageLogin, errorMessagePass])

    return (        
       <section className='RegisterPage mt-[69px] mobile:mt-[31px] mb-8 max-w-[1440px] mobile:max-w-[375px] pl-[60px] mobile:pl-[14px] pr-[141px] medium-screen:pr-[60px] mobile:pr-[26px] mx-auto  flex mobile:flex-col font-inter font-normal text-basic-black-DEAFULT tracking-[0.02em] w-full justify-between'>
        <div className='leftSide w-[62%] medium-screen:w-[49%] mobile:w-full'>
            <h1 className=' uppercase font-ferry font-black text-[40px]/[48px] medium-screen:text-[30px]/[36px] mobile:text-[22px]/[26.4px] pb-3 mobile:pb-[45px]'>Для оформления подписки на тариф, необходимо авторизоваться.</h1>
            <div className="ml-28 medium-screen:ml-0 mobile:ml-0 mobile:mt-[585px]  w-[321px] mobile:w-full h-auto">
                <img src={process.env.PUBLIC_URL + '/auth-hero.svg'} alt="auth-hero" className="w-full h-full object-contain"/>
            </div>            
        </div>
   
        <div className="rightSide w-[35%] medium-screen:w-[49%] mobile:w-full mobile:-mt-[880px] mobile:mb-[450px] relative text-base/[19.36px] tracking-[0.01em]">
            <img src={process.env.PUBLIC_URL + '/auth-lock.svg'} alt="lock" className="w-[75px] h-[92px] absolute left-[-51px] mobile:left-[95px] top-[-55px] mobile:top-[-81px]"/>

            <div className="min-w-[429px] medium-screen:min-w-[335px] mobile:min-w-[335px] min-h-[523px] mobile:min-h-[504px] flex flex-col px-[25px] mobile:px-[15px] pt-[25px] pb-[39px] mobile:pb-[20px] border border-[#C7C7C7] rounded-[10px] shadow-[0px_0px_20px_0px_rgba(0,_0,_0,_0.2)]">
                <div className="flex w-full justify-between text-center mb-10">
                <label title="Вкладка 1" className="w-[151px] text-basic-blue-DEAFULT border-b-2 border-basic-blue-DEAFULT ">Войти</label>
                <label title="Вкладка 2" className="w-[213px] text-[#C7C7C7] border-b-2 border-[#C7C7C7]">Зарегистрироваться</label>
            </div>
            <form action="#" className="w-full flex flex-col">
                <label htmlFor="login" className="mb-[15px] text-[#949494]">Логин или номер телефона:</label>
                <input 
                id="login" 
                type="text" 
                className={` w-full h-11 border rounded-[5px] shadow-[0px_0px_20px_0px_rgba(0,_0,_0,_0.05)] px-[19px] focus:outline-none ${errorMessageLogin ? "border-[#FF5959] text-[#FF5959]" : "border-[#C7C7C7] text-basic-black-DEAFULT"}`} 
                required
                pattern="\S+"
                onChange={handleChangeLogin}
                />
                <div className="h-5 w-full text-[#FF5959] text-main text-center">
                    {errorMessageLogin ? <p>Введите корректные данные</p> : null}
                </div>
                <label htmlFor="password" className="mb-[15px] text-[#949494]">Пароль:</label>
                <input 
                id="password" 
                type="password" 
                className={` w-full h-11 border rounded-[5px] shadow-[0px_0px_20px_0px_rgba(0,_0,_0,_0.05)] px-[19px] focus:outline-none ${errorMessagePass ? "border-[#FF5959] text-[#FF5959]" : "border-[#C7C7C7] text-basic-black-DEAFULT"}`} 
                required
                pattern="\S+"
                onChange={handleChangePass}
                />
                <div className="h-5 w-full text-[#FF5959] text-main text-center ">
                    {errorMessagePass ? <p>Неправильный пароль</p> : null}
                </div>
                <Button 
                isDisabled={isDisabled}
                title="Войти"
                containerStyles="disabled:opacity-50 mt-2.5 mb-[15px] font-medium w-full h-[59px] bg-second-blue rounded-[5px] text-basic-white-DEAFULT text-[22px]/[26.63px]"
                handleClick={handleHandle}
          />

                <div className="h-5 w-full text-[#FF5959] text-main text-center ">
                    {notUserMessage ? <p>Пользователь не найден</p> : null}
                </div>
                <a href="#" className="underline decoration-[#5970FF] text-second-blue text-center text-main mb-[30px]">Восстановить пароль</a>
                <label title="dfs" className="text-[#949494] pb-[15px]">Войти через:</label>
                <div className="flex gap-x-2.5 ">
                    <button className="border border-[rgba(89,_112,_255,_0.51)] rounded-[3px] w-24 h-[31px]">
                        <div className="flex justify-center">
                            <img src={process.env.PUBLIC_URL + '/google.svg'} alt='google' className=''/>
                        </div>
                    </button>
                    <button className="border border-[rgba(89,_112,_255,_0.51)] rounded-[3px] w-24 h-[31px] text-center">
                        <div className="flex justify-center">
                            <img src={process.env.PUBLIC_URL + '/facebook.svg'} alt='facebook' className=''/>
                        </div>
                    </button>
                    <button className="border border-[rgba(89,_112,_255,_0.51)] rounded-[3px] w-24 h-[31px] text-center">
                        <div className="flex justify-center">
                            <img src={process.env.PUBLIC_URL + '/yandex.svg'} alt='yandex' className=''/>
                        </div>
                    </button>    
                </div>
                
            </form>
            </div>
        </div>
        
    </section>
      
    );
  }
  
  export default RegisterPage;