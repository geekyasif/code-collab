const User = require("../../model/userSchema");
const bcrypt = require("bcrypt")
const generateJwtAccessToken = require("../../utils/generateJwtAccessToken");

const loginController = async (req, res) => {
  const { email, password } = req.body;

  // checking user exists or not
  const user = await User.findOne({ email: email });

  if (!user) {
    return res.json({ error: "User doesn't exists" });
  }

  // checking password
  const check_password = await bcrypt.compare(password, user.password);

  if (!check_password) {
    return res.json({ error: "Wrong credentials" });
  }

  // generating password
  const accessToken = generateJwtAccessToken(user);

  return res.status(200).json({ accessToken: accessToken, data: user });
};

module.exports = loginController;

// try {
//   const { user_firebase_user_id } = req.body;

//   const query_to_user_firebase_id = `SELECT user_id FROM users where firebase_user_id = '${user_firebase_user_id}'`;
//   conn.query(query_to_user_firebase_id, (error, result) => {
//     if (error) {
//       console.error(error);
//       return res.status.json({
//         error: "An error occured while searching for the firebase user id.",
//       });
//     }

//     const user_id = result[0];

//     if (result.length === 0) {
//       return res.status(200).json({ data: result, user_id: user_id });
//     }

//     conn.query(
//       `SELECT q.*, NULL AS community_id, NULL AS community_name
//         FROM questions q
//         WHERE q.question_created_by = '${user_id}' AND q.question_type = 'personal'
//         UNION
//         SELECT q.*, c.community_id, c.community_name
//         FROM communities c
//         JOIN communities_members cm ON cm.community_id = c.community_id
//         JOIN questions q ON q.question_community_id = c.community_id
//         WHERE cm.user_id = '${user_id}'`,
//       (error, result) => {
//         if (error) {
//           console.error(error);
//           return res.status.json({ error: "Something went wrong!" });
//         }

//         return res.status(200).json({ data: result, user_id: user_id });
//       }
//     );
//   });
// } catch (error) {
//   res.status(404).json({ data: error });
// }
