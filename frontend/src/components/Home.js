import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch("https://blog-app-full-stack.onrender.com/api/blogs")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setBlogs(data.blog);
        console.log("Data received:", data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <>
      <h1 className="text-blue-600 text-3xl m-4">Blogs</h1>

      <div className="grid gap-20 grid-cols-4 m-10">
        {blogs.map((item) => (
            <Link to={`/blogs/${item._id}`}>
          <div className="p-[5%] gap-2 border border-black rounded-lg  flex flex-col justify-center items-center mt-[10%] hover:bg-green-100 cursor-pointer shadow-md shadow-green-900">
            <div className="font-bold text-lg">{item.title}</div>
            <div className="font-semibold">{item.content}</div>
            <div className="font-semibold">{item.publicationDate}</div>
            <div className="font-bold text-green-600 text-2xl">
              {item.author}
            </div>
          </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Home;
