import Account from "./pages/Account";
import Homepage from "./pages/HomePage";
import Login from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
              <Route path="/" element={<Homepage />}/>
              <Route path="/login" element={<Login />}/>
              <Route path="/signup" element={<SignUpPage/>}/>
              <Route path="/account" element={<Account />}/>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
