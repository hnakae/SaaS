"use client";
import React, { useState, useEffect } from "react";

const Form = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileLabelText, setFileLabelText] = useState("No file chosen");
  const [formKey, setFormKey] = useState(0); // Add formKey state

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setSelectedFile(file);
    if (file) {
      setFileLabelText(file.name);
    } else {
      setFileLabelText("No file chosen");
    }
  };

  useEffect(() => {
    // This effect will trigger whenever selectedFile changes
    console.log("selectedFile changed:", selectedFile);
  }, [selectedFile]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (selectedFile) {
      // Save the file
      setSelectedFile(null);
      setFileLabelText("No file chosen");
      setFormKey((prevKey) => prevKey + 1); // Increment the formKey
    } else {
      console.log("No file selected");
    }
  };

  return (
    <form key={formKey} onSubmit={handleSubmit} encType="multipart/form-data">
      <label htmlFor="sgfFile">Select SGF File:</label>
      <input
        type="file"
        id="sgfFile"
        accept=".sgf"
        onChange={handleFileChange}
        style={{ display: "none" }} // Hide the default file input
      />
      <label
        htmlFor="sgfFile"
        className="custom-file-upload mx-2 outline px-4 py-1 cursor-pointer"
      >
        Select
      </label>
      <span>{fileLabelText}</span>
      <button className=" outline px-6 py-2 ml-4" type="submit">
        Upload
      </button>
    </form>
  );
};

export default Form;
