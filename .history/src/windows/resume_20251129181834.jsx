import WindowControls from "#components/WindowControls";
import WindowWrapper from "#hoc/windowWrapper";

const Resume = () => {

    return <>
    <div id="window-header">
        <WindowControls>
    </div>
    </>
}
const ResumeWindow = WindowWrapper(Resume, 'resume');
export default ResumeWindow;