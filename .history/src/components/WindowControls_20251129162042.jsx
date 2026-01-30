import useWindowStore from "#store/windows";

const WindowCOntrols = ({target}) => {
const {closeWindow} = useWindowStore();

return (
    <div id="window-controls">
           <div  className="close" onClick={closeWindow}/>
    </div> 
   
)
}
export default WindowCOntrols;