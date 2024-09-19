import React, { useEffect, useState } from 'react'

const useMobileCheck = () => {
    const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);
    const [histMinWidth] = useState<number>(137)
    const [histItemsPerPage, setHistItemsPerPage] = useState<number>(Math.floor((window.innerWidth - 120 - 78 - 133) / histMinWidth))
    const [itemsPerPage, setItemsPerPage] = useState<number>(3)
    const [itemWidth] = useState<number>(400)

    useEffect(() => {
        const handleResize = () => {
          setIsMobile(window.innerWidth < 768)
          setHistItemsPerPage(Math.floor((window.innerWidth - 120 - 78 - 133) / histMinWidth))
          setItemsPerPage(Math.floor((window.innerWidth - 51 - 43 - 39 - 39) / itemWidth))

        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
  return { isMobile, histItemsPerPage, itemsPerPage, histMinWidth };
};

export default useMobileCheck