import EditorHeader from '../layout/EditorHeader';
import EditorContent from '../layout/EditorContent';

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
