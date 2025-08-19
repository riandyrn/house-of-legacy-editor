import EditorHeader from './EditorHeader';
import EditorContent from './EditorContent';

function EditorPage({ goBackToUpload }) {
	return (
		<div>
			<EditorHeader goBackToUpload={goBackToUpload} />
			<div className="container mx-auto p-4">
				<EditorContent />
			</div>
		</div>
	);
}

export default EditorPage;
