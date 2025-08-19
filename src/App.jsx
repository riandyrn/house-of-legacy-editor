import { useRef } from 'react';
import FileUploadPage from './components/FileUploadPage';
import EditorPage from './components/EditorPage';
import ErrorDialog from './components/ErrorDialog';
import useUIStore from './store/useUIStore';

function App() {
	const fileInputRef = useRef(null);
	const { currentPage, goBackToUpload } = useUIStore();

	const handleGoBackToUpload = () => {
		goBackToUpload();
		if (fileInputRef.current) {
			fileInputRef.current.value = '';
		}
	};

	return (
		<div className="bg-gray-50 min-h-screen">
			{currentPage === 'upload' ? (
				<FileUploadPage fileInputRef={fileInputRef} />
			) : (
				<EditorPage goBackToUpload={handleGoBackToUpload} />
			)}
			<ErrorDialog />
		</div>
	);
}

export default App;