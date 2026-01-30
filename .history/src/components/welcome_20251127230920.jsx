import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";

const FONT_WEIGHTS = {
  subtitle: { min: 100, max: 400, default: 100 },
  title: { min: 400, max: 900, default: 400 },
};

const setupTextHover = (container, type) => {
  if (!container) return;

  const letters = container.querySelectorAll("span");
  const { min, max, default: base } = FONT_WEIGHTS[type];

  let draggedLetter = null;
  let dragOffsetX = 0;
  let dragOffsetY = 0;

  const animateLetter = (letter, weight, x, y, duration = 0.25) => {
    return gsap.to(letter, {
      duration,
      x,
      y,
      ease: "power3.out",
      fontVariationSettings: `'wght' ${weight}`,
    });
  };

  const handleMouseMove = (event) => {
    // If dragging a letter, move it with the mouse
    if (draggedLetter) {
      const rect = draggedLetter.getBoundingClientRect();
      const parentRect = container.getBoundingClientRect();
      const currentX = gsap.getProperty(draggedLetter, "x") || 0;
      const currentY = gsap.getProperty(draggedLetter, "y") || 0;

      // Calculate new position relative to original
      const newX = event.clientX - parentRect.left - dragOffsetX;
      const newY = event.clientY - parentRect.top - dragOffsetY;

      gsap.to(draggedLetter, {
        x: newX,
        y: newY,
        duration: 0.1,
        ease: "power2.out",
      });
      return;
    }

    const { left, top } = container.getBoundingClientRect();
    const mouseX = event.clientX - left;
    const mouseY = event.clientY - top;

    letters.forEach((letter) => {
      const rect = letter.getBoundingClientRect();
      const centerX = rect.left - left + rect.width / 2;
      const centerY = rect.top - top + rect.height / 2;

      // distance between mouse and letter
      const dx = mouseX - centerX;
      const dy = mouseY - centerY;

      const distance = Math.sqrt(dx * dx + dy * dy);

      // magnetic intensity (closer = stronger)
      const intensity = Math.exp(-(distance * distance) / 1500); // tight radial falloff

      // magnetic movement (gentle pull)
      const magX = dx * 0.25 * intensity; // pull toward mouse
      const magY = dy * 0.25 * intensity;

      // dynamic weight
      const weight = min + (max - min) * intensity;

      animateLetter(letter, weight, magX, magY);
    });
  };

  const handleMouseLeave = () => {
    if (draggedLetter) {
      // Return dragged letter to original position
      gsap.to(draggedLetter, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.5)",
        fontVariationSettings: `'wght' ${base}`,
      });
      draggedLetter = null;
    }

    letters.forEach((letter) =>
      gsap.to(letter, {
        x: 0,
        y: 0,
        duration: 0.4,
        ease: "power3.out",
        fontVariationSettings: `'wght' ${base}`,
      })
    );
  };

  const handleMouseDown = (event) => {
    const target = event.target;
    if (target.tagName === "SPAN" && letters.length) {
      draggedLetter = target;
      const rect = target.getBoundingClientRect();
      const parentRect = container.getBoundingClientRect();

      // Store offset from letter's original position
      const currentX = gsap.getProperty(target, "x") || 0;
      const currentY = gsap.getProperty(target, "y") || 0;
      const letterOriginalX = rect.left - parentRect.left - currentX + rect.width / 2;
      const letterOriginalY = rect.top - parentRect.top - currentY + rect.height / 2;

      dragOffsetX = letterOriginalX;
      dragOffsetY = letterOriginalY;

      // Set max weight while dragging
      gsap.to(draggedLetter, {
        fontVariationSettings: `'wght' ${max}`,
        duration: 0.15,
      });
    }
  };

  const handleMouseUp = () => {
    if (draggedLetter) {
      // Snap back to original position with elastic ease
      gsap.to(draggedLetter, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: "elastic.out(1, 0.4)",
        fontVariationSettings: `'wght' ${base}`,
      });
      draggedLetter = null;
    }
  };

  container.addEventListener("mousemove", handleMouseMove);
  container.addEventListener("mouseleave", handleMouseLeave);
  container.addEventListener("mousedown", handleMouseDown);
  document.addEventListener("mouseup", handleMouseUp);
};

const renderText = (text, className, baseWeight = 400) => {
  return [...text].map((char, i) => (
    <span
      key={i}
      className={className}
      style={{
        display: "inline-block",
        fontVariationSettings: `'wght' ${baseWeight}`,
      }}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ));
};

const Welcome = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  useGSAP(() => {
    setupTextHover(titleRef.current, "title");
    setupTextHover(subtitleRef.current, "subtitle");
  }, []);

  return (
    <section id="welcome">
      <p ref={subtitleRef}>
        {renderText(
          "Hey I'm Anas Welcome to my",
          "text-3xl font-georama",
          100
        )}
      </p>

      <h1 ref={titleRef} className="mt-7">
        {renderText("Portfolio", "text-8xl italic font-georama")}
      </h1>

      <div className="small-screen">
        <p>This portfolio is designed for desktop screens</p>
      </div>
    </section>
  );
};

export default Welcome;
