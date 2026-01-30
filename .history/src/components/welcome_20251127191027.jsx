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

      const intensity = Math.exp(-(distance * distance) / 2500);

      const magX = dx * 0.15 * intensity;
      const magY = dy * 0.15 * intensity;

      const weight = min + (max - min) * intensity;

      gsap.to(letter, {
        x: magX,
        y: magY,
        fontVariationSettings: `'wght' ${Math.round(weight)}`,
        duration: 0.25,
        ease: "power3.out",
      });
    });
  };

  const handleMouseLeave = () => {
    letters.forEach((letter) =>
      gsap.to(letter, {
        x: 0,
        y: 0,
        fontVariationSettings: `'wght' ${base}`,
        duration: 0.3,
        ease: "power3.out",
      })
    );
  };

  container.addEventListener("mousemove", handleMouseMove);
  container.addEventListener("mouseleave", handleMouseLeave);
};

const renderText = (text, className, baseWeight = 400) => {
  return [...text].map((char, i) => (
    <span
      key={i}
      className={className}
      style={{
        display: "inline-block",
        fontVariationSettings: `'wght' ${baseWeight}`,
        pointerEvents: "auto", // IMPORTANT
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
    setupTextHover(titleRef.current, "title");
    setupTextHover(subtitleRef.current, "subtitle");
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
