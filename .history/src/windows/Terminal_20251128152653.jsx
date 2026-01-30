import WindowWrapper from "#hoc/windowWrapper";


const Terminal = ()=> {
    return (<>

    <div id="window-header">
        <p>Window Controls</p>
        <h2>Tech Stack</h2>
        </div>

    <div className="techstack">
        <p>
            <span className="font-bold">
                @Anas %
            </span>
            show tech stack
        </p>

        <div className="label">
            <p className="w-32">Category</p>
            <p >Technologies</p>
        </div>
        <ul className="content">
            {
            techStack.map(
                ({category, items}) => ()
                )
                }
        </ul>
    </div>
    </>)

};
const TerminalWindow = WindowWrapper(Terminal, "terminal");
export default TerminalWindow;