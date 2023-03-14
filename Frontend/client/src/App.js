import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import LoginPage from "./pages/loginPage";
import RegisterPage from "./pages/registerPage";
import ToDoPage from "./pages/toDoPage";
import EditTodoPage from "./pages/toDoEditPage.js";

function App() {
  const [userId, setUserId] = useState("");

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage setUserId={setUserId} />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route path="/todo" element={<ToDoPage userId={userId} />} />
          <Route path="/todo/:id" element={<EditTodoPage userId={userId} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
