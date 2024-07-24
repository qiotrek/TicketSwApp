
import AdminPanel from "./Pages/AdminPanel";
import Advertisements from "./Pages/Advertisements";
import Contact from "./Pages/Contact";
import EventDetails from "./Pages/EventDetails";
import Events from "./Pages/Events";
import HomeScreen from "./Pages/HomeScreen";
import MyAccount from "./Pages/MyAccount";

export const RoutingSettings: Routing[] = [
    {
        headerName: "User",
        children: [
            {
                label: "HomeScreen",
                path: "/HomeScreen",
                roles: [
                    "User",
                    "Admin"
                ],
                editableRoles: [
                     "User",
                    "Admin"
                ],
                Component: HomeScreen
            },
            {
                label: "Events",
                path: "/Events",
                roles: [
                    "User",
                    "Admin"
                ],
                editableRoles: [
                    "User",
                    "Admin"
                ],
                Component: Events
            },
            {
                label: "EventDetails",
                path: "/EventDetails",
                roles: [
                    "User",
                    "Admin"
                ],
                editableRoles: [
                    "User",
                    "Admin"
                ],
                Component: EventDetails
            },
            {
                label: "Contact",
                path: "/Contact",
                roles: [
                    "User",
                    "Admin"
                ],
                editableRoles: [
                    "User",
                    "Admin"
                ],
                Component: Contact
            },
            {
                label: "Advertisements",
                path: "/Advertisements",
                roles: [
                    "User",
                    "Admin"
                ],
                editableRoles: [
                    "User",
                    "Admin"
                ],
                Component: Advertisements
            },
            {
                label: "MyAccount",
                path: "/MyAccount",
                roles: [
                    "User",
                    "Admin"
                ],
                editableRoles: [
                    "User",
                    "Admin"
                ],
                Component: MyAccount
            }
        ]
    },
    {
        headerName: "Admin",
        children: [
            {
                label: "AdminPanel",
                path: "/AdminPanel",
                roles: [
                    "Admin",
                ],
                editableRoles: [
                    "Admin"
                ],
                Component: AdminPanel
            }
        ]
    }

]