import React, { useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const DeleteBooks = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const deleteBook = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/books/${id}`)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        alert("Error Occured Check Console");
        console.log(error);
      });
  };

  return <div className="p-4">
    <BackButton/>
    <h1 className="text-3xl my-4">Delete Book</h1>
    {loading ? <Spinner/> : ''}
    <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
    </div>
  </div>;
};

export default DeleteBooks;
