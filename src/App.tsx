import { createBrowserRouter, RouterProvider } from "react-router";
import "./App.css";
import Main from "./components/Main";
import Board from "./components/boards/Board";
import BossBoard from "./components/boards/BossBoard";
import GameForm from "./components/form/GameForm";
import { action } from "./components/router/action";
import { loader } from "./components/router/loader";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main/>,
        children: [
            {
                index: true,
                element: <GameForm/>,
                action,
            },
            {
                path: "game/:type/:set/:seed",
                element: <Board coop={false} />,
                loader,
            },
            {
                path: "boss/:type/:set/:seed",
                element: <BossBoard/>,
                loader,
            },
            {
                path: "coop/:type/:set/:seed",
                element: <Board coop={true} />,
                loader,
            },
            {
                path: "bosscoop/:type/:set/:seed/:player",
                element: <BossBoard />,
                loader,
            },
        ],
    },
]);

export default function App() {
    return <RouterProvider router={router}/>;
}
