import React from 'react'
import { Link } from 'react-router-dom'
import { IDocData } from '../../types';

interface CardProps {
    
    issueDate: IDocData["issueDate"];
    url: IDocData["url"];
    sourceName: IDocData["sourceName"];
    title: IDocData["title"]["text"];
    content: string | React.JSX.Element | React.JSX.Element[];
    attributes: string[] | undefined;
    words: IDocData["attributes"]["wordCount"]
    img?: string | undefined;
    sourceUrl: string

}

const Card = ( { issueDate, url="#", sourceName, sourceUrl, title, content, attributes, words, img="./output-img1.png" } : CardProps) => {

  return (
    <div className='relative flex flex-col  rounded-[10px] shadow-[0px_0px_20px_0px_rgba(0,_0,_0,_0.2)] tracking-[0.02em] text-base/[19.36px] mobile:text-xs/[14.52px]  px-[30px] mobile:pl-[24px] mobile:pr-[14px] pt-[19px] pb-[35px] mobile:pb-[19px]'>
        <div className="head flex gap-x-[18px] mobile:gap-x-[9px] text-[#949494] pb-6 mobile:pb-[21px]">
            <p>{issueDate}</p>
            <Link className="underline" to={sourceUrl} target='_blank'>{sourceName}</Link>
        </div>
        <h3 className='font-medium text-[26px]/[31.47px] mobile:text-[19px]/[22.99px] pb-3.5 mobile:pb-[20px]'>{title}</h3>
        <div className="mb-3.5 mobile:mb-[13px]">
            <>
            { 
            attributes?.length === 0 || attributes?.[0] === "" 
            ? null
            : attributes?.map(attr => (
                <div className={`flex justify-center items-center text-xs/[14.52px] mobile:text-[10px]/[12.1px] w-[157px] mobile:w-[132px] h-[22px] mobile:h-[20px]  rounded-[5px] bg-second-orange`}>{attr}</div>
            ))
            }
            </>
        </div>
        
            
        <div className="w-full h-[158px] mb-5 mobile:mb-[18px]">
            <img src={img} alt="output-img" className='w-full h-full object-cover rounded-[10px]' />
        </div>
        <div className='opacity-50 mb-[32px] mobile:mb-[25px] h-[228px] mobile:h-[255px] overflow-hidden'>
            {content}
           
        </div>
    <div className="flex justify-between items-end align-bottom  pb-[35px] mobile:pb-[18px] w-full">
        <button className='w-[223px] mobile:w-[195px] h-[46px] mobile:h-[40px] bg-second-light-blue-DEAFULT rounded-[5px] '>
            <Link to={url} target='_blank'>Читать в источнике</Link>
        </button>
        <p className='text-[#949494] '><span>{words.toLocaleString('ru')}</span> слова</p>
    </div>
        
    </div>
  )
}

export default Card
