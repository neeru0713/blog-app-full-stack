import { React, useState } from "react";
import {  useNavigate } from "react-router-dom";

const Blog = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publicationDate, setPublicationDate] = useState("");
  const [content, setContent] = useState("");

  const inputChangeHandler = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    if (name === "title") {
      setTitle(value);
    }
    if (name === "author") {
      setAuthor(value);
    }
    if (name === "publicationDate") {
      setPublicationDate(value);
    }
    if (name === "content") {
      setContent(value);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const postData = {
      title: title,
      author: author,
      publicationDate: publicationDate,
      content: content,
    };

    const token = localStorage.getItem("token");
    fetch("http://localhost:8080/api/blogs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(postData),
    })
      .then((response) => response.json())
      .then((data) => {
        navigate("/");
        console.log("blogs are created successful!", data);
      })
      .catch((error) => {
        console.error("Error registering user:", error);
      });
  };

  return (
    <div>
      <div className="w-[300px] m-auto mt-[200px]">
        <h1 className="text-center text-xl font-bold text-gray-800 m-2 text-2xl">
          Blog
        </h1>
        <form className="register-form flex flex-col gap-4 border h-full border-black p-10">
          <input
            type="text"
            placeholder="title"
            name="title"
            onChange={inputChangeHandler}
            value={title}
          />

          <input
            type="text"
            placeholder="author"
            name="author"
            onChange={inputChangeHandler}
            value={author}
          />

          <input
            type="date"
            placeholder="publicationDate"
            name="publicationDate"
            onChange={inputChangeHandler}
            value={publicationDate}
          />

          <textarea
            className="border border-gray-400 rounded-md p-1 h-20"
            type="text"
            placeholder="content"
            name="content"
            onChange={inputChangeHandler}
            value={content}
          />

          <button
            onClick={submitHandler}
            className="border border-gray-400 hover:bg-blue-500 hover:text-white font-semibold rounded-xl py-1"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Blog;
