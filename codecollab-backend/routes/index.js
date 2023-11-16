const router = require("express").Router();
const getGroupsByUserId = require("../controllers/groupsController/getGroupsByUserId");

// auth controller
const register = require("../controllers/authController/register");
const login = require("../controllers/authController/login");

// group controller
const authenticateToken = require("../middlewares/authenticateToken");
const createGroupsController = require("../controllers/groupsController/createGroups");
const getGroupDetails = require("../controllers/groupsController/getGroupDetails");
const getUsers = require("../controllers/userController/getUsers");
const addMember = require("../controllers/memberController/addMember");
const getGroupMembers = require("../controllers/memberController/getGroupMembers");
const getJoinedGroups = require("../controllers/memberController/getJoinedGroups");
const addQuestion = require("../controllers/questionController/addQuestion");
const getQuestions = require("../controllers/questionController/getQuestions");
const getAssignmentQuestions = require("../controllers/questionAssignmentController/getAssignmentQuestions");

// zomato export
const { restaurantList, FOODITEM_IMG_URL, FETCH_MENU_URL, CAROUSEL_IMG_URL,IMG_CDN_URL } = require("../zomato_data");


router.post("/register", register);
router.post("/login", login);

router.get("/users", authenticateToken, getUsers);
// create group
router.post("/groups", authenticateToken, createGroupsController);

// fetch groups by userid
router.get("/groups/:userId", authenticateToken, getGroupsByUserId);

// fetch group details by user and group id
router.get(
  "/group-details/:groupId/:userId",
  authenticateToken,
  getGroupDetails
);

// addding members to the group
router.post("/add-member", authenticateToken, addMember);

// getting group members using group id
router.get(
  "/group-members/:groupId/:userId",
  authenticateToken,
  getGroupMembers
);

// getting all the groups where the user is joined
router.get("/joined-groups/:userId", authenticateToken, getJoinedGroups);

// Adding new questions
router.post("/questions", authenticateToken, addQuestion);
router.get("/questions/:type/:id", authenticateToken, getQuestions);

// Adding question and assigning to the all users
router.get("/question-assignment/:groupId", authenticateToken, getAssignmentQuestions);




// zomato api test data
router.get("/api/data", (req, res) => {
  try {
    return res.json({
      restaurantList,
      FOODITEM_IMG_URL,
      IMG_CDN_URL,
      CAROUSEL_IMG_URL,
      FETCH_MENU_URL,
    });
  } catch (err) {
    return res.json({ data: err });
  }
});

module.exports = router;
