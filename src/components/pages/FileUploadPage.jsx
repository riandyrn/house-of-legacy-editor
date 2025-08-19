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
		<div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
			<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 w-full max-w-lg">
				<div className="text-center space-y-8">
					{/* Header */}
					<div className="space-y-3">
						<h1 className="text-2xl font-semibold text-gray-900">
							House of Legacy Save Editor
						</h1>
						<p className="text-gray-600 text-sm">
							Upload your GameData.es3 file to get started
						</p>
					</div>
					
					{/* Game Banner */}
					<div>
						<img 
							src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2503770/b33b96f5e8795a6ddad37c3cc1e5abb3557b8274/capsule_616x353.jpg?t=1752485158" 
							alt="House of Legacy Game Banner" 
							className="w-full h-32 object-cover rounded-lg"
						/>
					</div>
					
					{/* File Path Info */}
					<div className="text-left space-y-3">
						<p className="text-sm font-medium text-gray-900">Save file location:</p>
						<div className="bg-gray-50 p-4 rounded-lg text-xs font-mono text-gray-600 space-y-2">
							<div>C:\Users\{'{Username}'}\AppData\LocalLow\S3Studio\House of Legacy\FW\{'{index}'}\GameData.es3</div>
							<div className="text-gray-500">Example:</div>
							<div className="text-gray-800">C:\Users\DaveAdams\AppData\LocalLow\S3Studio\House of Legacy\FW\0\GameData.es3</div>
						</div>
					</div>
				</div>
				<br />
				<div className="space-y-6">
					{/* File Upload Area */}
					<div 
						className="file-upload-area border-2 border-dashed border-gray-300 rounded-lg p-10 text-center cursor-pointer hover:border-gray-400 transition-colors"
						onClick={() => fileInputRef.current.click()}
						onDragOver={handleDragOver}
						onDragLeave={handleDragLeave}
						onDrop={handleFileDrop}
					>
						<div className="space-y-3">
							<svg className="w-8 h-8 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
							</svg>
							<div className="space-y-1">
								<p className="text-sm font-medium text-gray-900">Choose a file</p>
								<p className="text-xs text-gray-500">or drag and drop</p>
								<p className="text-xs text-gray-400">ES3 files only</p>
							</div>
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
						<div className="bg-gray-50 p-3 rounded-lg border">
							<div className="flex items-center">
								<svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
								</svg>
								<span className="text-sm font-medium text-gray-900">{selectedFile.name}</span>
							</div>
						</div>
					)}

					{/* Open Editor Button */}
					<button 
						onClick={openEditor} 
						disabled={!selectedFile}
						className={`w-full py-3 px-4 rounded-lg text-sm font-medium transition-colors ${
							selectedFile 
								? 'bg-gray-900 hover:bg-gray-800 text-white' 
								: 'bg-gray-100 text-gray-400 cursor-not-allowed'
						}`}
					>
						{selectedFile ? 'Open Editor' : 'Select a file to continue'}
					</button>
				</div>
			</div>
		</div>
	);
}

export default FileUploadPage;
