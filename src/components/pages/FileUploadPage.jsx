import useUIStore from '../../store/useUIStore';
import useGameDataStore from '../../store/useGameDataStore';

function FileUploadPage({ fileInputRef }) {
	const { selectedFile, setSelectedFile, setCurrentPage, showError } = useUIStore();
	const { parseES3Data } = useGameDataStore();

	const handleFileSelect = (file) => {
		setSelectedFile(file);
	};

	const handleFileSelectEvent = (event) => {
		const file = event.target.files[0];
		if (file) {
			handleFileSelect(file);
		}
	};

	const handleDragOver = (event) => {
		event.preventDefault();
		event.target.closest('.file-upload-area').classList.add('dragover');
	};

	const handleDragLeave = (event) => {
		event.preventDefault();
		event.target.closest('.file-upload-area').classList.remove('dragover');
	};

	const handleFileDrop = (event) => {
		event.preventDefault();
		event.target.closest('.file-upload-area').classList.remove('dragover');
		const files = event.dataTransfer.files;
		if (files.length > 0) {
			handleFileSelect(files[0]);
		}
	};

	const openEditor = () => {
		if (selectedFile) {
			// Read the file content and parse it
			const reader = new FileReader();
			reader.onload = (e) => {
				const fileContent = e.target.result;
				try {
					parseES3Data(fileContent, selectedFile.name);
					setCurrentPage('editor');
				} catch (error) {
					console.error('Error parsing ES3 file:', error);
					showError(`Failed to parse ${selectedFile.name}\n\nThe selected file is not a valid ES3 save file or is corrupted. Please make sure you've selected the correct GameData.es3 file from your House of Legacy save directory.`);
				}
			};
			reader.readAsText(selectedFile);
		}
	};
	return (
		<div className="min-h-screen flex items-center justify-center p-6">
			<div className="bg-white rounded-lg shadow-lg p-12 w-full max-w-2xl">
				<div className="text-center mb-8">
					<h1 className="text-3xl font-semibold text-gray-900 mb-4">House of Legacy Save Editor</h1>
					<p className="text-gray-600 text-base mb-6">
						Locate House of Legacy save file on your computer:
					</p>
					<div className="text-sm text-gray-500 space-y-2 bg-gray-50 p-4 rounded-lg">
						<div>C:\Users\{'{Username}'}\AppData\LocalLow\S3Studio\House of Legacy\FW\{'{index}'}\GameData.es3</div>
						<div className="text-gray-400">For example:</div>
						<div>C:\Users\DaveAdams\AppData\LocalLow\S3Studio\House of Legacy\FW\0\GameData.es3</div>
					</div>
				</div>

				<div className="space-y-6">
					{/* File Upload Area */}
					<div 
						className="file-upload-area rounded-lg p-12 text-center cursor-pointer"
						onClick={() => fileInputRef.current.click()}
						onDragOver={handleDragOver}
						onDragLeave={handleDragLeave}
						onDrop={handleFileDrop}
					>
						<div className="flex flex-col items-center">
							<span className="material-icons text-6xl text-gray-400 mb-4">cloud_upload</span>
							<p className="text-gray-600 font-medium text-lg">Choose File</p>
							<p className="text-sm text-gray-500 mt-2">or drag and drop</p>
						</div>
					</div>

					{/* Hidden file input */}
					<input 
						type="file" 
						ref={fileInputRef} 
						onChange={handleFileSelectEvent} 
						accept=".es3"
						className="hidden"
					/>

					{/* Selected file display */}
					{selectedFile && (
						<div className="p-4 bg-gray-50 rounded-lg border text-base">
							<div className="flex items-center">
								<span className="material-icons text-gray-500 mr-3 text-xl">description</span>
								<span className="text-gray-700 font-medium">{selectedFile.name}</span>
							</div>
						</div>
					)}

					{/* Open Editor Button */}
					<button 
						onClick={openEditor} 
						disabled={!selectedFile}
						className={`w-full py-4 px-6 rounded-lg font-medium text-lg transition-colors flex items-center justify-center ${
							selectedFile 
								? 'bg-gray-800 hover:bg-gray-900 text-white' 
								: 'bg-gray-300 text-gray-500 cursor-not-allowed'
						}`}
					>
						<span className="material-icons mr-2 text-xl">edit</span>
						Open Editor
					</button>
				</div>
			</div>
		</div>
	);
}

export default FileUploadPage;
