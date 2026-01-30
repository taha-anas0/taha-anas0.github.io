import dayjs from "dayjs";  

import { navLinks , navIcons } from "#constants/index.js";


const Navbar = () => {
  const {openWindow} = useWindowStore();
  return (
    <nav>
      <div>
        <img src="/images/logo.svg" />
        <p className="font-bold">Anas's Portfolio</p>

        <ul>
          {navLinks.map(({ id, name }) => (
            <li key={id} onClick={}>
              <p>{name}</p>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <ul>
          {navIcons.map(icon => (
            <li key={icon.id}>
              <img src={icon.img} className="icon-hover" alt="icon" />
            </li>
          ))}
        </ul>

        <time>{dayjs().format("ddd MMM D h:mm A")}</time>
      </div>
    </nav>
  );
};

export default Navbar;
