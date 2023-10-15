import { useState } from "react";
import { Link } from 'react-router-dom';
import { store } from "../../../states";
const App = () => {
  const User = store.getState().user.data
  const website = store.getState().website.data
  const backgroundType = website?.colors?.logo?.type || "color";
  const logoSrc =
    backgroundType === "img"
      ? website?.colors?.logo?.value
      : "/img/logo.png";
  const [open, setOpen] = useState(true);
  const Menus = [
    { title: "Retornar", icon: "bx-arrow-back", permission: 0, path:"/" },
    { title: "Dashboard", icon: "bxs-dashboard", permission: 2, path:"/admin/"  },
    { title: "Inbox", icon: "bxs-chat", permission: 2, path:"/"  },
    { title: "Accounts", icon: "bxs-user", gap: true, permission: 2, path:"/admin/account"  },
    { title: "Schedule ", icon: "bxs-calendar", permission: 2, path:"/"  },
    { title: "Search", icon: "bxs-search", permission: 2, path:"/"  },
    { title: "Analytics", icon: "bxs-chart", permission: 2, path:"/"  },
    { title: "Files ", icon: "bxs-folder", gap: true, permission: 2, path:"/"  },
    { title: "Setting", icon: "bxs-cog", permission: 2, path:"/"  },
  ];


  return (
    <div className="flex">
      <div
        className={` ${open ? "w-72" : "w-20 "
          } bg-dark-purple h-screen p-5  pt-8 relative duration-300`}
      >
        <i
          className={`bx bx-chevron-right-circle absolute cursor-pointer -right-3 top-9 border-dark-purple text-white
             border-2 rounded-full ${!open && "rotate-180"}`}
          style={{ fontSize: "25px" }}
          onClick={() => setOpen(!open)}
        ></i>
        <div className="flex gap-x-4 items-center">
          <img
            src={logoSrc}
            style={{
              cursor: "pointer",
              transitionDuration: "500ms",
              transform: open ? "rotate(360deg)" : "",
              maxWidth: "50px", // Defina o tamanho máximo desejado
            }}
          />
          <h1
            className={`text-white origin-left font-medium text-xl duration-200 ${!open && "scale-0"
              }`}
          >
            {website.title || "Core"}
          </h1>
        </div>
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            // Verifique a permissão aqui
            User.permissions >= Menu.permission && (
              <li
                key={index}
                className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
        ${Menu.gap ? "mt-9" : "mt-2"} ${index === 0 && "bg-light-white"
                  } `}
              >
                {/* Use as classes do Boxicons para os ícones */}
                <i className={`bx ${Menu.icon}`} />
                <Link to={Menu.path}> 

                <span className={`${!open && "hidden"} origin-left duration-200`}>
                  {Menu.title}
                </span>
                </Link>

              </li>
            )
          ))}
        </ul>
      </div>
    </div>
  );
};
export default App;