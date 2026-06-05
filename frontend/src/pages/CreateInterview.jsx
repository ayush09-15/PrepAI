import { useState } from "react";

function CreateInterview() {
  const [formData, setFormData] = useState({
    title: "",
    role: "",
    difficulty: "Medium",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);
  };

  return (
    <div>
      <h1>Create Interview</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Interview Title"
          value={formData.title}
          onChange={handleChange}
        />

        <br />
        <br />

        <input
          type="text"
          name="role"
          placeholder="Role"
          value={formData.role}
          onChange={handleChange}
        />

        <br />
        <br />

        <select
          name="difficulty"
          value={formData.difficulty}
          onChange={handleChange}
        >
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>

        <br />
        <br />

        <button type="submit">
          Create Interview
        </button>
      </form>
    </div>
  );
}

export default CreateInterview;