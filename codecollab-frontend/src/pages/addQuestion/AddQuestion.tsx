import React, { useEffect, useState } from "react";
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

// const groups = [
//   {
//     id: 1,
//     name: "Dsa_Revolution_2023",
//     created_by: "mohdasif.dev",
//     members: [
//       {
//         name: "shabaj",
//         status: "unsolved",
//         isAdmin: false,
//       },
//       {
//         name: "nazim",
//         status: "unsolved",
//         isAdmin: false,
//       },
//       {
//         name: "prabhat",
//         status: "unsolved",
//         isAdmin: true,
//       },
//     ],
//   },
//   {
//     id: 2,
//     name: "Algo_Masters_2023",
//     created_by: "john_dev",
//     members: [
//       {
//         name: "mohdasif.dev",
//         status: "unsolved",
//         isAdmin: true,
//       },

//       {
//         name: "john_dev",
//         status: "unsolved",
//         isAdmin: true,
//       },
//       {
//         name: "emma",
//         status: "unsolved",
//         isAdmin: false,
//       },
//       {
//         name: "peter",
//         status: "unsolved",
//         isAdmin: false,
//       },
//       {
//         name: "sara",
//         status: "unsolved",
//         isAdmin: true,
//       },
//     ],
//   },
//   {
//     id: 3,
//     name: "Coding_Gurus",
//     created_by: "alex_dev",
//     members: [
//       {
//         name: "alex_dev",
//         status: "unsolved",
//         isAdmin: true,
//       },
//       {
//         name: "lisa",
//         status: "unsolved",
//         isAdmin: false,
//       },
//       {
//         name: "ryan",
//         status: "unsolved",
//         isAdmin: false,
//       },
//       {
//         name: "michael",
//         status: "unsolved",
//         isAdmin: true,
//       },
//     ],
//   },
// ];

function AddQuestion() {
  const { user, authToken } = useAppSelector((state) => state.auth);
  const [question, setQuestion] = useState({
    title: "",
    url: "",
    youtube_link: "",
    mentorName: "",
    platform: "",
    isPersonal: "",
    description: "",
    isSolved: "",
    group: "",
  });

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [groups, setGroups] = useState<
    {
      _id: number;
      name: string;
    }[]
  >([]);

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setQuestion((prevFormData) => ({
      ...prevFormData,
      [name]: value,
      tags: selectedTags,
    }));
  };

  const handleSelectedTags = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(event.target.selectedOptions).map(
      (option) => option.value
    );
    setSelectedTags(selectedOptions);
  };

  const handleAddQuestion = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
    <div className="container mx-auto flex justify-center">
      <form onSubmit={handleAddQuestion} className="border p-2 ">
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
            name="url"
            value={question.url}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex flex-row my-2">
          <QuestionInputForm
            label="Problem Tutorial Link"
            type="text"
            name="youtube_link"
            value={question.youtube_link}
            onChange={handleInputChange}
          />
          <div>
            <label>Mentor Name</label>
            <br />
            <select
              className="w-[300px] py-2 rounded bg-white border"
              value={question.mentorName}
              name="mentorName"
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

        <div className="flex flex-row my-2">
          <div>
            <label>Tags</label>
            <br />
            <select
              className="w-[300px] py-2 rounded bg-white border"
              value={selectedTags}
              onChange={handleSelectedTags}
              multiple
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
            <label>Platform</label>
            <br />
            <select
              className="w-[300px] py-2 rounded bg-white border"
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

        <div className="flex flex-row my-4">
          <div className="flex flex-col">
            <label>Add Question Into Personal/Group</label>
            <br />
            <select
              className="w-[300px] py-2 rounded bg-white border"
              value={question.isPersonal}
              name="isPersonal"
              onChange={handleInputChange}
            >
              <option value="">Select</option>
              <option value="personal">Personal</option>
              <option value="group">Group</option>
            </select>

            {question.isPersonal === "group" ? (
              <select
                className="w-[300px] py-2 rounded bg-white border my-2"
                value={question.group}
                name="group"
                onChange={handleInputChange}
              >
                <option value="">Select Group</option>
                {groups?.map((group, _id) => (
                  <option key={_id} value={group?.name}>
                    {group?.name}
                  </option>
                ))}
              </select>
            ) : null}
          </div>

          <div>
            <label>Problem Status</label>
            <br />
            <select
              className="w-[300px] py-2 rounded bg-white border"
              value={question.isSolved}
              name="isSolved"
              onChange={handleInputChange}
            >
              <option value="">Select</option>
              <option value="solved">Solved</option>
              <option value="unsolved">Unsolved</option>
            </select>
            <br />
          </div>
        </div>

        <label>Description</label>
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
