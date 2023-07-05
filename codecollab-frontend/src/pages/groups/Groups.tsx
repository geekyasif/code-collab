import React, { useEffect, useState } from "react";
import AddGroup from "../../components/addGroup/AddGroup";
import { groups as groupsData } from "../../utils/DemoData";
import { useAppSelector } from "../../hooks/hooks";
import { Link } from "react-router-dom";
import axios from "../../axios/axios";

export interface IMember {
  name: string;
  isAdmin: boolean;
  status: string;
}

export interface IGroup {
  _id: number;
  name: string;
  description: string,
  created_by: {
    _id: string;
    username: string;
  };
  members: IMember[];
}

function Groups() {
  const { user, authToken } = useAppSelector((state) => state.auth);
  const [myGroups, setMyGroups] = useState<IGroup[]>([]);

  const fetchMyGroups = async () => {
    try {
      const _myGroups = [];
      const res = await axios.get(`http://localhost:8000/groups/${user._id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      setMyGroups(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMyGroups();
  }, []);

  return (
    <div className="container mx-auto">
      <AddGroup />
      <div className="border p-2 my-2">
        <h1>All Groups</h1>
        {myGroups.map((group: IGroup, i: number) => (
          <div key={i} className="border p-2 my-2">
            <Link to={`/dashboard/group/${group._id}`}>
              {group.name} created by{" "}
              {group.created_by === user.username ? (
                <span className="bg-green-500">you</span>
              ) : (
                <span className="bg-yellow-500">
                  {group.created_by.username}
                </span>
              )}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Groups;
