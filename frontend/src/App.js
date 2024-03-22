import "./App.css";
import { createContext, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import Blogs from "./components/Blogs";
import BlogDetails from "./components/BlogDetails";
import Navbar from "./components/Navbar";

export const UserContext = createContext();

function App() {
  const [user, setUser] = useState(null);
  return (
    <Router>
      <UserContext.Provider value={{ user, setUser }}>
        <div className="App">
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogs/:blogId" element={<BlogDetails />} />
          </Routes>
        </div>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
