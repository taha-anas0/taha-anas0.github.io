const Dock = () => {
    const dockRef = useRef(null);
    return (
        <section id="dock">
            <div ref={dockRef} c></div>
        </section>
    )
}
export default Dock;