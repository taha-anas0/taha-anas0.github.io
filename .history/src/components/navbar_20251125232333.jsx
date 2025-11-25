const data = [
                        {id : 1, name: "Portfolio"},
                        {id : 2, name: "Contact"},
                        {id : 3, name: "Projects"}
                    ];


const Navbar = () => {
    return (
        <nav>
            <div>
                <img src="/images/logo.svg"/>
                <p className="fond-bold">Anas's Portfolio</p>
                <ul>
                    {
                    data.map (({id, name}) => (
                        <li key={id}><p>{name}</p></li>
                    )  )}
                </ul>
            </div>
        </nav>
    )
}
export default Navbar;