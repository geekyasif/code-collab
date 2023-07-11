import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IGroup, IMember } from "../groups/Groups";
import { groups, questions } from "../../utils/DemoData";
import { IQuestion } from "../dashboard/Dashboard";
import { useAppSelector } from "../../hooks/hooks";
import axios from "../../axios/axios";
import AddGroupMember from "../../components/addGroupMember/AddGroupMember";

interface IGroupDetailsProps {
  groupId: string | undefined;
}



interface QuestionAssignment {
  createdAt: string;
  group_id: string;
  created_by: string;
  description: string;
  name: string;
  __v: number;
  _id: string;
  group_members: GroupMember[];
  question_id: Question;
}

interface GroupMember {
  status: string;
  _id: string;
}

interface Question {
  createdAt: string;
  created_by: string;
  description: string;
  is_solved: string;
  mentor_name: string;
  platform: string;
  problem_link: string;
  tags: string;
  title: string;
  tutorial_link: string;
  type: {
    id: string;
    is_personal: string;
  };
  updatedAt: string;
  __v: number;
  _id: string;
}



function GroupDetails({ groupId }: IGroupDetailsProps) {
  const { authToken, user } = useAppSelector((state) => state.auth);
  const [myGroupDetails, setMyGroupDetails] = useState<IGroup>();
  const [questionsByGroup, setQuestionsByGroup] = useState<QuestionAssignment[]>();
  const [tab, setTab] = useState("question");

  const fetchGroupDetails = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/group-details/${groupId}/${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      console.log("this is group details", res.data.data);
      // setMyGroupDetails(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };


  const fetchQuestionByGroup = async () => {
    try{

      const res = await axios.get(
        `http://localhost:8000/question-assignment/${groupId}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      setQuestionsByGroup(res.data.data)


    }catch(err){
      console.log(err)
    }
  }

        console.log("question assignemnts", questionsByGroup);

  useEffect(() => {
    if (groupId !== undefined) {
      fetchGroupDetails();
      fetchQuestionByGroup()
    }
  }, [groupId]);

  return (
    <div className="container mx-auto border p-2 h-[100vh]">
      <div className="text-center">
        <p className="text-3xl font-bold">
          {myGroupDetails?.name}{" "}
          {myGroupDetails?.created_by._id === user._id ? (
            ""
          ) : (
            <span className="text-xs p-1 bg-green-600 text-white rounded items-center">
              Admin: {myGroupDetails?.created_by.username}
            </span>
          )}
        </p>
        <p className="text-sm mt-2">{myGroupDetails?.description}</p>
      </div>
      <div className="flex flex-row">
        <p
          className={
            tab === "question"
              ? "p-2 rounded bg-blue-500 text-white mr-2 "
              : "p-2 border text-blue-500 cursor-pointer mr-2"
          }
          onClick={() => setTab("question")}
        >
          Questions
        </p>
        {myGroupDetails?.created_by._id === user._id ? (
          <p
            className={
              tab === "member"
                ? "p-2 rounded bg-blue-500 text-white mr-2 "
                : "p-2 border text-blue-500 cursor-pointer mr-2"
            }
            onClick={() => setTab("member")}
          >
            Members
          </p>
        ) : (
          <></>
        )}
      </div>

      {tab === "question" ? (
        <div className="border-t mt-4 pt-2">
          {
            // questionsByGroup?.map((q) => (
            //   <>
            //     <p>{q.question_id.title}</p>
            //   </>
            // ))
          }
        </div>
      ) : (
        <AddGroupMember groupId={groupId} />
      )}
    </div>
  );
}

export default GroupDetails;
