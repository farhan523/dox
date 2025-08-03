import { Editor } from "./editor";
import { Toolbar } from "./toolbar";

export default function Document() {
	return (
		<div className='size-full overflow-x-auto bg-[#f9f8fd] px-4 print:p-0 print:bg-white print:overflow-visible'>
			<Toolbar />
			<Editor />
		</div>
	);
}
