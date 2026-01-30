import { useRef } from "react";

const Welcome = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  return (
    <section className="welcome">
        <p ref={subtitleRef}>Hey I'm Anas Welcome to my</p>
        <h1 ref={titleRef}>Portfolio</h1>


        <div className="small-screen">
            <p>This portfolio is designed for desktop screen </p>
        </div>
    </section>
  );
}
export default Welcom; 