import { useRef } from "react";


const renderText = (text, className, baseWeigt = 400) => {
  return [...text].map((char,i)=> return (
    <span id={i}></span>
  ) )
}
const Welcome = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  return (
    <section id="welcome">
        <p ref={subtitleRef}>Hey I'm Anas Welcome to my</p>
        <h1 ref={titleRef}>Portfolio</h1>


        <div className="small-screen">
            <p>This portfolio is designed for desktop screen </p>
        </div>
    </section>
  );
}
export default Welcome; 