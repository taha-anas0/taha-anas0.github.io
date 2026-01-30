const { default: WindowWrapper } = require("#hoc/windowWrapper")

const Contact = () => {
    return (
        <>
        <div
        id="window-header"
        className="relative flex items-center "
        </>
    )
}
const ContactWindow = WindowWrapper(Contact, "contact");
export default ContactWindow;