import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TiEdit } from "react-icons/ti";
import { AiOutlineDelete } from "react-icons/ai";
import { MdOutlineLocalPostOffice } from "react-icons/md";
import { UserContext } from "../App";

const BlogDetails = () => {
  const { blogId } = useParams();
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [blogDetails, setBlogDetails] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publicationDate, setPublicationDate] = useState("");
  const [content, setContent] = useState("");
  const [commentEditMode, setCommentEditMode] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const commentChangeHandler = (event) => {
    setComment(event.target.value);
  };

  const commentSaveHandler = () => {
    const postData = {
      commenter: user?.username,
      comment: comment,
    };
    const token = localStorage.getItem("token");
    fetch(
      `https://blog-app-full-stack.onrender.com/api/blogs/${blogId}/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(postData),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setCommentEditMode(false);
        getBlogDetails()
        console.log("Data received:", data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const inputChangeHandler = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    console.log(value);
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
        console.log("blogs are created successful!", data);
      })
      .catch((error) => {
        console.error("Error registering user:", error);
      });
  };

  const getBlogDetails = () => {
    fetch(`https://blog-app-full-stack.onrender.com/api/blogs/${blogId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setBlogDetails(data?.blog);
          setComments(data?.blog?.comments);
          console.log("Data received:", data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
  }

  useEffect(() => {
    getBlogDetails()
  }, []);

  const deleteHundler = () => {
    const token = localStorage.getItem("token");
    fetch(`https://blog-app-full-stack.onrender.com/api/blogs/${blogId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        navigate("/");
        console.log("Data received:", data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const saveHandler = () => {
    const putData = {
      title: title,
      author: author,
      publicationDate: publicationDate,
      content: content,
    };
    const token = localStorage.getItem("token");
    fetch(`https://blog-app-full-stack.onrender.com/api/blogs/${blogId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(putData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setEditMode(false);
        setBlogDetails(data.blog);
        console.log("Data received:", data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  const editHandler = () => {
    setEditMode(true);
    setTitle(blogDetails.title);
    setAuthor(blogDetails.author);
    const convertedDate = formatDate(blogDetails.publicationDate);
    setPublicationDate(convertedDate);
    setContent(blogDetails.content);
  };
  return (
    <div className="flex justify-evenly mt-[180px]">
      <div>
        <div className="flex justify-between items-center w-[500px]">
          <h1 className="text-4xl text-[#064997] font-bold text-center my-4">
            BlogDetails
          </h1>

          <div className="flex">
            {!editMode && (
              <TiEdit
                onClick={editHandler}
                className="text-3xl text-green-500 "
              />
            )}
            {editMode && (
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setEditMode(false);
                  }}
                  className="border rounded-lg px-2 py-1 bg-red-500 text-white font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={saveHandler}
                  className="border rounded-lg px-2 py-1 bg-blue-500 text-white font-semibold"
                >
                  Save
                </button>
              </div>
            )}

            {!editMode && (
              <AiOutlineDelete
                onClick={deleteHundler}
                className="text-3xl text-red-500"
              />
            )}
          </div>
        </div>
        <div className="w-[500px] border border-black h-[450px]  shadow-md shadow-blue-400 cursor-pointer">
          <div className="flex flex-col text-semibold text-xl gap-8 text-center m-[10%]">
            {!editMode && (
              <div id="read-form">
                <div className="font-bold text-3xl">{blogDetails.title}</div>
                <div>{blogDetails.content}</div>
                <div>{blogDetails.publicationDate}</div>
                <div className="text-[#FF8665] text-4xl font-semibold">
                  {blogDetails.author}
                </div>
              </div>
            )}

            {editMode && (
              <div id="edit-form">
                <form className="register-form flex flex-col gap-4  h-full border-black ">
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
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl text-[#064997] font-bold text-center my-4">
            Comments
          </h1>
          {!commentEditMode && (
            <MdOutlineLocalPostOffice
              onClick={() => {
                setCommentEditMode(true);
              }}
              className="text-3xl text-green-500 "
            />
          )}

          {commentEditMode && (
            <div className="flex gap-2">
              <button className="border rounded-lg px-2 py-1 bg-red-500 text-white font-semibold">
                Cancel
              </button>
              <button
                onClick={commentSaveHandler}
                className="border rounded-lg px-2 py-1 bg-blue-500 text-white font-semibold"
              >
                Save
              </button>
            </div>
          )}
        </div>

        <div className="gap-4 border h-[450px] border-black p-10 w-[500px]">
          {commentEditMode && (
            <input
              onChange={commentChangeHandler}
              className="h-[10%] border border-black rounded-lg p-2 w-[80%]"
              type="text"
              placeholder="comment"
              name="comment"
              value={comment}
            />
          )}

          {comments.map((item) => (
            <div className="text-lg font-semibold">{item.comment}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
