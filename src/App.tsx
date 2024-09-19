import React, { useEffect } from 'react';
import { HomePage } from './components/HomePage';
import { RegisterPage } from './components/RegisterPage';
import { SearchPage } from './components/SearchPage';
import { Route, Routes } from 'react-router-dom';
import { OutputPage } from './components/OutputPage';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { logout, selectTokenDate, selectUser } from './redux/users/userSlice';
import PrivateRoute from './routes/PrivateRoute';




function App() {
  const dispatch = useAppDispatch()

  const tokenDate = useAppSelector(selectTokenDate)

useEffect(() => {
  const now = new Date()
  if(!!tokenDate && now > new Date(tokenDate)) {
    
    dispatch(logout())
  }
 
},[tokenDate])

  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/auth' element={<RegisterPage />} />

      <Route element={<PrivateRoute />}>
        <Route path='/search' element={<SearchPage />} />
        <Route path='/output' element={<OutputPage />} />
      </Route>
      
     
     
    </Routes>
    
  );
}

export default App;
