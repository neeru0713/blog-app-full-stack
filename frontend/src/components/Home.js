import { React, useState, useEffect } from "react";

const Home = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/blogs")
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
    <div className="grid gap-20 grid-cols-4 m-10">
      {blogs.map((item) => (
        <div className="p-[5%] gap-2 border border-black rounded-lg  flex flex-col justify-center items-center mt-[10%] hover:bg-green-100 cursor-pointer shadow-md shadow-green-900">
          <div className="font-bold text-lg">{item.title}</div>
          <div className="font-semibold">{item.content}</div>
          <div className="font-semibold">{item.publicationDate}</div>
          <div className="font-bold text-green-600 text-2xl">{item.author}</div>
        </div>
      ))}
    </div>
  );
};

export default Home;
