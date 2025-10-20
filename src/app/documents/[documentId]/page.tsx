import { Editor } from "./editor";
import Navbar from "./Navbar";
import { Toolbar } from "./toolbar";
import {Room} from "./room";

export default function Document() {
	return (
		<div className='size-full overflow-x-auto bg-[#f9f8fd] px-4 print:p-0 print:bg-white print:overflow-visible'>
			<div className='flex flex-col px-4 pt-2 gap-y-2 fixed top-0 left-0 right-0 z-10 bg-[#f9f8fd] print:hidden'>
				<Navbar />
				<Toolbar />
			</div>
			<div className='pt-[114px] print:pt-0'>
				<Room>
					<Editor />
				</Room>	
				
			</div>
		</div>
	);
}
