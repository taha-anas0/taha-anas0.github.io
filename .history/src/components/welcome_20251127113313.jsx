import { useRef } from "react";

const FONT_WEIGHTS = {
  subtitle: {min: 100, max:400, default: 100},
  title: {min: 400, max:900, default: 400},
}

const setupTextHover = (container, type) => {
  if(!container) return;
  const letters = container.querySelectorAll("span");
  const {min, max,  default: base} = FONT_WEIGHTS[type];
  const animateLetter = (letter, weight , duration = 0.25) => {
  return gsap.to(letter, {
    duration,
    ease: "power2.out",
     fontVariationSettings: `'wght' ${weight}`,
     
    })
}
  const handmeMouseMove = (event) => {
    const {left } = container.getBoundingClientRect();
    const mouseX = event.clientX - left;

    letters.forEach((letter) => {
      const {left: l, width: w} = letter.getBoundingClientRect();
      const distance = Math.abs(mouseX - (l -left + w / 2));
      const intensity = Math.exp(-(distance**2)/2000); 

      animateLetter(letter, min + (max -min) * intensity);
    });
  }
}


const renderText = (text, className, baseWeigt = 400) => {
  return [...text].map((char,i)=>  (
    <span key={i} className={className} style={{
      fontVariationSettings: `'wght' ${baseWeigt}`
    }}>{char === " " ? "\u000A" : char}</span>
  ) )
}
const Welcome = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);


  useGs
  return (
    <section id="welcome">
        <p ref={subtitleRef}>
          {renderText("Hey I'm Anas Welcome to my",'text-3xl , font-georama', 100)}
        </p>
        <h1 ref={titleRef} className="mt-7">
          {renderText("Portfolio", "text-9xl italic font-georama")}
        </h1>


        <div className="small-screen">
            <p>This portfolio is designed for desktop screen </p>
        </div>
    </section>
  );
}
export default Welcome; 