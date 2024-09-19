import { SearchForm } from ".";


function SearchPage() {

    return (   
          
       <section className='SearchPage mt-[69px] mobile:mt-[20px] mb-4 mobile:mb-0 max-w-[1440px] mobile:max-w-[375px] pl-[60px] mobile:pl-[14px] mx-auto  flex flex-col font-inter font-normal text-basic-black-DEAFULT tracking-[0.03em] w-full justify-between'>
        <div className='head  w-[calc(100%-82px)] mobile:w-full mb-12 mobile:mb-[21px] relative'>
            <h1 className='w-[62%] mobile:w-full uppercase font-ferry font-black text-[40px]/[48px] mobile:text-[28px]/[33.6px] pb-6 mobile:pb-[19px]'>Найдите необходимые данные в пару кликов.</h1>
            <p className="text-xl/[24.2px] mobile:text-lg/[21.78px]">Задайте параметры поиска.</p>
            <p className="text-xl/[24.2px] mobile:text-lg/[21.78px]">Чем больше заполните, тем точнее поиск</p>
            <div className="w-[91px] mobile:w-[58px] h-[111px] mobile:h-[71px] absolute bottom-0 mobile:bottom-[55px] right-[25%] medium-screen:right-[25px] mobile:right-[25px]">
                <img src={process.env.PUBLIC_URL + '/search-doc.svg'} alt="search-doc" className="w-full h-full"/>
            </div>
            <div className="w-[141px] h-[69px] absolute bottom-5 right-5 medium-screen:hidden mobile:hidden">
                <img src={process.env.PUBLIC_URL + '/search-folders.svg'} alt="search-folders" className="w-full h-full"/>
            </div>       
        </div>
        <div className="relative">
        <SearchForm />
        <div className="w-[435px] mobile:w-[379px] h-[470px] mobile:h-[403px] absolute bottom-0 right-0 medium-screen:left-0 mobile:right-[-40px]">
                <img src={process.env.PUBLIC_URL + '/search-hero.svg'} alt="search-hero" className="w-full h-full"/>
            </div> 
        </div>
        
    </section>
    )
         
}
  
  export default SearchPage;