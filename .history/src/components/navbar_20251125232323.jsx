


const Navbar = () => {
    return (
        <nav>
            <div>
                <img src="/images/logo.svg"/>
                <p className="fond-bold">Anas's Portfolio</p>
                <ul>
                    {.map (({id, name}) => (
                        <li key={id}><p>{name}</p></li>
                    )  )}
                </ul>
            </div>
        </nav>
    )
}
export default Navbar;