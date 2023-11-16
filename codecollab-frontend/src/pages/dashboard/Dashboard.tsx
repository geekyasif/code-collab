import { useEffect, useState } from "react";
import SearchQuestion from "../../components/searchQuestion/SearchQuestion";
import { questions } from "../../utils/DemoData";
import { useAppSelector } from "../../hooks/hooks";
import { Route, useNavigate } from "react-router-dom";
import { StringDecoder } from "string_decoder";
import axios from "../../axios/axios";
import GroupQuestionsContainer from "../../components/GroupQuestionsContainer/GroupQuestionsContainer";
import PersonalQuestionsContainer from "../../components/PersonalQuestionsContainer/PersonalQuestionsContainer";
import QuestionDetails from "./QuestionDetails";

interface IPersonal {
  is_personal: boolean;
  status: string;
}

interface IMember {
  name: string;
  status: string;
}

interface IGroup {
  id: number;
  name: string;
  members: IMember[];
}

export interface IQuestion {
  _id: string;
  title: string;
  problem_link: string;
  tutorial_link: string;
  tags: StringDecoder;
  created_by: string;
  is_solved: string,
  mentor_name: string;
  platform: string;
  description: string;
  time_stamp: string;
  is_personal: {};
}

function Dashboard() {
  const navigate = useNavigate();
  const { user, authToken } = useAppSelector((state) => state.auth);
  const [tab, setTab] = useState("personal");
  const [myPersonalQuestions, setMyPersonalQuestions] = useState<IQuestion[]>(
    []
  );

  const fetchMyPersonalQuestions = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/questions/User/${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      console.log(res.data.data);
      setMyPersonalQuestions(res.data.data)
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMyPersonalQuestions();
  }, []);

  useEffect(() => {
    if (authToken === null) {
      navigate("/login");
    }
  }, [authToken, navigate]);

  return (
    <div className="container mx-auto my-2">
      <div className="flex flex-row">
        <div className="w-[20%] border mr-2">
          <p className="p-2 ml-1 font-bold">Questions</p>
          <p
            className={
              tab === "personal"
                ? "bg-blue-500 text-white p-2 border m-2 rounded"
                : "p-2 border m-2 rounded hover:bg-gray-100"
            }
            onClick={() => setTab("personal")}
          >
            Personal
          </p>
          <p
            className={
              tab === "group"
                ? "bg-blue-500 text-white p-2 border m-2 rounded"
                : "p-2 border m-2 rounded hover:bg-gray-100"
            }
            onClick={() => setTab("group")}
          >
            Group
          </p>
        </div>
        <div className="w-[80%]">
          <SearchQuestion />
          {tab === "personal" ? (
            <PersonalQuestionsContainer myPersonalQuestions={myPersonalQuestions}/>
          ) : (
            <GroupQuestionsContainer />
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
