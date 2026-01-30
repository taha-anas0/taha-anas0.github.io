import useWindowStore from "#store/windows";

const WindowCOntrols = ({target}) => {
const {closeWindow} = useWindowStore();

return (
    <div id="window-controls">
           <div  className="close" onClick={()=> closeWindow}/>
            <div  className="minimize" />
            <div  className="maximize"/>
    </div> 
   
)
}
export default WindowCOntrols;