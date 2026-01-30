import { dockApps } from "#constants";
import { useRef } from "react";
import { Tooltip } from "react-tooltip";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import useWindowStore from "#store/windows";

// Animation constants for easy tuning
const SCALE_BOOST = 0.24;
const LIFT_AMOUNT = 15;
const DISTANCE_FALLOFF = 20000;
const DISTANCE_EXPONENT = 2.5;

const Dock = () => {
    const {openWindow, closeWindow ,window } = useWindowStore();
    const dockRef = useRef(null);

    const toggleApp = (app) => {
        if (!app.canOpen) return;
        // Implement your app opening logic here
        console.log(`Opening app: ${app.id}`);
    };

    useGSAP(() => {
        const dock = dockRef.current;
        if (!dock) return;

        const icons = dock.querySelectorAll(".dock-icon");

        const animateIcons = (mouseX) => {
            icons.forEach((icon) => {
                const { left, width } = icon.getBoundingClientRect();
                const center = left + width / 2;
                const distance = Math.abs(mouseX - center);
                const intensity = Math.exp(-(distance ** DISTANCE_EXPONENT) / DISTANCE_FALLOFF);

                gsap.to(icon, {
                    scale: 1 + SCALE_BOOST * intensity,
                    y: -LIFT_AMOUNT * intensity,
                    duration: 0.2,
                    ease: "power1.out",
                });
            });
        };

        const handleMouseMove = (e) => {
            animateIcons(e.clientX);
        };

        const resetIcons = () => {
            icons.forEach((icon) =>
                gsap.to(icon, {
                    scale: 1,
                    y: 0,
                    duration: 0.4,
                    ease: "power1.out",
                })
            );
        };

        dock.addEventListener("mousemove", handleMouseMove);
        dock.addEventListener("mouseleave", resetIcons);

        return () => {
            dock.removeEventListener("mousemove", handleMouseMove);
            dock.removeEventListener("mouseleave", resetIcons);
        };
    }, []);

    return (
        <section id="dock">
            <div ref={dockRef} className="dock-container">
                {dockApps.map(({ id, name, icon, canOpen }) => (
                    <div key={id} className="relative flex justify-center">
                        <button
                            type="button"
                            className="dock-icon"
                            aria-label={name}
                            data-tooltip-id="dock-tooltip"
                            data-tooltip-content={name}
                            data-tooltip-delay-show={150}
                            disabled={!canOpen}
                            onClick={() => toggleApp({ id, canOpen })}
                        >
                            <img
                                src={`/images/${icon}`}
                                alt={`${name} icon`}
                                loading="lazy"
                                className={canOpen ? "" : "opacity-60"}
                            />
                        </button>
                    </div>
                ))}
                <Tooltip id="dock-tooltip" place="top" className="tooltip" />
            </div>
        </section>
    );
};

export default Dock;