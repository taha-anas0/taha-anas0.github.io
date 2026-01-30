const { default: WindowWrapper } = require("#hoc/windowWrapper")

const Contact = () => {
    return (
        <>
        <div
        id="window-header"
        className=""
        </>
    )
}
const ContactWindow = WindowWrapper(Contact, "contact");
export default ContactWindow;