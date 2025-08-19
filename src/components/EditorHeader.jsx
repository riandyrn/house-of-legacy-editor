import useGameDataStore from '../store/useGameDataStore';

function EditorHeader({ goBackToUpload }) {
	const { saveToFile } = useGameDataStore();

	return (
		<header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
			<div className="container mx-auto px-4 py-4">
				<div className="flex justify-between items-center">
					<h1 className="text-xl font-semibold text-gray-900">House of Legacy Save Editor</h1>
					<div className="flex items-center space-x-3">
						<button onClick={saveToFile} className="flex items-center bg-gray-800 text-white px-5 py-2.5 rounded-lg shadow hover:bg-gray-900 transition-colors">
							<span className="material-icons mr-2 text-lg">save</span>
							Save to File
						</button>
						<button onClick={goBackToUpload} className="flex items-center bg-gray-100 text-gray-700 px-5 py-2.5 rounded-lg border border-gray-300 hover:bg-gray-200 transition-colors">
							<span className="material-icons mr-2 text-lg">close</span>
							Cancel
						</button>
					</div>
				</div>
			</div>
		</header>
	);
}

export default EditorHeader;
