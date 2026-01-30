import {Navbar, Welcome,Dock} from "#components";
import Draggable from "gsap-trial/Draggable";
import gsap from  "gsap";
gsap.registerPlugin(Draggable);


const App = () => {
  return (
    <main>
      <Navbar/>
      <Welcome/>
      <Dock/>

      <Terminal/>
    </main>
  );
}
export default App;