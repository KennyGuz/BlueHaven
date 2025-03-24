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

import { ListCruceros } from "./components/Cruceros/ListCruceros";
import { DetailCrucero } from "./components/Cruceros/DetailCrucero";

import CreateHabitacion from './components/Habitacion/CreateHabitacion';


import UpdateHabitacion from './components/Habitacion/UpdateHabitacion';



import { ListBarcos } from "./components/Barco/ListBarcos";
import { DetailBarco } from "./components/Barco/DetailBarco";
import { CreateBarco } from "./components/Barco/CreateBarco";
import { UpdateBarco } from "./components/Barco/UpdateBarco";
import TableBarcos from "./components/Barco/TableBarcos";
import { CatalogBarcos } from "./components/Barco/CatalogBarcos"; 

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
        path: '/barco/',
        element: <ListBarcos />
      },
      {
        path: '/catalog-barcos/',
        element: <CatalogBarcos />
      },
      {
        path: '/barco/:id',
        element: <DetailBarco />
      },
      {
        path: '/barco/crear/',
        element: <CreateBarco />
      },
      {
        path: "/barco/update/:id",
        element: <UpdateBarco />
      },
      
      {
        path: '/barco-table',
        element: <TableBarcos />
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
        path: "/habitacion/crear", 
        element: <CreateHabitacion />,
      },
      {
        path: "/habitacion/update/:id", 
        element: <UpdateHabitacion />,
      },
      {
        path: "/table",
        element: <TableHabitaciones />, 
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
