import UserList from "./components/UserList";
import CreateUser from "./components/CreateUser";
import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

function Home() {
	const dataUrl = "http://localhost:8080/api/users";
	const [users, setUsers] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch(dataUrl);
			const fetchedUsers = await response.json(); // array of users

			if (response.ok) setUsers(fetchedUsers);
		};
		fetchData();
	}, []);

	return (
		<>
			<h1 className='text-center w-full absolute top-3 font-extrabold text-3xl text-red-500'>
				This should be a To DO app... But I'll just keep it as it is lol
			</h1>
			<h3 className='text-center w-full absolute top-14 font-extrabold text-md text-grey-500'>
				A full-fledge TODO app coming soon!
			</h3>
			<UserContext.Provider value={{ users, setUsers }}>
				<div className='flex flex-row justify-between items-start space-x-4'>
					<div className='w-1/2'>
						<UserList />
					</div>
					<div className='w-1/2'>
						<CreateUser />
					</div>
				</div>
			</UserContext.Provider>
		</>
	);
}

export default Home;
