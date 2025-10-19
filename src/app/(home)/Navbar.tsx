import Image from "next/image";
import Link from "next/link";
import SearchInput from "./search-input";
import {UserButton, OrganizationSwitcher} from "@clerk/nextjs";

export default function Navbar() {
	return (
		<nav className='flex items-center justify-between h-full w-full px-4'>
			<div className='flex gap-3 items-center shrink-0 	'>
				<Link href='/'>
					<Image src='/logo.svg' alt='Logo' width={30} height={30} />
				</Link>
				<span className='text-lg font-semibold text-black'>Dox</span>
			</div>
			<SearchInput />
			<div className='flex items-center gap-2 shrink-0 '>
				<OrganizationSwitcher
					afterCreateOrganizationUrl={"/"}
					afterLeaveOrganizationUrl='/'
					afterSelectOrganizationUrl={"/"}
					afterSelectPersonalUrl={"/"}
				/>
				<UserButton />
			</div>
		</nav>
	);
}
