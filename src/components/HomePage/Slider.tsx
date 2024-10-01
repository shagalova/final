import React, { useEffect, useRef, useState } from 'react'
import { SliderCard } from '.'
import { LeftArrow } from '../common' 
import { RightArrow } from '../common'
import { sliders } from '../../utils/data'
import useMobileCheck from '../../utils/hooks/useMobileCheck'
import { ISlider } from '../../types'


const Slider = () => {

  // const [isDisabledLeft, setIsDisabledLeft] = useState<boolean>(true)
  // const [isDisabledRight, setIsDisabledRight] = useState<boolean>(true)
  const sliderRef = useRef<HTMLDivElement>(null)
  const { isMobile } = useMobileCheck()
 
  const {itemsPerPage} = useMobileCheck()
  const [mobileItemsPerPage] = useState<number>(1)

  const [stInd, setStInd] = useState<number>(0)
  const [mobileStInd, setMobileStInd] = useState<number>(0)
  
  // const leftRef = useRef<HTMLButtonElement>(null)
  // const rightRef = useRef<HTMLButtonElement>(null)


    const sliceSlider = (sliders: ISlider[]) => {
      let slicedSliders: ISlider[] = []
      if(isMobile) {
      
        slicedSliders = sliders.slice(mobileStInd, mobileItemsPerPage+mobileStInd)
      } else {
        slicedSliders = sliders.slice(stInd,itemsPerPage+stInd)  
      }
      return slicedSliders
    }
    
  const [slicedSliders, setSlicedSliders] = useState(()=>sliceSlider(sliders))

  useEffect(() => {
    
    setSlicedSliders(()=>sliceSlider(sliders))
    

}, [sliders, itemsPerPage, mobileItemsPerPage, stInd, mobileStInd])


const handleLeftArrowClick = () => {

  if(isMobile) {
    setMobileStInd(prev => prev - mobileItemsPerPage)
    if(mobileStInd === 0) {
      setMobileStInd(sliders.length-mobileItemsPerPage)
    }
  } else {
    setStInd(prev => prev - itemsPerPage)
    if(stInd === 0) {
      
      setStInd(sliders.length-itemsPerPage)
    }
  }
  
}

const handleRightArrowClick = () => {

  if(isMobile) {
    setMobileStInd(prev => prev + mobileItemsPerPage)
    if(mobileStInd === sliders.length-mobileItemsPerPage) {
      setMobileStInd(0)
    }
  } else {
    setStInd(prev => prev + itemsPerPage)
    if(stInd === sliders.length-itemsPerPage) {
      setStInd(0)
    }

  }

}

// useEffect(() => {
  
//   if(!isMobile) {
//       if(sliders.length > stInd + itemsPerPage) {
//           setIsDisabledRight(false)
//           rightRef.current?.removeAttribute("disabled")
//       } else {
//           setIsDisabledRight(true)
//           rightRef.current?.setAttribute("disabled","")
//       }
//       if(stInd > 0) {
//           setIsDisabledLeft(false)
//           leftRef.current?.removeAttribute("disabled")
//       } else {
//           setIsDisabledLeft(true)
//           leftRef.current?.setAttribute("disabled","")
//       }
//   } else {
//       if(sliders.length > mobileStInd + mobileItemsPerPage) {
//           setIsDisabledRight(false)
//           rightRef.current?.removeAttribute("disabled")
//       } else {
//           setIsDisabledRight(true)
//           rightRef.current?.setAttribute("disabled","")
//       }
//       if(mobileStInd > 0) {
//           setIsDisabledLeft(false)
//           leftRef.current?.removeAttribute("disabled")
//       } else {
//           setIsDisabledLeft(true)
//           leftRef.current?.setAttribute("disabled","")
//       }
//   }
  

// }, [stInd, mobileStInd, itemsPerPage, mobileItemsPerPage])


  return (
    <div className='wrapper  flex justify-center items-center w-full '>
      
      <button className='leftAr cursor-pointer ' onClick={handleLeftArrowClick} >
        {/* <LeftArrow isDisabled={isDisabledLeft} /> */}
        <LeftArrow />

      </button>
        <div className="window  overflow-hidden w-[calc(100%-80px)]" ref={sliderRef}>

            <div className={`all-pages-container flex justify-center w-full  gap-x-[30px] mobile:gap-x-0 ease-in-out transition-transform duration-300 `} >
                
              {
               slicedSliders.length > 0 && slicedSliders.map((item,index) => (
                  <SliderCard key={index} icon={item.icon} text={item.text} />
                ))
              }

            </div>
          </div>
      <button className='rightAr cursor-pointer ' onClick={handleRightArrowClick} >
        {/* <RightArrow isDisabled={isDisabledRight} /> */}
        <RightArrow />
      </button>
      
        
    </div> 
  )
}

export default Slider