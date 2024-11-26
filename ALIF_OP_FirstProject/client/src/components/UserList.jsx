import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Home";

export default function UserList() {
	const dataUrl = "http://localhost:8080/api/users";

	const { users, setUsers } = useContext(UserContext);

	const handleDelete = async (user) => {
		const confirmDelete = window.confirm(
			`Are you sure u wanna delete ${user.name}?`
		);

		if (confirmDelete) {
			// delete route call
			const response = await fetch(`${dataUrl}/${user._id}`, {
				method: "DELETE",
			});

			if (response.ok) {
				// remove it from the currect Users array in useState
				// so that we dont have to refresh manually in order to see the change
				// the deleted data will automatically vanish from the list;
				setUsers(users.filter((u) => u._id != user._id));

				console.log(`deleted successfully`);
			} else {
				console.log(`Could not delete! :(`);
			}
		}
	};

	return (
		<>
			<div id='header' className='mb-5 mt-24'>
				<h1 className='text-center font-extrabold text-4xl'>Hello World</h1>
				<h3 className='text-center font-medium text-xl'>Registered Users </h3>
			</div>

			<div className='w-96 p-6 bg-slate-400 rounded-lg shadow-xl text-white m-auto'>
				{users.map((user, index) => (
					<>
						<div className='flex flex-row justify-between items-center'>
							<div className='my-3' key={index}>
								<p>Name : {user.name}</p>
								<p>Age : {user.age}</p>
								<p>Salary : {user.salary}</p>
							</div>
							<div className='flex items-center'>
								<button
									className='px-5 py-3 bg-red-400 hover:bg-red-500 text-white rounded'
									onClick={() => handleDelete(user)}
								>
									Delete
								</button>
							</div>
						</div>
						<hr />
					</>
				))}
			</div>
		</>
	);
}
