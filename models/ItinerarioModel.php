<?php
class ItinerarioModel
{
    public $enlace;

    public function __construct()
    {
        $this->enlace = new MySqlConnect();
    }

    public function all()
    {
        try {
            $vSQL = "SELECT i.ID,
	                 i.IDCrucero, 
                     i.Descripcion, 
                     p.ID AS IDPuerto, 
                     p.Nombre AS NombrePuerto, 
                     p.Pais AS PaisPuerto
                 FROM Itinerario i
	             JOIN Puertos p ON i.IDPuerto = p.ID
	             WHERE p.ID = p.ID;";
            $vResultado = $this->enlace->ExecuteSQL($vSQL);
            return $vResultado;
        } catch (Exception $e) {
            handleException($e);
        }
    }

    public function get($id)
    {
        try {
            // 🔹 1️⃣ Obtener datos básicos del crucero junto con sus puertos
            $vSQLCrucero = "SELECT c.ID AS IDCrucero, c.Nombre AS Nombre_Crucero, 
                                   i.Descripcion, p.ID AS IDPuerto, p.Nombre AS Nombre_Puerto, p.Pais AS Pais_Puerto
                            FROM cruceros c
                            LEFT JOIN itinerario i ON c.ID = i.IDCrucero
                            LEFT JOIN puertos p ON i.IDPuerto = p.ID
                            WHERE c.ID = $id";
    
            $crucero = $this->enlace->ExecuteSQL($vSQLCrucero);
            if (empty($crucero)) {
                return ["error" => "No se encontró el crucero con ID $id"];
            }
    
            $crucero = json_decode(json_encode($crucero[0]), true);
            $crucero["puertos"] = [];
            $crucero["fechas"] = [];
    
            // 🔹 2️⃣ Obtener los puertos del itinerario del crucero
            $vSQLPuertos = "SELECT p.ID AS IDPuerto, p.Nombre AS Nombre_Puerto, p.Pais AS Pais_Puerto
                            FROM itinerario i
                            JOIN puertos p ON i.IDPuerto = p.ID
                            WHERE i.IDCrucero = $id";
    
            $puertos = $this->enlace->ExecuteSQL($vSQLPuertos);
            $crucero["puertos"] = (!empty($puertos)) ? json_decode(json_encode($puertos), true) : []; // ✅ Asegurar array
    
            // 🔹 3️⃣ Obtener fechas del crucero
            $vSQLFechas = "SELECT ID AS IDFecha, FechaInicio AS Fecha_Salida, FechaFin AS Fecha_Regreso
                           FROM fechascrucero 
                           WHERE IDCrucero = $id";
    
            $fechas = $this->enlace->ExecuteSQL($vSQLFechas);
            $fechas = (!empty($fechas)) ? json_decode(json_encode($fechas), true) : []; // ✅ Asegurar array
    
            // 🔹 4️⃣ Obtener habitaciones y precios para todas las fechas
            $habitaciones = [];
            if (!empty($fechas)) {
                $vSQLHabitaciones = "SELECT fph.IDFechaCrucero AS IDFecha, h.ID AS IDHabitacion, 
                                            h.Nombre AS Habitacion, fph.PrecioPorPersona AS Precio_Habitacion
                                     FROM fechasprecioshabitaciones fph
                                     LEFT JOIN habitaciones h ON fph.IDHabitacion = h.ID
                                     WHERE fph.IDFechaCrucero IN (SELECT ID FROM fechascrucero WHERE IDCrucero = $id)";
    
                $habitaciones = $this->enlace->ExecuteSQL($vSQLHabitaciones);
                $habitaciones = (!empty($habitaciones)) ? json_decode(json_encode($habitaciones), true) : [];
            }
    
            // 🔹 5️⃣ Estructurar fechas y habitaciones
            foreach ($fechas as &$fecha) {
                $fecha["habitaciones"] = [];
                foreach ($habitaciones as $habitacion) {
                    if ($habitacion["IDFecha"] == $fecha["IDFecha"]) {
                        $fecha["habitaciones"][] = [
                            "IDHabitacion" => $habitacion["IDHabitacion"],
                            "Habitacion" => $habitacion["Habitacion"],
                            "Precio_Habitacion" => $habitacion["Precio_Habitacion"]
                        ];
                    }
                }
            }
    
            // 🔹 6️⃣ Agregar fechas al crucero
            $crucero["fechas"] = $fechas;
            return $crucero;
    
        } catch (Exception $e) {
            return ["error" => "Error interno del servidor: " . $e->getMessage()];
        }
    }
    
    
}
