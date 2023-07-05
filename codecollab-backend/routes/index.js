const router = require("express").Router();
const getGroupsByUserId = require("../controllers/groupsController/getGroupsByUserId");

// auth controller 
const register = require('../controllers/authController/register')
const login = require("../controllers/authController/login");

// group controller 
const authenticateToken = require("../middlewares/authenticateToken");
const createGroupsController = require("../controllers/groupsController/createGroups");
const getGroupDetails = require("../controllers/groupsController/getGroupDetails");
const getUsers = require("../controllers/userController/getUsers");
const addMember = require("../controllers/memberController/addMember");
const getGroupMembers = require("../controllers/memberController/getGroupMembers");



router.post("/register", register);
router.post("/login", login);


router.get("/users", authenticateToken, getUsers)
// create group
router.post("/groups", authenticateToken, createGroupsController);

// fetch groups by userid
router.get("/groups/:userId", authenticateToken, getGroupsByUserId)

// fetch group details by user and group id
router.get("/group-details/:groupId/:userId", authenticateToken, getGroupDetails)

// addding members to the group
router.post("/add-member", authenticateToken, addMember)


// getting group members using group id
router.get("/group-members/:groupId/:userId", getGroupMembers)

module.exports = router;
