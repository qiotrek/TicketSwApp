
import Events from "./Pages/Events";
import HomeScreen from "./Pages/HomeScreen";

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
            }
        ]
    },
    // {
    //     headerName: "Admin",
    //     children: [
    //         {
    //             label: "Taryfikacja",
    //             path: "/CustomsAgency/Tariff",
    //             roles: [
    //                 "CustomsAgency",
    //                 "Admin",
    //                 "Coordinator"
    //             ],
    //             editableRoles: [
    //                 "CustomsAgency",
    //                 "Admin"
    //             ],
    //             Component: ManageTariff
    //         }
    //     ]
    // }

]