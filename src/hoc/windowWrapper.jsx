import useWindowStore from "#store/windows";
import { useRef, useCallback } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useLayoutEffect } from "react";
import Draggable from "gsap/Draggable";
import { ResizeHandles } from "#components";

const MIN_WIDTH = 200;
const MIN_HEIGHT = 150;

const WindowWrapper = (Component, windowKey) => {
  const Wrapped = (props) => {
    const { focusWindow, windows } = useWindowStore();
    const { isOpen, isMinimized, isMaximized, zIndex } = windows[windowKey];
    const ref = useRef(null);
    const draggableRef = useRef(null);
    const resizeState = useRef(null);

    // Handle open animation
    useGSAP(() => {
      const el = ref.current;
      if (!el || !isOpen) return;

      el.style.display = "block";

      gsap.fromTo(
        el,
        { scale: 0.8, opacity: 0, y: 40 },
        { scale: 1, opacity: 1, y: 0, duration: 0.2, ease: "power3.out" }
      );
    }, [isOpen]);

    // Handle draggable - only from header
    useGSAP(() => {
      const el = ref.current;
      if (!el) return;

      const header = el.querySelector("#window-header");

      const [instance] = Draggable.create(el, {
        trigger: header || el,
        onPress: () => focusWindow(windowKey),
      });
      draggableRef.current = instance;
      return () => instance.kill();
    }, []);

    // Handle visibility (open/close)
    useLayoutEffect(() => {
      const el = ref.current;
      if (!el) return;
      el.style.display = isOpen ? "block" : "none";

      gsap.fromTo(
        el,
        { scale: 0.8, opacity: 0, y: 40 },
        { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }
      );
    }, [isOpen]);

    // Handle minimize animation
    useLayoutEffect(() => {
      const el = ref.current;
      if (!el || !isOpen) return;

      if (isMinimized) {
        gsap.to(el, {
          scale: 0.5,
          opacity: 0,
          y: window.innerHeight,
          duration: 0.3,
          ease: "power2.in",
          onComplete: () => {
            el.style.visibility = "hidden";
          },
        });
      } else {
        el.style.visibility = "visible";
        gsap.to(el, {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    }, [isMinimized, isOpen]);

    // Handle maximize - disable/enable dragging
    useLayoutEffect(() => {
      if (draggableRef.current) {
        if (isMaximized) {
          draggableRef.current.disable();
        } else {
          draggableRef.current.enable();
        }
      }
    }, [isMaximized]);

    // Handle resize
    const handleResizeStart = useCallback((e, handle) => {
      e.preventDefault();
      e.stopPropagation();
      focusWindow(windowKey);

      const el = ref.current;
      if (!el || isMaximized) return;

      const rect = el.getBoundingClientRect();
      resizeState.current = {
        startX: e.clientX,
        startY: e.clientY,
        startWidth: rect.width,
        startHeight: rect.height,
        startLeft: el.offsetLeft,
        startTop: el.offsetTop,
        handle,
      };

      document.addEventListener("mousemove", handleResizeMove);
      document.addEventListener("mouseup", handleResizeEnd);
    }, [isMaximized, focusWindow]);

    const handleResizeMove = useCallback((e) => {
      const el = ref.current;
      const state = resizeState.current;
      if (!el || !state) return;

      const deltaX = e.clientX - state.startX;
      const deltaY = e.clientY - state.startY;
      const { handle } = state;

      let newWidth = state.startWidth;
      let newHeight = state.startHeight;
      let newLeft = state.startLeft;
      let newTop = state.startTop;

      // Horizontal resize
      if (handle.includes("right")) {
        newWidth = Math.max(MIN_WIDTH, state.startWidth + deltaX);
      } else if (handle.includes("left")) {
        newWidth = Math.max(MIN_WIDTH, state.startWidth - deltaX);
        if (newWidth > MIN_WIDTH) {
          newLeft = state.startLeft + deltaX;
        }
      }

      // Vertical resize
      if (handle.includes("bottom")) {
        newHeight = Math.max(MIN_HEIGHT, state.startHeight + deltaY);
      } else if (handle.includes("top")) {
        newHeight = Math.max(MIN_HEIGHT, state.startHeight - deltaY);
        if (newHeight > MIN_HEIGHT) {
          newTop = state.startTop + deltaY;
        }
      }

      gsap.set(el, {
        width: newWidth,
        height: newHeight,
        left: newLeft,
        top: newTop,
      });
    }, []);

    const handleResizeEnd = useCallback(() => {
      resizeState.current = null;
      document.removeEventListener("mousemove", handleResizeMove);
      document.removeEventListener("mouseup", handleResizeEnd);
    }, [handleResizeMove]);

    return (
      <section
        id={windowKey}
        ref={ref}
        style={{ zIndex }}
        className={`absolute ${isMaximized ? "window-maximized" : ""}`}
      >
        <Component {...props} />
        {!isMaximized && <ResizeHandles onResizeStart={handleResizeStart} />}
      </section>
    );
  };

  Wrapped.displayName = `WindowWrapper(${Component.displayName || Component.name || "Component"})`;

  return Wrapped;
};

export default WindowWrapper;
