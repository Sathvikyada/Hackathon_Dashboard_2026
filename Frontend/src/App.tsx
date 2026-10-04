import { Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'
import { ToastContainer } from 'react-toastify'

import './App.css'
import logo from './assets/HUMXIII.png'
import type { Person } from './types/person'
import { getAllowedPages } from './services/routeService'

import Header from './components/header/Header'
import Home from './components/Home'
import Apply from './components/application/Apply'
import ApplicationStatus from './components/application_status/ApplicationStatus'
import Meals from './components/Meals'
import SignIn from './components/SignIn'
import Missing from './components/Missing'
import Unauthorized from './components/Unauthorized'
import ProtectedRoute from './components/ProtectedRoute'
import EditApplication from './components/application/EditApplication'
import Settings from './components/Settings'

import Applications from './components/admin/applications/Applications'
import Applicant from './components/admin/applications/Applicant'
import Scanner from './components/admin/Scanner'


function App() {
  const [user, setUser] = useState<Person | null>(null)
  const pageOptions = getAllowedPages(user)

  return (
    <> 
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
        />

      <section id="header"> 
        < Header logo={logo} user={user} setUser={setUser} pageOptions={pageOptions}/>
      </section>

      <main id="center">
        <Routes>
          <Route path="/" element={<Home user={user} />} />

          <Route 
            path="/apply" 
            element = {
              <ProtectedRoute user={user} pageOptions={pageOptions} option="Apply">
                {user && <Apply user={user} setUser={setUser} />}
              </ProtectedRoute>
            }
          />

          <Route 
            path="/application-status"
            element = {
              <ProtectedRoute user={user} pageOptions={pageOptions} option="Application Status">
                <ApplicationStatus user={user} setUser={setUser} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/edit-application"
            element = {
              <ProtectedRoute user={user} pageOptions={pageOptions} option="Edit Application">
                {user && <EditApplication user={user} setUser={setUser} />}
              </ProtectedRoute>
            }
          />

          <Route
            path="/meals"
            element = {
              <ProtectedRoute user={user} pageOptions={pageOptions} option="Meals">
                <Meals />
              </ProtectedRoute>
            }
          />

          <Route
            path="/settings"
            element = {
              <ProtectedRoute user={user} pageOptions={pageOptions} option="Settings">
                {user && <Settings user={user} setUser={setUser} />}
              </ProtectedRoute>
            }
          />

          <Route
            path="/sign-in"
            element={
              user
                ? <Navigate
                    to={user.organizer ? '/applications' : '/'}
                    replace
                  />
                : <SignIn setUser={setUser} />
            }
          />

          <Route
            path="/applications"
            element = {
              <ProtectedRoute user={user} pageOptions={pageOptions} option="Applications">
                {user && <Applications />}
              </ProtectedRoute>
            }
          />

          <Route
            path="/applicant/:id"
            element = {
              <ProtectedRoute user={user} pageOptions={pageOptions} option="Applicant">
                <Applicant />
              </ProtectedRoute>
            }
          />

          <Route
            path="/scanner"
            element = {
              <ProtectedRoute user={user} pageOptions={pageOptions} option="Scanner">
                {user && <Scanner user={user} />}
              </ProtectedRoute>
            }
          />

          <Route path="/unauthorized" element={<Unauthorized />} />

          <Route path="*" element={<Missing />} />
        </Routes>
      </main>
    </>
  )
}

export default App