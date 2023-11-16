const bcrypt = require("bcrypt")
const User = require("../../model/userSchema")
const generateJwtAccessToken = require("../../utils/generateJwtAccessToken")

const registerController =  async (req, res) => {

    const {
      first_name,
      last_name,
      email,
      password,
      confirm_password
    } = req.body;

    
    const existingUser = await User.exists({email: email})
    
    if(existingUser){
        return res.status(409).json({message: "Email is already exists"})
    }

    if(password !== confirm_password){
        return res.status(409).json({message: "Password doesn't matched"})
    }

    const salt = await bcrypt.genSalt(10)    
    const hashedPassword = await bcrypt.hash(password, salt)

    const user_data = {
        username: email.split("@")[0],
        first_name,
        last_name,
        email,
        password: hashedPassword
    }

    const user = new User(user_data)
    const new_user = await user.save()

    const accessToken = generateJwtAccessToken(new_user)

    res.status(200).json({accessToken: accessToken, data: new_user})
   

  }


  module.exports = registerController







//   const query = `INSERT INTO users (user_name, first_name, last_name, email, firebase_user_id) VALUES (?, ?, ?, ?, ?)`;
//   const values = [
//     user_name,
//     user_first_name,
//     user_last_name,
//     user_email,
//     user_firebase_user_id,
//   ];

//   conn.query(query, values, (err, result, fields) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).json({
//         error: "An error occurred while inserting data into the database.",
//       });
//     }

//     const user_id = result.insertId;
//     conn.query(
//       `SELECT q.*, NULL AS community_id, NULL AS community_name
//           FROM questions q
//           WHERE q.question_created_by = '${user_id}' AND q.question_type = 'personal'
//           UNION
//           SELECT q.*, c.community_id, c.community_name
//           FROM communities c
//           JOIN communities_members cm ON cm.community_id = c.community_id
//           JOIN questions q ON q.question_community_id = c.community_id
//           WHERE cm.user_id = '${user_id}'`,
//       (error, result) => {
//         if (error) {
//           console.error(error);
//           return res.status.json({ error: "Something went wrong!" });
//         }

//         return res.status(200).json({ data: result, user_id: user_id });
//       }
//     );
//   });