import { useGSAP } from "@gsap/react";
import { useRef, useEffect } from "react";
import gsap from "gsap";

const FONT_WEIGHTS = {
  subtitle: { min: 100, max: 400, default: 100 },
  title: { min: 400, max: 900, default: 400 },
};

const setupTextHover = (container, type) => {
  if (!container) {
    console.error("❌ container is null for type:", type);
    return;
  }

  const letters = container.querySelectorAll("span");
  if (!letters.length) {
    console.error("❌ No letters found in container:", container);
  }

  const { min, max, default: base } = FONT_WEIGHTS[type];

  // Magnetic pull configuration
  const MAGNETIC_RADIUS = 150; // Distance at which magnetic effect starts
  const MAX_PULL = 25; // Maximum pixels a letter can be pulled

  const handleMouseMove = (event) => {
    const rect = container.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    letters.forEach((letter) => {
      const box = letter.getBoundingClientRect();
      const centerX = box.left - rect.left + box.width / 2;
      const centerY = box.top - rect.top + box.height / 2;

      const dx = mouseX - centerX;
      const dy = mouseY - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Calculate intensity based on distance (exponential falloff)
      const intensity = Math.exp(-(distance * distance) / 2500);

      // Magnetic pull calculation - letters are PULLED TOWARD the mouse
      // Normalize direction vector and scale by intensity and max pull
      let magX = 0;
      let magY = 0;

      if (distance < MAGNETIC_RADIUS && distance > 0) {
        // Calculate pull strength (stronger when closer)
        const pullStrength = Math.pow(1 - distance / MAGNETIC_RADIUS, 2);

        // Pull toward mouse (positive direction = toward mouse)
        magX = (dx / distance) * pullStrength * MAX_PULL;
        magY = (dy / distance) * pullStrength * MAX_PULL;
      }

      // Weight also increases based on proximity
      const weight = min + (max - min) * intensity;

      gsap.to(letter, {
        x: magX,
        y: magY,
        fontVariationSettings: `'wght' ${Math.round(weight)}`,
        duration: 0.3,
        ease: "power2.out",
      });
    });
  };

  const handleMouseLeave = () => {
    letters.forEach((letter) =>
      gsap.to(letter, {
        x: 0,
        y: 0,
        fontVariationSettings: `'wght' ${base}`,
        duration: 0.5,
        ease: "elastic.out(1, 0.5)",
      })
    );
  };

  container.addEventListener("mousemove", handleMouseMove);
  container.addEventListener("mouseleave", handleMouseLeave);

  // Return cleanup function
  return () => {
    container.removeEventListener("mousemove", handleMouseMove);
    container.removeEventListener("mouseleave", handleMouseLeave);
  };
};

const renderText = (text, className, baseWeight = 400) => {
  return [...text].map((char, i) => (
    <span
      key={i}
      className={className}
      style={{
        display: "inline-block",
        fontVariationSettings: `'wght' ${baseWeight}`,
        pointerEvents: "auto",
        willChange: "transform",
      }}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ));
};

export default function Welcome() {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  useGSAP(() => {
    const cleanupTitle = setupTextHover(titleRef.current, "title");
    const cleanupSubtitle = setupTextHover(subtitleRef.current, "subtitle");

    return () => {
      cleanupTitle?.();
      cleanupSubtitle?.();
    };
  });

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
        {renderText("Portfolio", "text-9xl italic font-georama")}
      </h1>

      <div className="small-screen">
        <p>This portfolio is designed for desktop screens</p>
      </div>
    </section>
  );
}