import React, { useState } from "react";

export default function FileUpload({ onUpload }) {
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onUpload) onUpload(file);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="file"
        accept=".csv,.xlsx"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button type="submit">Upload & Distribute</button>
    </form>
  );
}
