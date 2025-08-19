import { useState, useRef } from 'react';
import CharacterTable from './components/CharacterTable';
import RetainerTable from './components/RetainerTable';
import ResourceTable from './components/ResourceTable';
import CharacterModal from './components/CharacterModal';
import RetainerModal from './components/RetainerModal';
import ResourceModal from './components/ResourceModal';

function App() {
	// SPA State
	const [currentPage, setCurrentPage] = useState('upload');
	const [selectedFile, setSelectedFile] = useState(null);
	const fileInputRef = useRef(null);

	// File handling methods
	const handleFileSelect = (event) => {
		const file = event.target.files[0];
		if (file) {
			setSelectedFile(file);
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
			setSelectedFile(files[0]);
		}
	};

	// Navigation methods
	const openEditor = () => {
		if (selectedFile) {
			setCurrentPage('editor');
		}
	};

	const goBackToUpload = () => {
		setCurrentPage('upload');
		setSelectedFile(null);
		if (fileInputRef.current) {
			fileInputRef.current.value = '';
		}
	};

	return (
		<div className="bg-gray-50">
			{currentPage === 'upload' ? (
				<FileUploadPage 
					selectedFile={selectedFile}
					fileInputRef={fileInputRef}
					handleFileSelect={handleFileSelect}
					handleDragOver={handleDragOver}
					handleDragLeave={handleDragLeave}
					handleFileDrop={handleFileDrop}
					openEditor={openEditor}
				/>
			) : (
				<EditorPage goBackToUpload={goBackToUpload} />
			)}
		</div>
	);
}

function FileUploadPage({ selectedFile, fileInputRef, handleFileSelect, handleDragOver, handleDragLeave, handleFileDrop, openEditor }) {
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
						onChange={handleFileSelect} 
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

function EditorPage({ goBackToUpload }) {
	return (
		<div>
			{/* Sticky Header */}
			<header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
				<div className="container mx-auto px-4 py-4">
					<div className="flex justify-between items-center">
						<h1 className="text-xl font-semibold text-gray-900">House of Legacy Save Editor</h1>
						<div className="flex items-center space-x-3">
							<button className="flex items-center bg-gray-800 text-white px-5 py-2.5 rounded-lg shadow hover:bg-gray-900 transition-colors">
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

			<div className="container mx-auto p-4">
				<EditorContent />
			</div>
		</div>
	);
}

function EditorContent() {
	// State
	const [activeTab, setActiveTab] = useState('clanMembers');
	const [selectedSkill, setSelectedSkill] = useState('Medical');
	
	// Modal state
	const [showCharacterModal, setShowCharacterModal] = useState(false);
	const [showRetainerModal, setShowRetainerModal] = useState(false);
	const [showResourceModal, setShowResourceModal] = useState(false);
	
	// Editing state
	const [editingCharacter, setEditingCharacter] = useState({});
	const [editingRetainer, setEditingRetainer] = useState({});
	const [editingResource, setEditingResource] = useState({});
	const [editingIndex, setEditingIndex] = useState(-1);
	
	// Data
	const [clanMembersData, setClanMembersData] = useState([
		{ name: "Zilan Ma", age: 87, literature: 100, martial: 83.5, commerce: 100, art: 100, strategy: 100, reputation: 100, luck: 100, charm: 83, health: 100, talent: "Martial", talentValue: 100, skill: "Medical", skillValue: 100 },
		{ name: "Yier Ma", age: 87, literature: 100, martial: 83.5, commerce: 100, art: 100, strategy: 100, reputation: 100, luck: 100, charm: 83, health: 100, talent: "Martial", talentValue: 100, skill: "None", skillValue: 100 },
		{ name: "Boxun Ma", age: 87, literature: 100, martial: 83.5, commerce: 100, art: 100, strategy: 100, reputation: 100, luck: 100, charm: 83, health: 100, talent: "Martial", talentValue: 100, skill: "None", skillValue: 100 }
	]);
	
	const [spousesData, setSpousesData] = useState([
		{ name: "Lady Chen", age: 45, literature: 95, martial: 15, commerce: 85, art: 90, strategy: 70, reputation: 88, luck: 75, charm: 95, health: 92, talent: "Commerce", talentValue: 88, skill: "Medical", skillValue: 85 },
		{ name: "Madam Liu", age: 38, literature: 88, martial: 20, commerce: 78, art: 85, strategy: 65, reputation: 82, luck: 70, charm: 90, health: 85, talent: "Art", talentValue: 85, skill: "None", skillValue: 0 }
	]);
	
	const [retainersData, setRetainersData] = useState([
		{ name: "Jieci Qiang", age: 35, literature: 100, martial: 100, commerce: 100, art: 100, strategy: 100, reputation: 100, monthlySalary: 0 },
		{ name: "Retainer Two", age: 28, literature: 90, martial: 95, commerce: 85, art: 80, strategy: 88, reputation: 92, monthlySalary: 50 }
	]);
	
	const [resourcesData, setResourcesData] = useState([
		{ money: 278398881, yuanbao: 3400966, food: 93919765, vegetables: 85704326, meat: 84626507 }
	]);
	
	// Get current data based on active tab
	const getCurrentData = () => {
		switch(activeTab) {
			case 'clanMembers': return clanMembersData;
			case 'spouses': return spousesData;
			case 'retainers': return retainersData;
			case 'resources': return resourcesData;
			default: return [];
		}
	};
	
	const showSkillsSelector = activeTab === 'clanMembers' || activeTab === 'spouses';
	const maxButtonText = activeTab === 'resources' ? 'Max All Resources' : 'Max All Attributes';
	
	// Methods
	const applySkillToNone = () => {
		const updateData = (data, setData) => {
			const updated = data.map(item => {
				if (item.skill === 'None') {
					return { ...item, skill: selectedSkill };
				}
				return item;
			});
			setData(updated);
		};

		if (activeTab === 'clanMembers') {
			updateData(clanMembersData, setClanMembersData);
		} else if (activeTab === 'spouses') {
			updateData(spousesData, setSpousesData);
		}
	};
	
	const maxAllAttributes = () => {
		if (activeTab === 'resources') {
			// Max resources - set to high values
			const updated = resourcesData.map(item => ({
				...item,
				money: 999999999,
				yuanbao: 999999999,
				food: 999999999,
				vegetables: 999999999,
				meat: 999999999
			}));
			setResourcesData(updated);
		} else {
			// Max all numeric attributes except age
			const updateData = (data, setData) => {
				const updated = data.map(item => {
					const newItem = { ...item };
					Object.keys(newItem).forEach(key => {
						if (typeof newItem[key] === 'number' && key !== 'age') {
							newItem[key] = 100;
						}
					});
					return newItem;
				});
				setData(updated);
			};

			if (activeTab === 'clanMembers') {
				updateData(clanMembersData, setClanMembersData);
			} else if (activeTab === 'spouses') {
				updateData(spousesData, setSpousesData);
			} else if (activeTab === 'retainers') {
				updateData(retainersData, setRetainersData);
			}
		}
	};
	
	// Modal methods
	const openCharacterModal = (character, index) => {
		setEditingCharacter({ ...character });
		setEditingIndex(index);
		setShowCharacterModal(true);
	};
	
	const closeCharacterModal = () => {
		setShowCharacterModal(false);
		setEditingCharacter({});
		setEditingIndex(-1);
	};
	
	const saveCharacter = (updatedCharacter) => {
		setEditingCharacter(updatedCharacter);
		if (editingIndex >= 0) {
			if (activeTab === 'clanMembers') {
				const updated = [...clanMembersData];
				updated[editingIndex] = { ...updatedCharacter };
				setClanMembersData(updated);
			} else if (activeTab === 'spouses') {
				const updated = [...spousesData];
				updated[editingIndex] = { ...updatedCharacter };
				setSpousesData(updated);
			}
		}
	};
	
	const maxCharacterAttributes = () => {
		const newCharacter = { ...editingCharacter };
		Object.keys(newCharacter).forEach(key => {
			if (typeof newCharacter[key] === 'number' && key !== 'age') {
				newCharacter[key] = 100;
			}
		});
		setEditingCharacter(newCharacter);
	};
	
	const openRetainerModal = (retainer, index) => {
		setEditingRetainer({ ...retainer });
		setEditingIndex(index);
		setShowRetainerModal(true);
	};
	
	const closeRetainerModal = () => {
		setShowRetainerModal(false);
		setEditingRetainer({});
		setEditingIndex(-1);
	};
	
	const saveRetainer = (updatedRetainer) => {
		setEditingRetainer(updatedRetainer);
		if (editingIndex >= 0) {
			const updated = [...retainersData];
			updated[editingIndex] = { ...updatedRetainer };
			setRetainersData(updated);
		}
	};
	
	const maxRetainerAttributes = () => {
		const newRetainer = { ...editingRetainer };
		Object.keys(newRetainer).forEach(key => {
			if (typeof newRetainer[key] === 'number' && key !== 'age') {
				newRetainer[key] = 100;
			}
		});
		setEditingRetainer(newRetainer);
	};
	
	const openResourceModal = (resource, index) => {
		setEditingResource({ ...resource });
		setEditingIndex(index);
		setShowResourceModal(true);
	};
	
	const closeResourceModal = () => {
		setShowResourceModal(false);
		setEditingResource({});
		setEditingIndex(-1);
	};
	
	const saveResource = (updatedResource) => {
		setEditingResource(updatedResource);
		if (editingIndex >= 0) {
			const updated = [...resourcesData];
			updated[editingIndex] = { ...updatedResource };
			setResourcesData(updated);
		}
	};

	return (
		<main className="bg-white rounded-lg shadow-lg p-6 mt-4">
			<div className="border-b border-gray-200 mb-4">
				<div className="flex justify-between items-end">
					<nav aria-label="Tabs" className="-mb-px flex space-x-8">
						{['clanMembers', 'spouses', 'retainers', 'resources'].map((tab) => (
							<button 
								key={tab}
								onClick={() => setActiveTab(tab)}
								className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-base ${
									activeTab === tab 
										? 'border-gray-800 text-gray-900' 
										: 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
								}`}
							>
								{tab === 'clanMembers' ? 'Clan Members' : 
								 tab === 'spouses' ? 'Spouses' :
								 tab === 'retainers' ? 'Retainers' : 'Resources'}
							</button>
						))}
					</nav>
					<div className="flex items-center space-x-4 py-4">
						{showSkillsSelector && (
							<>
								<div className="flex items-center space-x-2">
									<label className="text-sm font-medium text-gray-700">Set None Skills to:</label>
									<select 
										value={selectedSkill} 
										onChange={(e) => setSelectedSkill(e.target.value)}
										className="w-36 py-1 px-2 text-sm rounded-md border-gray-300 shadow-sm focus:border-gray-400 focus:ring focus:ring-gray-200 focus:ring-opacity-50"
									>
										<option value="Medical">Medical</option>
										<option value="Craft">Craft</option>
										<option value="Martial">Martial</option>
									</select>
									<button onClick={applySkillToNone} className="bg-gray-800 text-white px-4 py-1.5 rounded-md text-sm font-medium hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600">Apply</button>
								</div>
								<div className="text-gray-300 text-sm">|</div>
							</>
						)}
						<button onClick={maxAllAttributes} className="bg-gray-800 text-white px-4 py-1.5 rounded-md text-sm font-medium hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600">
							{maxButtonText}
						</button>
					</div>
				</div>
			</div>

			{/* Characters Table (Clan Members & Spouses) */}
			{(activeTab === 'clanMembers' || activeTab === 'spouses') && (
				<CharacterTable data={getCurrentData()} onEdit={openCharacterModal} />
			)}

			{/* Retainers Table */}
			{activeTab === 'retainers' && (
				<RetainerTable data={getCurrentData()} onEdit={openRetainerModal} />
			)}

			{/* Resources Table */}
			{activeTab === 'resources' && (
				<ResourceTable data={getCurrentData()} onEdit={openResourceModal} />
			)}

			{/* Character Modal */}
			<CharacterModal 
				isOpen={showCharacterModal}
				character={editingCharacter}
				onClose={closeCharacterModal}
				onSave={saveCharacter}
				onMaxAttributes={maxCharacterAttributes}
			/>

			{/* Retainer Modal */}
			<RetainerModal 
				isOpen={showRetainerModal}
				retainer={editingRetainer}
				onClose={closeRetainerModal}
				onSave={saveRetainer}
				onMaxAttributes={maxRetainerAttributes}
			/>

			{/* Resource Modal */}
			<ResourceModal 
				isOpen={showResourceModal}
				resource={editingResource}
				onClose={closeResourceModal}
				onSave={saveResource}
			/>
		</main>
	);
}

export default App;