import { React, useState } from "react";
import { useNavigate } from "react-router-dom";

const Blog = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publicationDate, setPublicationDate] = useState("");
  const [content, setContent] = useState("");
  const [isEmptyTitle, setIsEmptyTitle] = useState(false);
  const [isEmptyAuthor, setIsEmptyAuthor] = useState(false);
  const [isEmptyPublicationDate, setIsEmptyPublicationDate] = useState(false);
  const [isEmptyContent, setIsEmptyContent] = useState(false);

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

    if (title === "") {
      setIsEmptyTitle(true);
    
    } else {
      setIsEmptyTitle(false);
    }

    if (author === "") {
      setIsEmptyAuthor(true);
      
    } else {
      setIsEmptyAuthor(false);
    }

    if (publicationDate === "") {
      setIsEmptyPublicationDate(true);
      
    } else {
      setIsEmptyPublicationDate(false);
    }

    if (content === "") {
      setIsEmptyContent(true);
    
    } else {
      setIsEmptyContent(false);
    }
    if(title === "" || author === "" || publicationDate === "" || content === ""){
      return;
    }



    const postData = {
      title: title,
      author: author,
      publicationDate: publicationDate,
      content: content,
    };

    const token = localStorage.getItem("token");
    fetch("https://blog-app-full-stack.onrender.com/api/blogs", {
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
            required
          />

          {isEmptyTitle && (
            <div className="bg-red-500 text-white font-semibold border rounded-lg p-2">
              Title cannot be empty
            </div>
          )}

          <input
            type="text"
            placeholder="author"
            name="author"
            onChange={inputChangeHandler}
            value={author}
            required
          />
          {isEmptyAuthor && (
            <div className="bg-red-500 text-white font-semibold border rounded-lg p-2">
              Author cannot be empty
            </div>
          )}

          <input
            type="date"
            placeholder="publicationDate"
            name="publicationDate"
            onChange={inputChangeHandler}
            value={publicationDate}
            required
          />

          {isEmptyPublicationDate && (
            <div className="bg-red-500 text-white font-semibold border rounded-lg p-2">
              Date cannot be empty
            </div>
          )}

          <textarea
            className="border border-gray-400 rounded-md p-1 h-20"
            type="text"
            placeholder="content"
            name="content"
            onChange={inputChangeHandler}
            value={content}
            required
          />

          {isEmptyContent && (
            <div className="bg-red-500 text-white font-semibold border rounded-lg p-2">
              Content cannot be empty
            </div>
          )}
          <button
            type="submit"
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
