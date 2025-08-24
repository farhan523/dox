import Image from "next/image";
import Navbar from "./Navbar";
import Link from "next/link";

export default function Home() {
	return (
		<div className='flex flex-col  min-h-screen '>
			<div className='fixed pl-2 h-[50px] top-0 left-0 right-0 z-10 bg-white shadow'>
				<Navbar />
			</div>
			<div className='mt-16 p-4'>
				Click <Link href='/documents/123'>here</Link> to go to a document.
			</div>
		</div>
	);
}
