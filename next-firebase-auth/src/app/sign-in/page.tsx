"use client";
import React, { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/config";
import { useRouter } from "next/navigation";
import Link from "next/link";

const SignIn = () => {
	// -------------------------------

	const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);

	// -------------------------------

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const res = await signInWithEmailAndPassword(email, password);
			if (res) alert("Logged In");
			console.log({ res });
			setEmail("");
			setPassword("");

			router.push("/");
		} catch (error) {
			console.log(error.message);
		}
	};

	return (
		<div className='flex justify-center items-center h-screen bg-slate-800 text-slate-700'>
			<div className='bg-white p-6 rounded-lg shadow-lg w-80'>
				<h2 className='text-xl font-bold mb-4 text-center'>Sign In</h2>
				<form onSubmit={handleSubmit} className='space-y-4'>
					<div>
						<label className='block text-sm font-medium text-gray-700'>
							Email
						</label>
						<input
							type='email'
							name='email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
							placeholder='Your Email'
							required
						/>
					</div>

					<div>
						<label className='block text-sm font-medium text-gray-700'>
							Password
						</label>
						<input
							type='password'
							name='password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
							placeholder='Password'
							required
						/>
					</div>

					<button
						type='submit'
						className='w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500'
					>
						Sign In
					</button>
					<p>
						Don't have an account? <Link href={"/sign-up"}>Register</Link>{" "}
					</p>
				</form>
			</div>
		</div>
	);
};

export default SignIn;