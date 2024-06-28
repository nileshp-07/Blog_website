import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Signup  from './pages/Signup'
import Signin from './pages/Signin'
import  Blog from './pages/Blog'
import Blogs from './pages/Blogs'
import NewBlog from './pages/NewBlog'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Signin />} />
          <Route path="/blogs" element={<Blogs/>}/>
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="publish" element={<NewBlog/>} />
          <Route path="/*" element={<Navigate to="/blogs" replace />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App