
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./authContext";

function RequireAuth({children}){
    const{login}=useAuth()
    const location =useLocation();

    return login?(children):(
        <Navigate to="/login" state={{from:location}} replace/>
    )
}

export default RequireAuth;