import React, { useEffect, useState } from 'react';
import { Button } from '../common';
import { BASE_PATH, DOCUMENTS, OBJECTSEARCH, SEARCH_HISTOGRAMS } from '../../utils/vars';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { selectUser } from '../../redux/users/userSlice';
import { clearDocuments, isLoading, isLoadingDoc, isReady, selectDocuments, selectHistogramData, selectId, setDocuments, setHistogramData, setObjectIds } from '../../redux/search/searchSlice';
import { useNavigate } from 'react-router-dom';
import { makeRequest, validateInn } from '../../utils/otherFunc';
import { IDocData, IDocuments, IObjectIds } from '../../types';

const SearchForm = () => {
    const [inn, setInn] = useState<string>("")
    const [docQuantity, setDocQuantity] = useState<number>(0)
    const [tone, setTone] = useState<string>("any")
    const [maxFullness, setMaxFullness] = useState<boolean>(true)
    const [mainRole, setMainRole] = useState<boolean>(true)
    const [riskFactor, setRiskFactor] = useState<boolean>(false)
    const [techNews, setTechNews] = useState<boolean>(false)
    const [announcement, setAnnouncement] = useState<boolean>(true)
    const [newsReport, setNewsReport] = useState<boolean>(false)
    const [startDate, setStartDate] = useState<string>("")
    const [endDate, setEndDate] = useState<string>("")
    const [showError, setShowError] = useState<boolean>(false)
    const [showErrorQuantity, setShowErrorQuantity] = useState<boolean>(false)
    const [showErrorDate, setShowErrorDate] = useState<boolean>(false)
    
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const histogramData = useAppSelector(selectHistogramData)
    const items = useAppSelector(selectId)
    const documents = useAppSelector(selectDocuments)

    const isAuth = useAppSelector(selectUser)

    useEffect(() => {
      dispatch(setHistogramData(null));
      dispatch(setObjectIds(null));
      dispatch(clearDocuments());
    },[])

    
    const fetchHistogram = async () => {
      const urlHistogram = `${BASE_PATH}${SEARCH_HISTOGRAMS}`
        
      const requestHistogram = 
      {
          "intervalType": "month",
          "histogramTypes": [
            "totalDocuments",
            "riskFactors"
          ],
          "issueDateInterval": {
            "startDate": `${startDate}`,
            "endDate": `${endDate}`
          },
          "searchContext": {
            "targetSearchEntitiesContext": {
              "targetSearchEntities": [
                {
                  "type": "company",
                  "inn": `${inn}`
                }
              ],
              "onlyMainRole": mainRole,
              "tonality": `${tone}`,
              "onlyWithRiskFactors": riskFactor,
              "riskFactors": {
                "and": [],
                "or": [],
                "not": []
              },
              "themes": {
                "and": [],
                "or": [],
                "not": []
              }
            },
            "searchEntitiesFilter": {
              "and": [],
              "or": [],
              "not": []
            },
            "locationsFilter": {
              "and": [],
              "or": [],
              "not": []
            },
            "themesFilter": {
              "and": [],
              "or": [],
              "not": []
            }
          },
          "searchArea": {
            "includedSources": [],
            "excludedSources": [],
            "includedSourceGroups": [],
            "excludedSourceGroups": [],
            "includedDistributionMethods": [],
            "excludedDistributionMethods": []
          },
          "attributeFilters": {
            "excludeTechNews": techNews,
            "excludeAnnouncements": announcement,
            "excludeDigests": newsReport
          },
          "similarMode": "none"
        }

        try {
          dispatch(isLoading())

          const result = await makeRequest(urlHistogram, "POST", requestHistogram, isAuth);
          // let response = await fetch(urlHistogram, {
          //     method: "POST",
          //     body: JSON.stringify(requestHistogram),
          //     headers: {
          //         "Authorization":`Bearer ${isAuth}`,
          //         "Content-Type": "application/json",
          //         "Accept": "application/json",
          //     },
          // });
          // const result = await response.json();
          
          if(!result.data.length) {
            console.log("Информация об организации отсутсвует")
          dispatch(setHistogramData(null))
          } else {
             dispatch(setHistogramData(result.data))
             fetchObjectId(); 
            
          }
          dispatch(isReady())
        } catch (error) {
          console.error("error", error);          
        }

    }
    
    
    const fetchObjectId = async () => {
       
      const urlObjectSearch = `${BASE_PATH}${OBJECTSEARCH}`;
      const requestObjectSearch = {
          "limit": docQuantity,
          "sortType": "issueDate",
          "sortDirectionType": "desc",
          "issueDateInterval": {
            "startDate": `${new Date(startDate).toISOString()}`,
            "endDate": `${new Date(endDate).toISOString()}`
          },
          "searchContext": {
            "targetSearchEntitiesContext": {
              "targetSearchEntities": [
                {
                  "type": "company",
                  "sparkId": null,
                  "entityId": null,
                  "inn": `${inn}`,
                  "maxFullness": maxFullness,
                  "inBusinessNews": null
                }
              ],
              "onlyMainRole": mainRole,
              "tonality": `${tone}`,
              "onlyWithRiskFactors": riskFactor,
              "riskFactors": {
                "and": [],
                "or": [],
                "not": []
              },
              "themes": {
                "and": [],
                "or": [],
                "not": []
              }
            },
            "searchEntitiesFilter": {
              "and": [],
              "or": [],
              "not": []
            },
            "locationsFilter": {
              "and": [],
              "or": [],
              "not": []
            },
            "themesFilter": {
              "and": [],
              "or": [],
              "not": []
            }
          },
          "searchArea": {
            "includedSources": [],
            "excludedSources": [],
            "includedSourceGroups": [],
            "excludedSourceGroups": [],
            "includedDistributionMethods": [],
            "excludedDistributionMethods": []
          },
          "attributeFilters": {
            "excludeTechNews": techNews,
            "excludeAnnouncements": announcement,
            "excludeDigests": newsReport
          },
          "similarMode": "none"
        }
      try {
          // let response = await fetch(urlObjectSearch, {
          //     method: "POST",
          //     body: JSON.stringify(requestObjectSearch),
          //     headers: {
          //         "Authorization":`Bearer ${isAuth}`,
          //         "Content-Type": "application/json",
          //         "Accept": "application/json",
          //     },
          // });
          
          // const result = await response.json();
          const result = await makeRequest(urlObjectSearch, "POST", requestObjectSearch, isAuth);
          
          if(!result.items.length) {
            
            console.log("Публикации не найдены")
          } else {
            const items: IObjectIds["items"] = result.items
            const arrIds = items.map(item => {
              return item.encodedId
            })
            dispatch(setObjectIds(arrIds))
            
            searchDocumentsById(arrIds);  
            
          }
          
        } catch (error) {
          console.error("error", error);
          
        }
      }

      const searchDocumentsById = async (arrIds: string[]) => {
            dispatch(isLoadingDoc(true))

             const urlDocuments = `${BASE_PATH}${DOCUMENTS}`;
             const requestDocuments = {
    
                     "ids": arrIds
         }
        //  const response = await fetch(urlDocuments, {
        //        method: "POST",
        //        body: JSON.stringify(requestDocuments),
        //        headers: {
        //            "Authorization":`Bearer ${isAuth}`,
        //            "Content-Type": "application/json",
        //            "Accept": "application/json",
        //        },
        //      }) 
            //  const result: IDocuments[] = await response.json();  
             
             const result: IDocuments[] = await makeRequest(urlDocuments, "POST", requestDocuments, isAuth);

    
             result.map(item => {
    
                if("fail" in item) {
                    console.log("fail")
                    console.log(`По Id ${item.fail.id} ${item.fail.errorMessage}`)                
                    return 
    
                } else {
                    const data: IDocData = {
                        id: item.ok.id,
                        issueDate: item.ok.issueDate,
                        url: item.ok.url,
                        sourceName: item.ok.source.name,
                        title: {
                        text: item.ok.title.text,
                        markup: item.ok.title.markup
                        },
                        content: {
                        markup: item.ok.content.markup
                        },    
                        attributes: {
                            isTechNews: item.ok.attributes.isTechNews,
                            isAnnouncement: item.ok.attributes.isAnnouncement,
                            isDigest: item.ok.attributes.isDigest,
                            wordCount: item.ok.attributes.wordCount,
                        } 
    
                    }
               dispatch(setDocuments(data))  
                    dispatch(isLoadingDoc(false))
                }
                return item
             })
     }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        dispatch(setObjectIds(null))
        dispatch(clearDocuments())
      
          fetchHistogram();

          navigate("/output")
    }

   

    const handleChange = (e: React.FocusEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (/[^0-9]/.test(e.target.value)) {
           console.log('ИНН может состоять только из цифр');
           setShowError(true)
        }
        else if(e.target.value.length !== 10) { 
            console.log('ИНН может состоять только из 10 цифр')
            setShowError(true)
        } else {
            const result = validateInn(e.target.value);
            if(!result) {
                setShowError(true)
            } else {
                setInn(e.target.value)
                setShowError(false)     
            }
            
        }
    }
    const handleBlurQuantity = (e: React.FocusEvent<HTMLInputElement>) => {
        e.preventDefault();

        if(+e.target.value < 1 || +e.target.value > 1000)  {
            setShowErrorQuantity(true);
        } else {
            setDocQuantity(+e.target.value)
            setShowErrorQuantity(false)
        }
    }

    const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setStartDate(e.target.value)
    }

    const handleEndtDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setEndDate(e.target.value)
    }

    useEffect(() => {
        if(!startDate || !endDate) return;
        const date1 = new Date(startDate);
        const date2 = new Date(endDate);
        const currentDate = new Date()
        if (date1.getTime() > date2.getTime() || date1.getTime() > currentDate.getTime() || date2.getTime() > currentDate.getTime()) {
            setShowErrorDate(true)
        } else {
            setShowErrorDate(false)
        }
        
    },[startDate, endDate])

  return (
    <div className="w-[872px] medium-screen:w-[650px] mobile:w-full h-[543px] medium-screen:h-[600px] mobile:h-[688px] pl-11 medium-screen:pl-[14px] mobile:pl-[14px] pr-10 medium-screen:pr-[14px] mobile:pr-[20px] pt-9 mobile:pt-[24px] pb-8 medium-screen:mb-[520px] mobile:mb-[450px] border rounded-[10px] shadow-[0px_0px_20px_0px_rgba(0,_0,_0,_0.2)] text-basic-black-DEAFULT text-lg/[21.78px]">
    <form 
    id='searchForm'
    action="#" 
    className=" " 
    onSubmit={handleSubmit}>
        <div className="flex justify-between">
        <fieldset className="flex flex-col">
            <label htmlFor="inn" className="mb-5">ИНН компании<span className={showError ? 'text-[#FF5959]' : ''}>*</span></label>
            <input  
            name="inn"
            id="inn" 
            type="text" 
            minLength={10}
            maxLength={10} 
            placeholder="10 цифр"  
            className={` w-[242px] mobile:w-[335px] h-11 border border-[#C7C7C7] rounded-[5px] shadow-[0px_0px_20px_0px_rgba(0,_0,_0,_0.05)] px-[17px]  text-main focus:outline-none placeholder:text-center ${showError ? 'text-[#FF5959] border-[#FF5959]' : 'text-basic-black-DEAFULT'} `}
            required 
            
            pattern="[0-9]{10}"
            title="Только 10 цифр"
            onBlur={handleChange} />
            <div className="h-[30px] w-[242px] mobile:w-[335px] text-[#FF5959] text-main text-center tracking-[0.01em]">
                {showError  ? <p>Введите корректные данные</p> : null}
            </div>
            <label htmlFor="tone" className="mb-5">Тональность</label>
            <select 
            name="tone" 
            id="tone" 
            className="mb-[21px] w-[242px] mobile:w-[335px] h-11 border border-[#C7C7C7] rounded-[5px] shadow-[0px_0px_20px_0px_rgba(0,_0,_0,_0.05)] px-[17px] text-basic-black-DEAFULT text-main focus:outline-none" 
            onChange={(e)=>setTone(e.target.value)}
            >
                <option value="any"> Любая</option>
                <option value="negative">Негативная</option>
                <option value="positive">Позитивная</option>
            </select>
            <label htmlFor="quantity" className="mb-5">Количество документов в выдаче<span className={showErrorQuantity ? 'text-[#FF5959]' : ''}>*</span></label>
            <input 
            name="quantity" 
            id="quantity" 
            type="number" 
            min={1} 
            max={1000} 
            placeholder="От 1 до 1000" 
            className= {` w-[242px] mobile:w-[335px] h-11 border border-[#C7C7C7] rounded-[5px] shadow-[0px_0px_20px_0px_rgba(0,_0,_0,_0.05)] px-[17px]  text-main focus:outline-none placeholder:text-center ${showErrorQuantity ? 'text-[#FF5959] border-[#FF5959]' : 'text-basic-black-DEAFULT'}` }
            required
            onBlur={handleBlurQuantity}/>
            <div className="h-[30px] w-[242px] mobile:w-[335px] text-[#FF5959] text-main text-center tracking-[0.01em]">
                {showErrorQuantity ? <p>Обязательное поле</p> : null}
            </div>    
        </fieldset>
        <fieldset className='mobile:hidden'>
            <div className="mb-[15px] ">
                <input 
                type="checkbox"
                id="maxCompleteness" 
                name="maxCompleteness" 
                className="w-5 h-5 "
                defaultChecked
                onChange={(e) => setMaxFullness(prev => !prev)}
                />
                <label htmlFor="maxCompleteness" className="">Признак максимальной полноты</label>
            </div>
            <div className="mb-[15px]">
                <input 
                type="checkbox"
                id="businessContext" 
                name="businessContext" 
                defaultChecked
                />
                <label htmlFor="businessContext">Упоминания в бизнес-контексте</label>
            </div>
            <div className="mb-[15px]">
                <input 
                type="checkbox"
                id="mainRole" 
                name="mainRole" 
                defaultChecked
                onChange={(e) => setMainRole(prev => !prev)}
                />
                <label htmlFor="mainRole">Главная роль в публикации</label>
            </div>
            <div className="mb-[15px]">
                <input 
                type="checkbox"
                id="riskFactor" 
                name="riskFactor" 
                onChange={(e) => setRiskFactor(prev => !prev)}
                />
                <label htmlFor="riskFactor">Публикации только с риск-факторами</label>
            </div>
            <div className="mb-[15px]">
                <input 
                type="checkbox"
                id="techNews" 
                name="techNews" 
                onChange={(e) => setTechNews(prev => !prev)}
                />
                <label htmlFor="techNews">Включать технические новости рынков</label>
            </div>
            <div className="mb-[15px]">
                <input 
                type="checkbox"
                id="announcement" 
                name="announcement" 
                onChange={(e) => setAnnouncement(prev => !prev)}
                defaultChecked
                />
                <label htmlFor="announcement">Включать анонсы и календари</label>
            </div>
            <div className="mb-[15px]">
                <input 
                type="checkbox"
                id="newsReport" 
                name="newsReport" 
                onChange={(e) => setNewsReport(prev => !prev)}
                />
                <label htmlFor="newsReport">Включать сводки новостей</label>
            </div>
        </fieldset>
        </div>
        <div className="flex mobile:flex-col items-baseline medium-screen:items-center gap-x-28 medium-screen:gap-x-12">
            <div className="w-[372px] medium-screen:w-[242px]">
        <fieldset>
            <legend className="mb-5">Диапазон поиска<span className={showErrorDate ? 'text-[#FF5959]' : ''}>*</span></legend>
            <div className="flex medium-screen:flex-col mobile:flex-col gap-x-5">
                <input 
                type="text"
                id="startDate"
                name="startDate"
                placeholder="Дата начала"
                className={ `w-[176px] medium-screen:w-[242px] mobile:w-[335px] medium-screen:mb-[20px] mobile:mb-[20px] h-11 border border-[#C7C7C7] rounded-[5px] shadow-[0px_0px_20px_0px_rgba(0,_0,_0,_0.05)] px-[17px] text-main focus:outline-none placeholder:text-center ${showErrorDate ? 'text-[#FF5959] border-[#FF5959]' : 'text-basic-black-DEAFULT'}`}
                required
                onChange={handleStartDateChange}
                onFocus={(e) => e.target.type="date"}
                onBlur={(e) => !e.target.value ? e.target.type="text": null} 
                
                />
                <input type="text"
                
                id="endDate"
                name="endDate"
                placeholder="Дата конца"
                className={` w-[176px] medium-screen:w-[242px] mobile:w-[335px] h-11 border border-[#C7C7C7] rounded-[5px] shadow-[0px_0px_20px_0px_rgba(0,_0,_0,_0.05)] px-[17px]  text-main focus:outline-none placeholder:text-center ${showErrorDate ? 'text-[#FF5959] border-[#FF5959]' : 'text-basic-black-DEAFULT'}`}
                required
                onChange={handleEndtDateChange}
                onFocus={(e) => e.target.type="date"}
                onBlur={(e) => !e.target.value ? e.target.type="text" : null} 
                  />
            </div>
            <div className="h-[30px] w-[372px] medium-screen:w-[242px] mobile:w-[335px] text-[#FF5959] text-main text-center tracking-[0.01em]">
                {showErrorDate ? <p>Введите корректные данные</p> : null}
            </div>    
        </fieldset>
        </div>
        <div className="">
        <Button 
        btnType="submit"
        isDisabled={(inn && !showErrorQuantity && !showErrorDate) ? false : true}
        title="Поиск"
        containerStyles="disabled:opacity-50 font-medium w-[305px] mobile:w-[335px] h-[59px] bg-second-blue rounded-[5px] text-basic-white-DEAFULT text-[22px]/[26.63px] mobile:text-[20px]/[24.2px]"
        />
        <span className="text-main text-[#949494]">* Обязательные к заполнению поля</span>
        </div>
</div>
    </form>
</div>
  )
}

export default SearchForm
