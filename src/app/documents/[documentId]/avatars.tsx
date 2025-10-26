"use client";
const AVATAR_SIZE = 36;
import {useOthers, useSelf} from "@liveblocks/react/suspense";
import {ClientSideSuspense} from "@liveblocks/react";
import Image from "next/image";
import {currentUser} from "@clerk/nextjs/server";
import {Separator} from "@/components/ui/separator";

interface AvatarProps {
	name: string;
	src: string;
}

export const Avatars = () => {
	return (
		<ClientSideSuspense fallback={null}>
			<AvatarStack />
		</ClientSideSuspense>
	);
};

const AvatarStack = () => {
	const users = useOthers();
	const currentUser = useSelf();
	if (users.length === 0) {
		return null;
	}
	return (
		<>
			<div className='flex items-center'>
				{currentUser && (
					<div className='relative ml-2'>
						<Avatar src={currentUser.info.avatar} name={"You"} />
					</div>
				)}
				{users.map(({connectionId, info}) => (
					<Avatar key={connectionId} name={info.name} src={info.avatar || ""} />
				))}
			</div>
			<Separator orientation="vertical"/>
		</>
	);
};

const Avatar = ({name, src}: AvatarProps) => {
	const initials = name
		.split(" ")
		.map((part) => part.charAt(0).toUpperCase())
		.join("")
		.slice(0, 2);
	
	return (
		<div
			style={{
				width: AVATAR_SIZE,
				height: AVATAR_SIZE,
			}}
			className='group -ml-2 flex shrink-0 place-content-center relative border-4 border-white rounded-full bg-gray-400'
		>
			<div className='opacity-0 group-hover:opacity-100 absolute top-full w-max px-2 py-1 text-xs bg-black text-white rounded-lg z-10 white whitespace-nowrap transition-opacity'>
				{name}
			</div>
			<img alt={name} src={src} className='size-full rounded-full' />
		</div>
	);
};
