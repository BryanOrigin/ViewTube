import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';

import LeftNavMenuItem from "../components/LeftNavMenuItem";
import { categories} from "../utils/constants";
import { Context } from '../context/contextApi';

const LeftNav = () => {
  const {selectCategories, setSelectCategories, mobileMenu} = useContext(Context);
  {/*<div className={`md:block w-[240px] overflow-y-auto h-full py-4 bg-black absolute md:relative z-10 translate-x-[-240px] md:translate-x-0 transition-all ${mobileMenu ? "translate-x-0" : "" }`}>*/}

  const navigate = useNavigate();

  const clickHandler = (name,type) => {
    switch (type) {
      case "category":
        if(name=="Anime"){
          return setSelectCategories("Anime 4k opening");
        }
        else{
          return setSelectCategories(name);
        }
        
      case "home":
        return setSelectCategories(name);
      case "menu":
        return false;
      default:
        break;
    }
  };

  return (
    <div className={`${mobileMenu ? "md:block w-[240px] overflow-y-auto h-full py-4 bg-black absolute md:relative z-10 translate-x-0 md:translate-x-0 transition-all" : "md:block w-[240px] overflow-y-auto h-full py-4 bg-black absolute md:relative z-10 translate-x-[-240px] md:translate-x-0 transition-all"}`}>
      <div className="flex px-5 flex-col">
        {categories.map((item) => {
          return(
            <React.Fragment key={item.id}>
                <LeftNavMenuItem
                  text={item.type === "home" ? "Home" : item.name}
                  icon={item.icon}
                  action={() => {
                    clickHandler(item.name,item.type);
                    navigate("/");
                  }}
                  className={`${selectCategories === item.name ? "bg-white/[0.15]" : ""}`}
                  
                />
                {item.divider && (
                  <hr className="my-5 border-white/[0.2]"/>
                )}
            </React.Fragment>
          )
        })}
        <hr className="my-5 border-white/[0.2]"/>
        <div className="text-white/[0.5] text-[12px]">
          Contact: 8698279589<br></br>
          Email:rodriguezbrian814@gmail.com <br></br>
          Viewtube by: Bryan & Team
        </div>
      </div>
    </div>
  )
};

export default LeftNav;




