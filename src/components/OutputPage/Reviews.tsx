import React, { useEffect, useRef, useState } from 'react'
import { LeftArrow } from '../common'
import { RightArrow } from '../common'
import { Loading } from '../common'
import { Card } from '.' 
import { Button } from '../common' 
import { useAppSelector } from '../../redux/hooks'
import { selectState, selectHistogramData, selectDocuments, selectIsLoadingDoc } from '../../redux/search/searchSlice'
import { findImgSrc, formatDate, takeURL, totalReviews } from '../../utils/otherFunc'
import { IDocData, IHistogramData } from '../../types'
import DOMPurify from 'isomorphic-dompurify';
import parse from 'html-react-parser';
import useMobileCheck from '../../utils/hooks/useMobileCheck'


const Reviews = () => {
    
    const isLoading = useAppSelector(selectState)
    const histogramData = useAppSelector(selectHistogramData)
    const documents = useAppSelector(selectDocuments)
    const isLoadingDoc = useAppSelector(selectIsLoadingDoc)

    const { isMobile } = useMobileCheck()

    const [currPage, setCurrPage] = useState<number>(1)
    const [docsPerPage] = useState<number>(10)

    const { histItemsPerPage } = useMobileCheck()
    const [mobileHistItemsPerPage] = useState<number>(1)

    const [stInd, setStInd] = useState<number>(0)
    const [mobileStInd, setMobileStInd] = useState<number>(0)
    const [isLeftDisabled, setIsLeftDisabled] = useState<boolean>(true)
    const [isRightDisabled, setIsRightDisabled] = useState<boolean>(true)

    const leftArrowRef = useRef<HTMLButtonElement>(null)
    const rightArrowRef = useRef<HTMLButtonElement>(null)

    const sliceHistogramData = (histogramData:IHistogramData[] | null) => {
        
        let slicedHistogram: IHistogramData[]

        if(histogramData === null || !histogramData.length) return

        if(!isMobile) {
            if(histogramData[0].data.length <= histItemsPerPage) {
                slicedHistogram = [
                    {histogramType:"totalDocuments", data: histogramData[0].data},
                    {histogramType:"riskFactors", data: histogramData[1].data,}
                ]
            }
            else {
                    const sliced0 = histogramData[0].data.slice(stInd, histItemsPerPage+stInd)
                    const sliced1 = histogramData[1].data.slice(stInd, histItemsPerPage+stInd)
                    slicedHistogram = [
                        {histogramType:"totalDocuments", data: sliced0},
                        {histogramType:"riskFactors", data: sliced1}
                    ]
                }
        }
        else {
            if(histogramData[0].data.length <= mobileHistItemsPerPage) {
                slicedHistogram = [
                    {histogramType:"totalDocuments", data: histogramData[0].data},
                    {histogramType:"riskFactors", data: histogramData[1].data,}
                ]
            }
            else {
                    const sliced0 = histogramData[0].data.slice(mobileStInd, mobileHistItemsPerPage + mobileStInd)
                    const sliced1 = histogramData[1].data.slice(mobileStInd, mobileHistItemsPerPage + mobileStInd)
                    slicedHistogram = [
                        {histogramType:"totalDocuments", data: sliced0},
                        {histogramType:"riskFactors", data: sliced1}
                    ]
                }
        }
                
            return slicedHistogram
        }

    const [slicedHist, setSlicedHist] = useState(()=>sliceHistogramData(histogramData))

    

    useEffect(() => {
        if(histogramData === null ) return
        setSlicedHist(()=>sliceHistogramData(histogramData))

    }, [histogramData, histItemsPerPage, mobileHistItemsPerPage, stInd, mobileStInd])
    
    useEffect(() => {
        if(!histogramData) return
        if(!isMobile) {
            if(histogramData[0].data.length > stInd + histItemsPerPage) {
                setIsRightDisabled(false)
                rightArrowRef.current?.removeAttribute("disabled")
            } else {
                setIsRightDisabled(true)
                rightArrowRef.current?.setAttribute("disabled","")
            }
            if(stInd > 0) {
                setIsLeftDisabled(false)
                leftArrowRef.current?.removeAttribute("disabled")
            } else {
                setIsLeftDisabled(true)
                leftArrowRef.current?.setAttribute("disabled","")
            }
        } else {
            if(histogramData[0].data.length > mobileStInd + mobileHistItemsPerPage) {
                setIsRightDisabled(false)
                rightArrowRef.current?.removeAttribute("disabled")
            } else {
                setIsRightDisabled(true)
                rightArrowRef.current?.setAttribute("disabled","")
            }
            if(mobileStInd > 0) {
                setIsLeftDisabled(false)
                leftArrowRef.current?.removeAttribute("disabled")
            } else {
                setIsLeftDisabled(true)
                leftArrowRef.current?.setAttribute("disabled","")
            }
        }
        

    }, [stInd, histogramData, mobileStInd, histItemsPerPage, mobileHistItemsPerPage])
   

    const handleLeftClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        if(!slicedHist) return
        
        if(isMobile) {
            setMobileStInd(prev => prev - mobileHistItemsPerPage)
            
        } 
        else {
            setStInd((prev) => prev - histItemsPerPage)
            
        }
    }
            

    const handleRightClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        if(!slicedHist) return
        
        if(isMobile) {
            setMobileStInd(prev => prev + mobileHistItemsPerPage)

        } 
        else {
            setStInd((prev) => prev + histItemsPerPage)
            
        }

    }


    const slicedDocs = documents.slice(0, currPage * docsPerPage)

let arr: {date: string, value: number}[] | null;
(!histogramData || !histogramData.length) ? arr = null : arr = histogramData[0].data.concat(histogramData[1].data)

const handleShowMoreClick = (e:  React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
 e.preventDefault()
 setCurrPage(prev => prev + 1)
 
    const btn = e.currentTarget as HTMLButtonElement
    

 if(
    (slicedDocs.length + docsPerPage) % documents.length === 0 || 
    slicedDocs.length + docsPerPage >= documents.length) 
    {
        
    btn.classList.add("hidden")
  }
}

  return (
    <div className='w-full font-inter text-lg/[21.78px] tracking-[0.02em] mb-[109px] mobile:mb-[13px]'>
        <h2 className='uppercase font-ferry font-black text-[30px]/[36px] mobile:text-[28px]/[33.6px] pb-4 mobile:pb-[10px] '>Общая сводка</h2>
        <p className='text-[#949494] pb-[27px] mobile:pb-[34px]'>Найдено <span>{arr && totalReviews(arr).toLocaleString('ru')}</span> вариантов</p>
        <div id='carousel' className=" flex items-center mb-[107px] mobile:mb-[57px]">
            <button className='leftAr  ' onClick={handleLeftClick} ref={leftArrowRef}>
                <LeftArrow isDisabled={isLeftDisabled}/>
            </button>
                <div className={`w-full grid grid-cols-[133px_auto] grid-flow-col mobile:grid-cols-[298px] grid-rows-1 mobile:grid-rows-[75px_65px] border-2 border-basic-blue-DEAFULT rounded-[10px] max-w-[1260px] mobile:max-w-[298px] h-[158px] mobile:h-[140px] mx-auto  `}>
                    <div className="bg-basic-blue-DEAFULT text-basic-white-DEAFULT font-medium text-xl/[24.2px] mobile:text-lg/[21.78px] py-[17px] mobile:py-0 flex flex-col mobile:flex-row justify-between mobile:justify-around items-center mobile:w-full ">
                        <p>Период</p>
                        <p>Всего</p>
                        <p>Риски</p>
                    </div>
                    <>
                    {isLoading 
                    ? 
                    <div className='flex w-full flex-col justify-center items-center gap-[11px]'>
                        <Loading styles='w-[50px] h-[50px] mobile:w-[36px] mobile:w-[36px]'/>
                        <p>Загружаем данные</p>
                    </div>                    
                    :  
                    <>
                        
{ !histogramData 
? (
    <div className="w-full flex justify-center items-center ">Информация об организации отстствует</div>
)
: (

        !!slicedHist && slicedHist[0].data.map(item => {
        let div;
  
        slicedHist[1].data.map(it => {
        
            if(item.date !== it.date) return;
            
                div = ( 
                    <div className="min-w-[137px] mobile:w-[298px] my-[17px] flex flex-col mobile:flex-row justify-between  mobile:pl-[17px] items-center border-r-2 border-[rgba(148,_148,_148,_0.4)]" key={item.date}>
                        <p className='mobile:w-[33%] mobile:mr-[40px]'>{formatDate(item.date)}</p>
                        <p className='mobile:w-[33%] mobile:mr-[40px]'>{item.value}</p>
                        <p className='mobile:w-[33%]'>{it.value}</p>
                    </div>
                    )              
            })
            
        return div
        
    })
)
}
                    </>
                    }
                    </>
                   
                </div>
            <button className='rightAr ' onClick={handleRightClick} ref={rightArrowRef}>
                <RightArrow isDisabled={isRightDisabled}/>
            </button>
        </div>
        <h2 className='uppercase font-ferry font-black text-[30px]/[36px] mobile:text-[28px]/[33.6px] pb-[58px] mobile:pb-[34px]'>Список документов</h2>
        <div className=" cardList w-full grid grid-cols-[repeat(auto-fill,_minmax(640px,_1fr))] mobile:grid-cols-[repeat(auto-fill,_minmax(335px,_1fr))] grid-rows-[repeat(auto-fill,_694px)] gap-[38px] mobile:gap-[20px] flex-wrap  mb-[38px] mobile:pr-[26px]">

            <>
            {
                isLoadingDoc
            ?  
            (<Loading styles='w-[50px] h-[50px] mobile:w-[36px] mobile:w-[36px]'/>)
            : 
            slicedDocs.map(item => {
                const { id, issueDate, url, sourceName, title, content, attributes  } = item
                
                const date = new Date(issueDate);
                
                const sanitizedTitle = DOMPurify.sanitize(title.markup as string);
                const sanitizedContent = DOMPurify.sanitize(content.markup);
                 
                const parsedContent = parse(sanitizedContent);
                const parsedTitle = parse(sanitizedTitle)
                
                const showAttributes = (attributes: IDocData["attributes"]) => {
                    let prop: keyof typeof attributes;
                    for (prop in attributes) {
                        if(attributes[prop] !== true) {
                            return 
                        } else {
                        let output = [""]
                            switch (prop) {
                                case "isTechNews":
                                    output.push("Технические новости");
                                    console.log(output,"output1")
                                    break;
                                case "isAnnouncement":
                                    output.push("Анонс");
                                    console.log(output,"output2")
                                    break;
                                case "isDigest":
                                    output.push("Сводка новостей"); 
                                    console.log(output,"output3")
                                    break;  
                                    default: output = [""]                
                            }
                            console.log(output,"output end")
                            return output
                        }
                        
                    }
                    
                }
                showAttributes(attributes)
            
            return (
                        <Card 
                        key={id}
                        issueDate= {date.toLocaleDateString()}
                        url={url}
                        sourceName={sourceName}
                        sourceUrl={takeURL({url,sourceName})}
                        title={title.text} 
                        content={parsedContent}
                        attributes={showAttributes(attributes)}
                        words={attributes.wordCount}
                        
                        img = {findImgSrc(parsedContent as string)}
                        />
            
                    )}
                )
            }
            </>

        </div>
        <div className="flex justify-center mobile:justify-start">
            {
                slicedDocs.length === documents.length 
                ? 
                null
                :
                <Button 
                title='Показать больше'
                containerStyles={` w-[305px] mobile:w-[335px] h-[59px] bg-second-blue rounded-[5px]  `}
                textStyles={`font-medium text-basic-white-DEAFULT text-[22px]/[26.63px] mobile:text-[20px]/[24.2px] tracking-[0.04em] `}
                handleClick={handleShowMoreClick}
                />
                 
            }
            
        </div>
    </div>
  )
}

export default Reviews