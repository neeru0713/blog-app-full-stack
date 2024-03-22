import React, {useContext} from "react";
import { Link } from "react-router-dom";
import { UserContext} from "../App";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
    const { user, setUser } = useContext(UserContext); 


const logoutHandler = () =>{
    setUser(null)
    localStorage.setItem("token", "")
}
  return (
    <div className="flex bg-blue-700 p-3 justify-between">
      <div className="flex gap-1 text-semibold">
      <Link to="/">
        <div className="text-white border rounded-lg py-1 px-2">Home</div>
        </Link>
        <Link to="/Blogs">
        <div className="text-white border rounded-lg py-1 px-2">CreateBlog</div>
        </Link>
   
      </div>
      <div className="text-white text-2xl">Blogs</div>
      {user && (<div className="flex gap-4">  
      <div className="flex justify-between items-center gap-1">
      <FaUserCircle className="text-white text-xl"/>
      <div className="text-white font-semibold text-xl">{user?.username}</div>
      </div>
      <button onClick={logoutHandler} className="text-white border rounded-lg py-1 px-2">Logout</button>
      
     
      </div>)}
      {!user && (<div className="flex gap-1 text-semibold">
        <Link to="/Register">
        <button className="text-white border rounded-lg py-1 px-2">register</button>
        </Link>
      <Link to="/Login">
      <button className="text-white border rounded-lg py-1 px-2">login</button>
      </Link>
       
      </div>)}
    
      
    </div>
  );
};

export default Navbar;
