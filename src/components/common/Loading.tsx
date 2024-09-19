import React from 'react'
import { LoadingProps } from '../../types'

const Loading = ({styles}: LoadingProps) => {
  return (
    <div className={styles}>
        <img src={process.env.PUBLIC_URL + "/spinner.svg"} alt="loader" className='w-full h-full rounded-full animate-spin mx-auto' />
    </div>
  )
}

export default Loading
