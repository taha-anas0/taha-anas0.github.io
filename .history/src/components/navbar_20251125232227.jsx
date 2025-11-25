const Navbar = () => {
    return (
        <nav>
            <div>
                <img src="/images/logo.svg"/>
                <p className="fond-bold">Anas's Portfolio</p>
                <ul>
                    {[
                        {id : 1, name: "Portfolio"},
                        {id : 2, name: "Contact"},
                        {id : 3, name: "Projects"}
                    ].map (({item}) => (
                        <li key={item.id}><p>{item.name}</p></li>
                    )  )}
                </ul>
            </div>
        </nav>
    )
}
export default Navbar;