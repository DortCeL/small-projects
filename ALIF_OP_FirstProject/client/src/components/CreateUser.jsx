import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Home";

export default function CreateUser() {
	const { users, setUsers } = useContext(UserContext);

	const url = "http://localhost:8080/api/users";
	const navigate = useNavigate();

	const [userData, setUserData] = useState({
		name: "",
		age: "",
		salary: "",
	});

	const handleOnChange = (event) => {
		const { name, value } = event.target;
		if (name.trim() != "" || value.trim() != "")
			setUserData((prevData) => ({
				...prevData,
				[name]: value,
			}));
	};

	const handleSubmitBtn = async () => {
		if (userData) {
			const response = await fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(userData),
			});

			if (response.ok) {
				const newUser = await response.json(); // Get the full user object from the backend
				console.log(newUser);
				console.log(newUser.msg);
				setUsers([...users, newUser.user]); // Add the new user to the list;
				//! eikhane newUser = {msg: "...", user: {...}}
			}
		}
	};

	return (
		<>
			<div className='min-h-screen flex items-center justify-center bg-gray-100'>
				<div className='bg-white p-8 rounded shadow-md w-full max-w-md'>
					<h2 className='text-2xl font-extrabold mb-6 text-green-700 text-center'>
						Create a new user
					</h2>
					<form>
						<div className='mb-4'>
							<label
								className='block text-gray-700 text-sm font-bold mb-2'
								htmlFor='name'
							>
								Name
							</label>
							<input
								className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
								type='text'
								placeholder='Name'
								onChange={handleOnChange}
								name='name'
								value={userData.name}
							/>
						</div>
						<div className='mb-4'>
							<label
								className='block text-gray-700 text-sm font-bold mb-2'
								htmlFor='email'
							>
								Age
							</label>
							<input
								className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
								type='text'
								placeholder='Age'
								onChange={handleOnChange}
								name='age'
								value={userData.age}
							/>
						</div>

						<div className='mb-6'>
							<label
								className='block text-gray-700 text-sm font-bold mb-2'
								htmlFor='salary'
							>
								Salary
							</label>
							<input
								className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
								type='text'
								placeholder='Salary'
								onChange={handleOnChange}
								name='salary'
								value={userData.salary}
							/>
						</div>

						<div className='flex items-center justify-between'>
							<button
								className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline m-auto'
								type='button'
								onClick={handleSubmitBtn}
							>
								Create
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}
