import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter } from "react-router-dom";
import { Home } from "./components/Home/Home";
import { RouterProvider } from "react-router";
import { PageNotFound } from "./components/Home/PageNotFound";
import { ListHabitaciones } from "./components/Habitacion/ListHabitaciones";

import { ListReservas } from "./components/Reserva/ListReservas";
import { DetailReserva } from "./components/Reserva/DetailReserva";

import { DetailHabitacion } from "./components/Habitacion/DetailHabitaciones";

import TableHabitaciones from "./components/Habitacion/TableHabitaciones";
import { ListBarcos } from "./components/Barco/ListBarcos";
import { DetailBarco } from "./components/Barco/DetailBarco";
import { ListCruceros } from "./components/Cruceros/ListCruceros";
import { DetailCrucero } from "./components/Cruceros/DetailCrucero";

const rutas = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "*",
        element: <PageNotFound />,
      },
      {
        path: "/habitacion",
        element: <ListHabitaciones />,
      },
      {
        path: "/habitacion/:id",
        element: <DetailHabitacion />, 
      },
      {
        path: "/table",
        element: <TableHabitaciones />, 
      },
      {
        path: "/barco",
        element: <ListBarcos />,
      },
      {
        path: "/barco/:id",
        element: <DetailBarco />,
      },
      
    {
  path: "/reservas",
  element: <ListReservas />,
},
{
  path: "/reservas/:id",
  element: <DetailReserva />,
},
{
  path: "/crucero",
  element: <ListCruceros />
},
{
  path: "/cruceros/:id",
  element: <DetailCrucero />
},

    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={rutas} />
  </StrictMode>
);
