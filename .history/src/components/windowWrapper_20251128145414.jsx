import useWindowStore from "#store/windows";
import { use, useRef } from "react";

const WindowWrapper = (Component, windowKey) => {
    const Wrapped = (props) => {
        const  { focusWindow, windows} = useWindowStore();
        const {isOpen, zIndex, } = windows[windowKey];
        const ref = useRef(null);

        return <section id={windowKey} ref={ref} style={{zIndex: zIndex}}>

        </section>
     }
    return <div>WindowWrapper</div>
}
export default WindowWrapper;