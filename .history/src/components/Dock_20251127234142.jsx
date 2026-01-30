import { dockApps } from "#constants";
import { useRef } from "react";
import { Tooltip } from "react-tooltip";

const Dock = () => {
    const dockRef = useRef(null);
    const toggleApp = (app)=> {

    }

    useGSAP(() => {
        const dock = dockRef.current;
        if(!dock) return;

        const icons = dock.querySelectAll(".dock-icon");

        const animateIcons = (mouseX) => {
            const {left} = dock.getBoundingClientRect();
            icons.forEach((icon)=>{
                const {left: iconLeft, width} = icon.getBoundingClientRect();

                const center = iconLeft - left + width /2;
                const distance = Math.abs(mouseX - center);
                const intensity = Math.exp(-(distance **2) / 20000);
                gsap.to(icon, {
                    scale: 1 + 0.24 * intensity,
                    y: -15 * intensity,
                    duration: 0.2,
                    ease: "power1.out"
                })
            })
        }
        const handleMouseMove = (e) => {
            const {left} = dock.getBoundingClientRect();
            
        }
    })
    return (
        <section id="dock">
            <div ref={dockRef} className="dock-container">
                {
                    dockApps.map(({
                        id, name, icon, canOpen
                    })=> (
                        <div key={id} className="relative flex justify-center">
                            <button 
                            type="button"
                            className="dock-icon" 
                            aria-label={name} 
                            data-tooltip-id="dock-tooltip" 
                            data-tooltip-content={name}
                            data-tooltip-delay-show={150}
                            disabled={!canOpen}
                            onClick={()=> toggleApp({id, canOpen})}
                            >
                                    <img src={`/images/${icon}`} alt={`${name} icon`} 
                                    loading="lazy"
                                    className={canOpen ? '' : 'opacity-60'}/>
                            </button>
                        </div>
                    ))
                }
                <Tooltip id="dock-tooltip" place="top"  className="tooltip"/>
            </div>
        </section>
    )
}
export default Dock;