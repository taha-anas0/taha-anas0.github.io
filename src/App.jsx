import {Navbar, Welcome,Dock} from "#components";
import Draggable from "gsap/Draggable";
import gsap from  "gsap";
import { Resume, Terminal, Contact, Finder } from "#windows";
gsap.registerPlugin(Draggable);


const App = () => {
  return (
    <main>
      <Navbar/>
      <Welcome/>
      <Dock/>

      <Finder/>
      <Contact/>
      <Terminal/>
      <Resume/>
    </main>
  );
}
export default App;