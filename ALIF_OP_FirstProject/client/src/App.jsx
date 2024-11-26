import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Home.jsx";
import CreateUser from "./components/CreateUser.jsx";

function App() {
	return (
		<>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/create-user/' element={<CreateUser />} />
			</Routes>
		</>
	);
}

export default App;
