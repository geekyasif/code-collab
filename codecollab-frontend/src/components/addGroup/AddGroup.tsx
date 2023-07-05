import React, { useState } from "react";
import { useAppSelector } from "../../hooks/hooks";
import axios from "axios";

interface IGroup {
  name: string;
  description: string;
}

function AddGroup() {
  const { user, authToken } = useAppSelector((state) => state.auth);
  const [group, setGroup] = useState<IGroup>({
    name: "",
    description: "",
  });

  const handleGroupInput = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setGroup((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddGroup = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      if (group.name === "" || group.description === "") {
        return alert("All filds are required");
      }

      const group_data = {
        name: group.name,
        description: group.description,
        created_by: user._id,
      };

      const res = await axios.post("http://localhost:8000/groups", group_data, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-2 my-2 border">
      <form
        className="flex items-center justify-between"
        onSubmit={handleAddGroup}
      >
        <label>Group Name</label>

        <input
          className="border my-2"
          type="text"
          name="name"
          value={group.name}
          onChange={handleGroupInput}
        />

        <label>Group Description</label>

        <textarea
          className="border my-2"
          name="description"
          value={group.description}
          onChange={handleGroupInput}
        ></textarea>

        <button className="bg-blue-500 p-2 rounded text-white" type="submit">
          Create Group
        </button>
      </form>
    </div>
  );
}

export default AddGroup;
