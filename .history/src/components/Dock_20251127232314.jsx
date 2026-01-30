import { dockApps } from "#constants";

const Dock = () => {
    const dockRef = useRef(null);
    return (
        <section id="dock">
            <div ref={dockRef} className="dock-container">
                {
                    dockApps.map(({
                        id, name, icon, canOpen
                    })=> {
                        <div key={id} className="relative flex justify-"></div>
                    })
                }
            </div>
        </section>
    )
}
export default Dock;