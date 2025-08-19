import { useRef } from 'react';
import FileUploadPage from './components/FileUploadPage';
import EditorPage from './components/EditorPage';
import useAppStore from './store/useAppStore';

function App() {
	const fileInputRef = useRef(null);
	const { currentPage, goBackToUpload } = useAppStore();

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
		</div>
	);
}

export default App;