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
      const intensity = Math.exp(-(distance * distance) / 2500); // smooth radial falloff

      // magnetic movement (small but soft)
      const magX = dx * 0.12 * intensity; // pull toward mouse
      const magY = dy * 0.12 * intensity;

      // dynamic weight
      const weight = min + (max - min) * intensity;

      animateLetter(letter, weight, magX, magY);
    });
  };

  const handleMouseLeave = () => {
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
        {renderText("Portfolio", "text-9xl italic font-georama")}
      </h1>

      <div className="small-screen">
        <p>This portfolio is designed for desktop screens</p>
      </div>
    </section>
  );
};

export default Welcome;
