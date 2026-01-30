import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";

const FONT_WEIGHTS = {
  subtitle: { min: 100, max: 400, default: 100 },
  title: { min: 400, max: 900, default: 400 },
};

const MAGNETIC_CONFIG = {
  falloff: 1500,
  pullX: 0.2,
  pullY: 0.2,
};

const getDistance = (x1, y1, x2, y2) => Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

const getIntensity = (distance) => Math.exp(-(distance ** 2) / MAGNETIC_CONFIG.falloff);

const setupMagneticText = (container, type) => {
  if (!container) return;

  const letters = container.querySelectorAll("span");
  const { min, max, default: base } = FONT_WEIGHTS[type];

  const animateLetter = (letter, { weight, x = 0, y = 0, duration = 0.25 }) => {
    gsap.to(letter, {
      duration,
      x,
      y,
      ease: "power3.out",
      fontVariationSettings: `'wght' ${weight}`,
    });
  };

  const resetLetter = (letter) => {
    animateLetter(letter, { weight: base, x: 0, y: 0, duration: 0.4 });
  };

  const onMouseMove = (e) => {
    const { left, top } = container.getBoundingClientRect();
    const mouseX = e.clientX - left;
    const mouseY = e.clientY - top;

    letters.forEach((letter) => {
      const rect = letter.getBoundingClientRect();
      const centerX = rect.left - left + rect.width / 2;
      const centerY = rect.top - top + rect.height / 2;

      const dx = mouseX - centerX;
      const dy = mouseY - centerY;
      const intensity = getIntensity(getDistance(mouseX, mouseY, centerX, centerY));

      animateLetter(letter, {
        weight: min + (max - min) * intensity,
        x: dx * MAGNETIC_CONFIG.pullX * intensity,
        y: dy * MAGNETIC_CONFIG.pullY * intensity,
      });
    });
  };

  const onMouseLeave = () => letters.forEach(resetLetter);

  container.addEventListener("mousemove", onMouseMove);
  container.addEventListener("mouseleave", onMouseLeave);
};

const Letter = ({ char, className, weight }) => (
  <span
    className={className}
    style={{
      display: "inline-block",
      fontVariationSettings: `'wght' ${weight}`,
    }}
  >
    {char === " " ? "\u00A0" : char}
  </span>
);

const AnimatedText = ({ text, className, weight = 400 }) => (
  <>
    {[...text].map((char, i) => (
      <Letter key={i} char={char} className={className} weight={weight} />
    ))}
  </>
);

const Welcome = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  useGSAP(() => {
    setupMagneticText(titleRef.current, "title");
    setupMagneticText(subtitleRef.current, "subtitle");
  }, []);

  return (
    <section id="welcome">
      <p ref={subtitleRef}>
        <AnimatedText
          text="Hey I'm Anas Welcome to my"
          className="text-3xl font-georama"
          weight={100}
        />
      </p>

      <h1 ref={titleRef} className="mt-7">
        <AnimatedText text="Portfolio" className="text-8xl italic font-georama" />
      </h1>

      <div className="small-screen">
        <p>This portfolio is designed for desktop screens</p>
      </div>
    </section>
  );
};

export default Welcome;
