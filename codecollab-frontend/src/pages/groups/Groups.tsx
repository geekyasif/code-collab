import React, { useEffect, useState } from "react";
import AddGroup from "../../components/addGroup/AddGroup";
import { groups as groupsData } from "../../utils/DemoData";
import { useAppSelector } from "../../hooks/hooks";
import { Link } from "react-router-dom";
import axios from "../../axios/axios";
import GroupDetails from "../groupDetails/GroupDetails";

export interface IMember {
  name: string;
  isAdmin: boolean;
  status: string;
}

export interface IGroup {
  _id: number;
  name: string;
  description: string;
  created_by: {
    _id: string;
    username: string;
  };
  members: IMember[];
}

export interface IJoinedGroup {
  __v: number;
  _id: string;

  added_by: {
    createdAt: string;
    email: string;
    first_name: string;
    last_name: string;
    password: string;
    updatedAt: string;
    username: string;
    __v: number;
    _id: string;
  };

  group_id: {
    created_by: string;
    description: string;
    name: string;
    __v: number;
    _id: string;
  };

  user_id: {
    createdAt: string;
    email: string;
    first_name: string;
    last_name: string;
    password: string;
    updatedAt: string;
    username: string;
    __v: number;
    _id: string;
  };

  createdAt: string;
  updatedAt: string;
}

function Groups() {
  const { user, authToken } = useAppSelector((state) => state.auth);
  const [myGroups, setMyGroups] = useState<IGroup[]>([]);
  const [joinedGroups, setJoinedGroups] = useState<IJoinedGroup[]>([]);
  const [groupId, setGroupId] = useState<string>();

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

  const fetchJoinedGroup = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/joined-groups/${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      setJoinedGroups(res.data.data);
      console.log(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMyGroups();
    fetchJoinedGroup();
  }, []);

  return (
    <div className="container mx-auto">
      <div className="flex flex-row">
        {/* sidebar  */}
        <div className="mr-2 w-[20%]">
          <div className="border p-2 my-2">
            <h1 className="font-bold">Personal Groups</h1>
            {myGroups.map((group: IGroup, i: number) => (
              <div
                key={i}
                className="border p-2 my-2 hover:bg-gray-100 cursor-pointer"
              >
                {/* <Link to={`/dashboard/group/${group._id}`}>
                  {group.name} 
                </Link> */}

                <p onClick={() => setGroupId(group._id.toString())}>{group.name} </p>
              </div>
            ))}
          </div>

          <div className="border p-2 my-2 mt-4">
            <h1 className="font-bold">Community Group</h1>
            {joinedGroups.map((group) => (
              <div
                key={group._id}
                className="border p-2 my-2 hover:bg-gray-100"
              >
                {/* <Link to={`/dashboard/group/${group.group_id._id}`}>
                  {group.group_id.name} created by {group.added_by.username}
                </Link> */}
                
                <p onClick={ () => setGroupId(group.group_id._id)}> {group.group_id.name}{" "} </p>
              </div>
            ))}
          </div>
        </div>

        {/* container  */}
        <div className="w-[80%]">
          <AddGroup />
          <GroupDetails groupId={groupId?.toString()} />
        </div>
      </div>
    </div>
  );
}

export default Groups;
