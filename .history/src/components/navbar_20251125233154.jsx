import { Dayjs } from "dayjs";

import { navLinks as data, navIcons } from "#constants/index.js";


const Navbar = () => {
  return (
    <nav>
      <div>
        <img src="/images/logo.svg" />
        <p className="font-bold">Anas's Portfolio</p>

        <ul>
          {data.map(({ id, name }) => (
            <li key={id}>
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
      </div>
    </nav>
  );
};

export default Navbar;
