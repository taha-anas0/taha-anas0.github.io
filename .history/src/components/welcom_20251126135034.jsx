import { useRef } from "react";

const Welcom = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  return (
    <section className="welcome-section">
        <p ref={subtitleRef}>Hey I'm Anas Welcome to my</p>
    </section>
  );
}
export default Welcom; 