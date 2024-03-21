import {React, useState} from "react";

const Blog = () => {
    const[title, setTitle] = useState("");
    const[author, setAuthor] = useState("");
    const[publicationDate, setPublicationDate] = useState("");
    const[content, setContent] = useState("");

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
        content: content
    };

    const token = localStorage.getItem("token")
    fetch("http://localhost:8080/api/blogs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(postData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Registration successful!", data);
      })
      .catch((error) => {
        console.error("Error registering user:", error);
      });
 }

  return (
    <div>
      <div className="w-[300px] m-auto mt-[200px]">
        <h1 className="text-center text-xl font-bold text-gray-800 m-2 text-2xl">
          Blog
        </h1>
        <form className="register-form flex flex-col gap-4 border h-full border-black p-10">
          <input
            type="title"
            label="title"
            placeholder="title"
            name="title"
              onChange={inputChangeHandler}
          />

        

          <input
            type="author"
            label="author"
            placeholder="author"
            name="author"
              onChange={inputChangeHandler}
          />

          <input
            type="publicationDate"
            label="publicationDate"
            placeholder="publicationDate"
            name="publicationDate"
              onChange={inputChangeHandler}
          />

<textarea
          className="border border-gray-400 rounded-md p-1 h-20"
            type="content"
            label="content"
            placeholder="content"
            name="content"
              onChange={inputChangeHandler}
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
