import { WindowCOntrols } from "#components";
import WindowControls from "#components/WindowControls";
import WindowWrapper from "#hoc/windowWrapper";

const Resume = () => {

    return <>
    <div id="window-header">
        <WindowCOntrols>
    </div>
    </>
}
const ResumeWindow = WindowWrapper(Resume, 'resume');
export default ResumeWindow;