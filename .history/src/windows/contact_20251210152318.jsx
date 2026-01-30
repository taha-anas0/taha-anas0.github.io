import { COLORS } from "#constants";

const { default: WindowWrapper } = require("#hoc/windowWrapper")

const Contact = () => {
    return (
        <>
        <div
        id="window-header"
        className="relative flex items-center !border-[#333] h-10 px-2"
        style={{
            backgroundColor : COLORS.windowHeaderBgDark
        }}
        >
            <WindowCOntrols target="terminal" />
            <div 
            id="contact-title"
            className="absolute left-1/2 -translate-x-1/2 flex items-center"
            >
            <img src="/images/folder.png" className="w-5 mr-2" />
            </div>
        </div>
        </>
    )
}
const ContactWindow = WindowWrapper(Contact, "contact");
export default ContactWindow;