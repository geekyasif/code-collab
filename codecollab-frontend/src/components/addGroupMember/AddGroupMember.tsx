import React, { useEffect, useState } from "react";
import axios from "../../axios/axios";
import { useAppSelector } from "../../hooks/hooks";
import { useParams } from "react-router-dom";

interface IMembers {
  _id: string;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  _v: number;
}

interface IGroupMember {
  added_by: string;
  createdAt: string;
  group_id: string;
  updatedAt: string;
  user_id: { _id: string; username: string };
  __v: number;
  _id: string;
}

interface IGroupDetailsProps {
  groupId: string | undefined;
}
function AddGroupMember({ groupId }: IGroupDetailsProps) {
  // const { groupId } = useParams();
  const { user, authToken } = useAppSelector((state) => state.auth);
  const [members, setMembers] = useState<IMembers[]>([]);
  const [groupMembers, setGroupMembers] = useState<IGroupMember[]>([]);
  const [selectedMember, setSelectedMember] = useState("");

  const fetchMembers = async () => {
    const res = await axios.get("http://localhost:8000/users", {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    console.log(res.data.data);
    setMembers(res.data.data);
  };

  const fetchGroupMembers = async () => {
    const userId = user._id;
    const res = await axios.get(
      `http://localhost:8000/group-members/${groupId}/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    setGroupMembers(res.data.data);
    console.log("GRoup Mmebers", res.data.data);
  };

  useEffect(() => {
    fetchMembers();
    if (groupId !== undefined) {
      fetchGroupMembers();
    }
  }, [groupId]);

  const handleAddToMember = async (event: any) => {
    event.preventDefault();
    if (selectedMember === "") {
      alert("Please select member to add into the groups");
    } else {
      const data = {
        member_id: selectedMember,
        group_id: groupId,
        user_id: user._id,
      };

      const res = await axios.post("http://localhost:8000/add-member", data, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      console.log(res.data.data);
    }
  };

  return (
    <div className="p-2 my-2">
      <form onSubmit={handleAddToMember} className="border p-2">
        <label className="pl-4">Select Member</label>
        <div className="flex flex-row items-center justify-around">
          <div className="p-2 w-[90%]">
            <select
              className="p-2 w-[100%] mt-2 cursor-pointer"
              name="member"
              value={selectedMember}
              onChange={(e) => setSelectedMember(e.target.value)}
            >
              {members.map((member) => (
                <option
                  value={member._id}
                  key={member._id}
                  className="bg-white my-2 py-4 cursor-pointer"
                >
                  {member.username}
                </option>
              ))}
            </select>
          </div>

          <div>
            <button className="bg-blue-500 rounded text-white ml-2 text-sm p-2">
              Add Member
            </button>
          </div>
        </div>
      </form>

      <p className="font-bold mt-4 border-t pt-2">All group Members are</p>
      {groupMembers.map((member, i) => (
        <p key={member._id}>
          {i + 1}. {member.user_id.username}
        </p>
      ))}
    </div>
  );
}

export default AddGroupMember;
