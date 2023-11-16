import React, { useEffect, useState, ChangeEvent } from "react";
import { useAppSelector } from "../../hooks/hooks";
import axios from "../../axios/axios";
import QuestionInputForm from "../../components/questionForm/QuestionInputForm";
import SubmitButton from "../../components/authForm/SubmitButton";

const platforms: string[] = [
  "LeetCode",
  "GeeksForGeeks",
  "HackerRank",
  "CodeChef",
  "TopCoders",
  "CodeForces",
  "Other",
];

const tags: string[] = [
  "Sorting",
  "Searching",
  "Dynamic Programming",
  "Recursion",
  "Tree",
  "Graph",
  "Array",
  "String",
  "Stack",
  "Queue",
  "LinkedList",
  "Hashing",
  "Heap",
  "Binary Tree",
  "Segment Tree",
  "Greedy Programming",
  "Backtracking",
];

const mentor_name: string[] = [
  "Love Babbar",
  "Mohd Faraz",
  "Striver",
  "Aditya Verma",
  "Other",
];

interface IGroup {
  _id: string;
  name: string;
}

function AddQuestion() {
  const { user, authToken } = useAppSelector((state) => state.auth);
  const [groups, setGroups] = useState<IGroup[]>([]);
  const [question, setQuestion] = useState({
    title: "",
    problem_link: "",
    tutorial_link: "",
    mentor_name: "",
    platform: "",
    tags: "",
    description: "",
    is_solved: "",
    type: {
      is_personal: "",
      id: "",
    },
    created_by: user._id,
  });

  const [isPersonal, setIsPersonal] = useState("");
  const [isGroup, setIsGroup] = useState("");

  const handleInputChangeIsPersonal = (e: ChangeEvent<HTMLSelectElement>) => {
    setIsPersonal(e.target.value);
  };

  const handleInputChangeIsGroup = (e: ChangeEvent<HTMLSelectElement>) => {
    setIsGroup(e.target.value);
  };

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setQuestion((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleAddQuestion = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      let questionData = question;

      if (isPersonal === "User") {
        questionData.type.is_personal = "User";
        questionData.type.id = user._id;
      } else {
        questionData.type.is_personal = "Group";
        questionData.type.id = isGroup;
      }

      const res = await axios.post("http://localhost:8000/questions", questionData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      console.log(res.data.data)

    } catch (err) {
      console.log(err);
    }
  };

  const fetchGroup = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/groups/${user._id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      setGroups(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchGroup();
  });

  return (
    <div className="container mx-auto flex justify-center my-4">
      <form onSubmit={handleAddQuestion} className="border p-2 rounded">
        <div className="flex flex-row">
          <QuestionInputForm
            label="Problem Title"
            type="text"
            name="title"
            value={question.title}
            onChange={handleInputChange}
          />

          <QuestionInputForm
            label="Problem Link"
            type="text"
            name="problem_link"
            value={question.problem_link}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex flex-row my-4">
          <QuestionInputForm
            label="Problem Tutorial Link"
            type="text"
            name="tutorial_link"
            value={question.tutorial_link}
            onChange={handleInputChange}
          />
          <div>
            <label className="font-bold">Mentor Name</label>
            <br />
            <select
              className="w-[500px] py-2 rounded bg-white border"
              value={question.mentor_name}
              name="mentor_name"
              onChange={handleInputChange}
            >
              <option value="">Select</option>
              {mentor_name.map((name, id) => (
                <option
                  key={id}
                  value={name.replaceAll(" ", "_").toLocaleLowerCase()}
                >
                  {name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-row my-4">
          <div>
            <label className="font-bold">Tags</label>
            <br />
            <select
              className="w-[500px] py-2 rounded bg-white border mr-2"
              value={question.tags}
              name="tags"
              onChange={handleInputChange}
            >
              {tags.map((tag, id) => (
                <option
                  key={id}
                  value={tag.toLocaleLowerCase().replaceAll(" ", "_")}
                >
                  {tag}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-bold">Platform</label>
            <br />
            <select
              className="w-[500px] py-2 rounded bg-white border"
              value={question.platform}
              name="platform"
              onChange={handleInputChange}
            >
              <option value="">Select</option>
              {platforms.map((name, id) => (
                <option
                  key={id}
                  value={name.replaceAll(" ", "_").toLocaleLowerCase()}
                >
                  {name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="my-4">
          <div className="my-4">
            <label className="font-bold">Problem Status</label>
            <br />
            <select
              className="w-[100%] py-2 rounded bg-white border"
              value={question.is_solved}
              name="is_solved"
              onChange={handleInputChange}
            >
              <option value="">Select</option>
              <option value="solved">Solved</option>
              <option value="unsolved">Unsolved</option>
            </select>
            <br />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-bold">
              Add Question Into Personal/Group
            </label>
            <select
              className="w-[100%] py-2 rounded bg-white border"
              value={isPersonal}
              name="isPersonal"
              onChange={handleInputChangeIsPersonal}
            >
              <option value="">Select</option>
              <option value="User">Personal</option>
              <option value="Group">Group</option>
            </select>

            {isPersonal === "Group" && (
              <select
                className="w-[100%] py-2 rounded bg-white border my-2"
                value={isGroup}
                name="isGroup"
                onChange={handleInputChangeIsGroup}
              >
                <option value="">Select Group</option>
                {groups?.map((group) => (
                  <option key={group._id} value={group?._id}>
                    {group?.name}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>

        <label className="font-bold">Description</label>
        <br />
        <textarea
          className="border p-2 w-full"
          name="description"
          value={question.description}
          onChange={handleInputChange}
        />
        <SubmitButton text="Add Question" />
      </form>
    </div>
  );
}

export default AddQuestion;
