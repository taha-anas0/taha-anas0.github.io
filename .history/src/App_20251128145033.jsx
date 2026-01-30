import {Navbar, Welcome,Dock} from "#components";
import Draggable from "gsap-trial/Draggable";
gsap.registerPlugin(Draggable);


const App = () => {
  return (
    <main>
      <Navbar/>
      <Welcome/>
      <Dock/>
    </main>
  );
}
export default App;