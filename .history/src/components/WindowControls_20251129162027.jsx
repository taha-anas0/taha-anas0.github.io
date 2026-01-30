import useWindowStore from "#store/windows";

const WindowCOntrols = ({target}) => {
const {closeWindow} = useWindowStore();

return (
    <div id="window-controls">
           <div  className="close"/>
            </div> 
       </div>
)
}
export default WindowCOntrols;