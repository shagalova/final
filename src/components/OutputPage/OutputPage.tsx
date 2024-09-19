import { Reviews } from ".";

function OutputPage() {

    return (   
        <section className='ResultPage mt-[69px] mobile:mt-[20px] max-w-[1440px] mobile:max-w-[375px] px-[60px] mobile:pl-[14px] mobile:pr-0 mx-auto  flex flex-col font-inter font-normal text-basic-black-DEAFULT tracking-[0.02em] w-full '>
            <div className='resultHead  w-full  relative flex mobile:flex-col justify-between'>
                <div className="w-[40%] medium-screen:w-[55%] mobile:w-full mb-32 mobile:mb-[21px]">
                    <h1 className=' uppercase font-ferry font-black text-[40px]/[48px] mobile:text-[28px]/[33.6px] pb-9 mobile:pb-[21px] tracking-[0.05em] mobile:tracking-[0.01em]'>Ищем. Скоро будут результаты</h1>
                    <p className="text-xl/[24.2px] mobile:text-lg/[21.78px]">Поиск может занять некоторое время, просим сохранять терпение.</p>
                </div>
                <div className="w-[552px] medium-screen:w-[350px] mobile:w-[350px] h-[369px] medium-screen:h-[233px] mobile:h-[233px] mt-[-44px] medium-screen:mt-0 mobile:mt-0 mr-[40px] medium-screen:mr-0 mobile:mr-0 mobile:mb-[60px]">
                    <img src={process.env.PUBLIC_URL + '/output-hero.svg'} alt="output-hero" className="w-full h-full"/>
                </div>                       
            </div>
            <Reviews />
            
        </section>
    )
        
  }
  
  export default OutputPage;