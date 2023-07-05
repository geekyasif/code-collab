import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IGroup, IMember } from "../groups/Groups";
import { groups, questions } from "../../utils/DemoData";
import { IQuestion } from "../dashboard/Dashboard";
import { useAppSelector } from "../../hooks/hooks";
import axios from "../../axios/axios"
import AddGroupMember from "../../components/addGroupMember/AddGroupMember";

function GroupDetails() {

  const { groupId } = useParams<string>();
  const {authToken, user} = useAppSelector((state) => state.auth)
  const [myGroupDetails, setMyGroupDetails] = useState<IGroup>();
  const [questionsByGroup, setQuestionsByGroup] = useState<IQuestion[]>([]);

  const fetchGroupDetails = async () => {
    try{
      const res = await axios.get(`http://localhost:8000/group-details/${groupId}/${user._id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      console.log("this is group details",res.data.data)
      setMyGroupDetails(res.data.data)
    }catch(err){
      console.log(err)
    }
  }

  useEffect(() => {
      fetchGroupDetails()
  }, [])

  return (
    <div className="container mx-auto py-2">
      <p>Group Name: {myGroupDetails?.name}</p>
      <p>Group Description: {myGroupDetails?.description}</p>
      <p>Created By: {myGroupDetails?.created_by.username}</p>
      <AddGroupMember/>
      <table>
        <tr>
          <th>Tags</th>
          <th>Title</th>
          <th>created_by</th>
          <th>url</th>
          {myGroupDetails?.members?.map((member: IMember) => (
            <th>{member.name}</th>
          ))}
        </tr>

        <tbody>
          {questionsByGroup.map((question: IQuestion, id: number) => (
            <tr key={id}>
              <td>Array</td>
              <td>{question.title}</td>
              <td>{question.created_by}</td>
              <td>{question.url}</td>
              {question.group?.members.map((member) => (
                <td>{member.status}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GroupDetails;
