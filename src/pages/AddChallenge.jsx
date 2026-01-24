import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AddChallenge = () => {
  const [form, setForm] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title || !form.category || !form.description) {
      return toast.error("All required fields must be filled");
    }

    axios
      .post("http://localhost:3000/api/challenges", form)
      .then(() => toast.success("Challenge added successfully"))
      .catch(() => toast.error("Failed to add challenge"));
  };

  return (
    <div className="max-w-xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold mb-6">Add New Challenge</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          onChange={handleChange}
          placeholder="Title"
          className="input"
        />
        <input
          name="category"
          onChange={handleChange}
          placeholder="Category"
          className="input"
        />
        <input
          name="duration"
          onChange={handleChange}
          placeholder="Duration (days)"
          className="input"
        />
        <input
          name="imageUrl"
          onChange={handleChange}
          placeholder="Image URL"
          className="input"
        />
        <textarea
          name="description"
          onChange={handleChange}
          placeholder="Description"
          className="textarea"
        />

        <button className="w-full bg-green-600 text-white py-2 rounded">
          Add Challenge
        </button>
      </form>
    </div>
  );
};

export default AddChallenge;
