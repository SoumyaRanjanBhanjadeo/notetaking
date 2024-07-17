import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './components/Layout'
import Readnote from './components/Readnote'
import Createnote from './components/Createnote'
import Updatenote from './components/Updatenote'
import Home from './pages/Home'
import ErrorPage from './pages/Errorpage'
import './App.css'


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "/read/:id", element: <Readnote /> },
      { path: "/create", element: <Createnote /> },
      { path: "/update/:id", element: <Updatenote /> },
    ]
  }
])


function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
