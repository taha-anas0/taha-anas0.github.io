const { default: WindowWrapper } = require("#hoc/windowWrapper")

const Contact = () => {
    return (
        <>
        <div
        id="window-header"
        className="relative flex items-center !border-[#333] h-10 px-2"
        style={{
            back
        }}
        >

        </div>
        </>
    )
}
const ContactWindow = WindowWrapper(Contact, "contact");
export default ContactWindow;