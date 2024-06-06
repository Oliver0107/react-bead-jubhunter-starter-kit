import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'

import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import Landing from './components/Landing/Landing'
import Profile from './components/Profile/Profile'
import JobDetails from './components/JobDetails'
import CreateJob from './components/CreateJob'
import ModifyJob from './components/ModifyJob'
import { Provider } from 'react-redux'
import store from './redux'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        <Provider store={store}>
          <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/signin' element={<SignIn />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/jobdetails/:id' element={<JobDetails />} />
            <Route path="/createjob" element={<CreateJob />} />
            <Route path="/modifyjob/:id" element={<ModifyJob />} />

          </Routes>
        </Provider>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
)
