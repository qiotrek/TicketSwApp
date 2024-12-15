import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { RoutingSettings } from "../RoutingSettings";
import { useEffect } from "react";

export default function NotFound() {
  const { user } = useAuth();
  const location = useLocation();
  const navigation = useNavigate();

  useEffect(()=>{
    if(location.pathname === '/'){
      navigation('/login');
    }
  },[location.pathname, navigation])
  let path = "/login";
  let filteredRoutingSettings = [];

  if (user !== null) {
    filteredRoutingSettings = RoutingSettings.filter((item) => {
      return item.children.some((child) => child.roles.includes(user?.role as string));
    });

    if (filteredRoutingSettings.length > 0) {
      path = filteredRoutingSettings[0].children[0].path;
    }
  }

  return (
    <div>
      <h1>404 - Nie znaleziono strony</h1>
      <p>Przepraszamy, strona której szukasz nie istnieje.</p>
      <NavLink to={path} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Wróć do strony głównej</NavLink>
    </div>
  );
}
