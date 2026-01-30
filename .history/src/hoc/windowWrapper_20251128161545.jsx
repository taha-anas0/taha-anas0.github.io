import useWindowStore from "#store/windows";
import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";

const WindowWrapper = (Component, windowKey) => {
  const Wrapped = (props) => {
    const { focusWindow, windows } = useWindowStore();
    const { isOpen, zIndex } = windows[windowKey];
    const ref = useRef(null);


    

    useLayoutEffect(() => {
      const el = ref.current;
      if (!el) return;

      if (isOpen) {
        // Make visible BEFORE animation
        el.style.display = "block";

        // OPEN animation (slower, smooth)
        gsap.fromTo(
          el,
          { scale: 0.85, opacity: 0, y: 30 },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 0.35,
            ease: "power3.out",
          }
        );
      } else {
        // CLOSE animation (faster)
        gsap.to(el, {
          scale: 0.9,
          opacity: 0,
          y: 20,
          duration: 0.1, // faster
          ease: "power1.in",
          onComplete: () => {
            // Hide only AFTER close animation finishes
            el.style.display = "none";
          },
        });
      }
    }, [isOpen]);

    return (
      <section
        id={windowKey}
        ref={ref}
        style={{ zIndex }}
        className="absolute"
        onMouseDown={() => focusWindow(windowKey)}
      >
        <Component {...props} />
      </section>
    );
  };

  Wrapped.displayName =
    `WindowWrapper(${Component.displayName || Component.name || "Component"})`;

  return Wrapped;
};

export default WindowWrapper;
