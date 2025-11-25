const Navbar = () => {
    return (
        <nav>
            <div>
                <img src="/images/logo.svg"/>
                <p className="fond-bold">Anas's Portfolio</p>
                <ul>
                    {[
                        {id : 1, name: "Portfolio"},
                        {id : 2, name: "About Me"},
                    ]}
                </ul>
            </div>
        </nav>
    )
}
export default Navbar;