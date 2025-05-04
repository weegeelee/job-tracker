import { NavLink } from "react-router-dom";

const Sidebar: React.FC = () => { 
    return (
        <div className="w-52 h-screen bg-stone-50 border-r p-4">
            <NavLink to={"/list"} className={({ isActive }) => 
          isActive 
          ? 'block font-nunito text-stone-500 my-10 font-bold bg-stone-200 rounded-lg px-4 py-2'
          : 'block font-nunito text-stone-500 my-10 hover:font-bold focus:font-bold px-4 py-2' 
        }>Bewerbungslist</NavLink>
            <NavLink to={"/application"} className={({ isActive }) => 
          isActive 
            ? 'block font-nunito text-stone-500 my-10 font-bold bg-stone-200 rounded-lg px-4 py-2'
            : 'block font-nunito text-stone-500 my-10 hover:font-bold focus:font-bold px-4 py-2' 
        }>+ Bewerbung</NavLink>
            <NavLink to={"/analyse"} className={({ isActive }) => 
          isActive 
            ? 'block font-nunito text-stone-500 my-10 font-bold bg-stone-200 rounded-lg px-4 py-2'
            : 'block font-nunito text-stone-500 my-10 hover:font-bold focus:font-bold px-4 py-2' 
        }>Analyse</NavLink>
        </div>
    );
};

export default Sidebar;