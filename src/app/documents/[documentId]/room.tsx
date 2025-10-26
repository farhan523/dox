"use client";

import {ReactNode, useEffect, useState} from "react";
import {
	LiveblocksProvider,
	RoomProvider,
	ClientSideSuspense,
} from "@liveblocks/react/suspense";
import {useParams} from "next/navigation";
import FullScreenLoader from "@/components/full-screen-loader";
import {getUsers} from "./action";
import {toast} from "sonner";

type User = {
	id: string;
	name: string;
	avatar: string | null;
};

export function Room({children}: {children: ReactNode}) {
	const params = useParams();
	const [user, setUser] = useState<User[]>([]);

	const fetchUsers = async () => {
		try {
			const users = await getUsers();
			setUser(users);
		} catch (error) {
			console.error("Error fetching users:", error);
			toast.error("Failed to fetch users" + error);
		}
	};

	useEffect(() => {
		fetchUsers();
	}, []);

	return (
		<LiveblocksProvider
			throttle={16}
			authEndpoint={"/api/liveblocks-auth"}
			resolveUsers={({userIds}) => {
				return userIds.map((id) => user.find((user) => user.id === id)!);
			}}
			resolveMentionSuggestions={({text}) => {
				let filteredUsers = user;
				if (text) {
					const lowerText = text.toLowerCase();
					filteredUsers = user.filter((user) =>
						user.name.toLowerCase().includes(lowerText),
					);
				}
				console.log({filteredUsers});
				// return an array of strings (names) to match the expected string[] | MentionData[] type
				return filteredUsers.map((user) => user.id);
			}}
			resolveRoomsInfo={() => []}
		>
			<RoomProvider id={params.documentId as string}>
				<ClientSideSuspense fallback={<FullScreenLoader />}>
					{children}
				</ClientSideSuspense>
			</RoomProvider>
		</LiveblocksProvider>
	);
}
