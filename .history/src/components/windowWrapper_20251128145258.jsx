import useWindowStore from "#store/windows";

const WindowWrapper = (Component, windowKey) => {
    const Wrapped = (props) => {
        const  { focusWindow, windows} = useWindowStore();
        const {isOpen, } = windows[windowKey];
     }
    return <div>WindowWrapper</div>
}
export default WindowWrapper;