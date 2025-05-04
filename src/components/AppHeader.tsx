import { NavLink, useNavigate, useLocation } from "react-router-dom";

interface AppHeaderProps {
    isAuth: boolean;
    setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppHeader: React.FC<AppHeaderProps> = ({ isAuth, setIsAuth}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const currentPath = location.pathname;

    const linkTo = currentPath === "/" ? "/signup" : "/";
    const linkText = currentPath === "/" ? "Registieren" : "Login";

    const handleClick = () => {
        localStorage.removeItem("token");  // remove token
        setIsAuth(false);  
        navigate("/");  
    };

    return (
        <div className="bg-stone-600 flex justify-center items-center w-full relative py-6">
            <h2 className="text-white text-3xl font-bold absolute left-1/2 transform -translate-x-1/2" >Job Tracker</h2>
            <nav className="text-white ml-auto mr-[10vw]">
                {isAuth ? (<button onClick={handleClick}>{user.firstname} | Logout</button>)
                  :  (<NavLink to={linkTo}>{linkText}</NavLink>)}

            </nav>
        </div>
    );
}

export default AppHeader;