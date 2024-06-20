import useAuth from "../../Auth/useAuth";

import { Navigate, Outlet } from "react-router-dom";

const PrivateOutlet = () => {
  const auth = useAuth();
    return (
        auth ? <Outlet/> : <Navigate to="/login"/>
      
  )
};

export default PrivateOutlet;
