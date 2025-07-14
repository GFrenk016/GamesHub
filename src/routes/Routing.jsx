import { Routes, Route } from 'react-router-dom'
import Layout from '../layout/Layout'
import Homepage from '../pages/homepage'
import ErrorPage from '../pages/error'

export default function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Homepage />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  )
}
