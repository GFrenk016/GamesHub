import { Routes, Route } from 'react-router-dom'
import Layout from '../layout/Layout'
import Homepage from '../pages/homepage'
import ErrorPage from '../pages/error'
import GenrePage from '../pages/genrepage'
import GamePage from '../pages/gamepage'
import SearchPage from '../pages/searchpage'
import RegisterPage from '../pages/register'
import LoginPage from '../pages/login'
import AccountPage from '../pages/account'

export default function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Homepage />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/games/:genre" element={<GenrePage />} />
        <Route path="/games/:slug/:id" element={<GamePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/register" element={<RegisterPage />}/>
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/account" element={<AccountPage />}/>
      </Route>
    </Routes>
  )
}
