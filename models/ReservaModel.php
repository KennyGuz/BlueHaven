<?php
class ReservaModel
{
    public $enlace;

    public function __construct()
    {
        $this->enlace = new MySqlConnect();
    }

    // Obtener todas las reservas
    public function all()
    {
        try {
            $vSQL = "SELECT r.id, c.Nombre as NombreCrucero, r.FechaReserva, 
                            SUM(dr.CantidadHabitaciones) as TotalHabitaciones, 
                            SUM(rc.Cantidad * co.Precio) as TotalComplementos
                     FROM reservas r
                     JOIN fechascrucero fc ON r.IDFechaCrucero = fc.id
                     JOIN cruceros c ON fc.IDCrucero = c.id
                     LEFT JOIN detallereservas dr ON r.id = dr.IDReserva
                     LEFT JOIN reservascomplementos rc ON r.id = rc.IDReserva
                     LEFT JOIN complementos co ON rc.IDComplemento = co.id
                     GROUP BY r.id";
            return $this->enlace->ExecuteSQL($vSQL);
        } catch (Exception $e) {
            handleException($e);
        }
    }

    // Obtener una reserva específica con detalles
    public function get($id)
    {
        try {
            $vSQL = "SELECT r.id, c.Nombre as NombreCrucero, r.FechaReserva, 
                            SUM(dr.CantidadHabitaciones) as TotalHabitaciones, 
                            SUM(rc.Cantidad * co.Precio) as TotalComplementos
                     FROM reservas r
                     JOIN fechascrucero fc ON r.IDFechaCrucero = fc.id
                     JOIN cruceros c ON fc.IDCrucero = c.id
                     LEFT JOIN detallereservas dr ON r.id = dr.IDReserva
                     LEFT JOIN reservascomplementos rc ON r.id = rc.IDReserva
                     LEFT JOIN complementos co ON rc.IDComplemento = co.id
                     WHERE r.id = $id
                     GROUP BY r.id";

$reserva = $this->enlace->ExecuteSQL($vSQL);
if (!empty($reserva)) {
    $reserva = json_decode(json_encode($reserva[0]), true); // 🔹 Convertir stdClass a array




                // Obtener detalles de habitaciones
                $vSQLHabitaciones = "SELECT h.Nombre, dr.CantidadHabitaciones, dr.CantidadHuespedes 
                                     FROM detallereservas dr
                                     JOIN habitaciones h ON dr.IDHabitacion = h.id
                                     WHERE dr.IDReserva = $id";
                $reserva["habitaciones"] = $this->enlace->ExecuteSQL($vSQLHabitaciones);

                // Obtener detalles de complementos
                $vSQLComplementos = "SELECT co.Nombre, rc.Cantidad, co.Precio, (rc.Cantidad * co.Precio) as Total
                                     FROM reservascomplementos rc
                                     JOIN complementos co ON rc.IDComplemento = co.id
                                     WHERE rc.IDReserva = $id";
                $reserva["complementos"] = $this->enlace->ExecuteSQL($vSQLComplementos);
            }
            return $reserva;
        } catch (Exception $e) {
            handleException($e);
        }
    }
}
