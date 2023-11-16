export const questions = [
  {
    id: 1,
    title: "two sum",
    url: "www.example.com",
    tags: ["Array", "Recursion"],
    created_by: "mohdasif.dev",
    mentor_name: "love_babbar",
    platform: "geeksforgeek",
    solution_url: "www.youtube.com",
    description: "this is desc",
    time_stamp: "12/12/23",
    personal: {
      is_personal: false,
      status: "unsolved",
    },
    group: {
      id: 1,
      name: "Dsa_Revolution_2023",
      members: [
        {
          name: "asif",
          status: "unsolved",
        },
        {
          name: "shabaj",
          status: "solved",
        },
      ],
    },
  },
  {
    id: 2,
    title: "three sum",
    url: "www.example.com",
    tags: ["Array", "Recursion"],
    created_by: "mohdasif.dev",
    mentor_name: "coding_ninja",
    platform: "leetcode",
    solution_url: "www.youtube.com",
    description: "this is desc",
    time_stamp: "01/01/24",
    personal: {
      is_personal: true,
      status: "solved",
    },
    group: null,
  },
  {
    id: 3,
    title: "binary search",
    url: "www.example.com",
    tags: ["Array", "Sorting"],
    created_by: "mohdasif.dev",
    mentor_name: "code_masters",
    platform: "hackerrank",
    solution_url: "www.youtube.com",
    description: "this is desc",
    time_stamp: "06/06/24",
    personal: {
      is_personal: false,
      status: "unsolved",
    },
    group: {
      id: 1,
      name: "Dsa_Revolution_2023",
      members: [
        {
          name: "asif",
          status: "unsolved",
        },
        {
          name: "shabaj",
          status: "solved",
        },
      ],
    },
  },
  {
    id: 4,
    title: "linked list",
    url: "www.example.com",
    tags: ["LinkedList"],
    created_by: "alex_dev",
    mentor_name: "data_guru",
    platform: "geeksforgeek",
    solution_url: "www.youtube.com",
    description: "this is desc",
    time_stamp: "03/03/24",
    personal: {
      is_personal: false,
      status: "solved",
    },
    group: {
      id: 2,
      name: "Algo_Masters_2023",
      members: [
        {
          name: "julia",
          status: "solved",
        },
        {
          name: "peter",
          status: "solved",
        },
        {
          name: "sarah",
          status: "unsolved",
        },
      ],
    },
  },
  {
    id: 5,
    title: "matrix multiplication",
    url: "www.example.com",
    tags: ["Matrix", "Algorithms"],
    created_by: "sam_dev",
    mentor_name: "algorithm_guru",
    platform: "leetcode",
    solution_url: "www.youtube.com",
    description: "this is desc",
    time_stamp: "09/09/24",
    personal: {
      is_personal: true,
      status: "solved",
    },
    group: null,
  },
  {
    id: 6,
    title: "tree traversal",
    url: "www.example.com",
    tags: ["Tree", "DFS"],
    created_by: "sara_dev",
    mentor_name: "tree_expert",
    platform: "hackerrank",
    solution_url: "www.youtube.com",
    description: "this is desc",
    time_stamp: "04/04/24",
    personal: {
      is_personal: false,
      status: "unsolved",
    },
    group: {
      id: 3,
      name: "DSA_Masters",
      members: [
        {
          name: "michael",
          status: "unsolved",
        },
        {
          name: "lisa",
          status: "solved",
        },
        {
          name: "ryan",
          status: "solved",
        },
      ],
    },
  },
  {
    id: 7,
    title: "graph algorithms",
    url: "www.example.com",
    tags: ["Graph", "Shortest Path"],
    created_by: "emma_dev",
    mentor_name: "graph_genius",
    platform: "geeksforgeek",
    solution_url: "www.youtube.com",
    description: "this is desc",
    time_stamp: "07/07/24",
    personal: {
      is_personal: true,
      status: "solved",
    },
    group: null,
  },
];

export const groups = [
  {
    id: 1,
    name: "Dsa_Revolution_2023",
    created_by: "mohdasif.dev",
    members: [
      {
        name: "shabaj",
        status: "unsolved",
        isAdmin: false,
      },
      {
        name: "nazim",
        status: "unsolved",
        isAdmin: false,
      },
      {
        name: "prabhat",
        status: "unsolved",
        isAdmin: true,
      },
    ],
  },
  {
    id: 2,
    name: "Algo_Masters_2023",
    created_by: "john_dev",
    members: [
      {
        name: "mohdasif.dev",
        status: "unsolved",
        isAdmin: true,
      },

      {
        name: "john_dev",
        status: "unsolved",
        isAdmin: true,
      },
      {
        name: "emma",
        status: "unsolved",
        isAdmin: false,
      },
      {
        name: "peter",
        status: "unsolved",
        isAdmin: false,
      },
      {
        name: "sara",
        status: "unsolved",
        isAdmin: true,
      },
    ],
  },
  {
    id: 3,
    name: "Coding_Gurus",
    created_by: "alex_dev",
    members: [
      {
        name: "alex_dev",
        status: "unsolved",
        isAdmin: true,
      },
      {
        name: "lisa",
        status: "unsolved",
        isAdmin: false,
      },
      {
        name: "ryan",
        status: "unsolved",
        isAdmin: false,
      },
      {
        name: "michael",
        status: "unsolved",
        isAdmin: true,
      },
    ],
  },
  {
    id: 4,
    name: "Pythonistas",
    created_by: "emma_dev",
    members: [
      {
        name: "emma_dev",
        status: "unsolved",
        isAdmin: true,
      },
      {
        name: "julia",
        status: "unsolved",
        isAdmin: false,
      },
      {
        name: "sam",
        status: "unsolved",
        isAdmin: false,
      },
      {
        name: "sarah",
        status: "unsolved",
        isAdmin: true,
      },
    ],
  },
  {
    id: 5,
    name: "CodingNinjas",
    created_by: "jason_dev",
    members: [
      {
        name: "jason_dev",
        status: "unsolved",
        isAdmin: true,
      },
      {
        name: "adam",
        status: "unsolved",
        isAdmin: false,
      },
      {
        name: "kate",
        status: "unsolved",
        isAdmin: false,
      },
      {
        name: "alex",
        status: "unsolved",
        isAdmin: true,
      },
    ],
  },
  {
    id: 6,
    name: "JavaGeeks",
    created_by: "linda_dev",
    members: [
      {
        name: "linda_dev",
        status: "unsolved",
        isAdmin: true,
      },
      {
        name: "tom",
        status: "unsolved",
        isAdmin: false,
      },
      {
        name: "kelly",
        status: "unsolved",
        isAdmin: false,
      },
      {
        name: "harry",
        status: "unsolved",
        isAdmin: true,
      },
    ],
  },
  {
    id: 7,
    name: "WebWarriors",
    created_by: "kate_dev",
    members: [
      {
        name: "kate_dev",
        status: "unsolved",
        isAdmin: true,
      },
      {
        name: "megan",
        status: "unsolved",
        isAdmin: false,
      },
      {
        name: "oliver",
        status: "unsolved",
        isAdmin: false,
      },
      {
        name: "sophia",
        status: "unsolved",
        isAdmin: true,
      },
    ],
  },
];
