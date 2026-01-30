import useWindowStore from "#store/windows";

const WindowCOntrols = ({target}) => {
const {closeWindow} = useWindowStore();

return (
    <div>
        Window Controls Component
    </div>
)
}
export default WindowCOntrols;