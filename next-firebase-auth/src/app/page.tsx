"use client";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/config";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";

export default function Home() {
	const [user] = useAuthState(auth);
	const router = useRouter();

	if (!user) {
		router.replace("/sign-in");
	}
	return (
		<div className='flex flex-col justify-center'>
			<h3 className='text-4xl text-center mt-10'>Hello bro</h3>
			<button onClick={() => signOut(auth)}>Sign Out</button>
		</div>
	);
}
