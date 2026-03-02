import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Pricing from "./pages/Pricing";
import Layout from "./components/layout/Layout";
import Blog from "./pages/Blog";
import Community from "./pages/Community";
import Features from "./pages/Features";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout/>}>
          <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/pricing" element={<Pricing/>}/>
        <Route path="/blog" element={<Blog/>}/>
        <Route path="/community" element={<Community/>}/>
        <Route path="/features" element={<Features/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;