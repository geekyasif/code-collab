import { Route, Routes } from "react-router-dom";
import AuthRoute from "./routes/authRoute/AuthRoute";
import Login from "./pages/authPages/Login";
import Navbar from "./components/navbar/Navbar";
import Register from "./pages/authPages/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import Home from "./pages/home/Home";
import AddQuestion from "./pages/addQuestion/AddQuestion";
import Groups from "./pages/groups/Groups";
import GroupDetails from "./pages/groupDetails/GroupDetails";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/dashboard" element={<AuthRoute />}>
          <Route path="" element={<Dashboard />} />
          <Route path="add-question" element={<AddQuestion />} />
          <Route path="groups" element={<Groups />} />
          {/* <Route path="group/:groupId" element={<GroupDetails />} /> */}
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
