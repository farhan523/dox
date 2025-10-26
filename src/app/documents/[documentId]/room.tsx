"use client";

import {ReactNode, useState} from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { useParams } from "next/navigation";
import FullScreenLoader from "@/components/full-screen-loader";

type User = {
	id: string;
	name: string;
	avatar: string | null;
};

export function Room({ children }: { children: ReactNode }) {
    const params = useParams();
				const [user, setUser] = useState<User[]>([]);

				return (
					<LiveblocksProvider
						throttle={16}
						authEndpoint={"/api/liveblocks-auth"}
						resolveUsers={() => []}
						resolveMentionSuggestions={() => []}
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