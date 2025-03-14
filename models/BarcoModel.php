<?php
class BarcoModel
{
    public $enlace;

    public function __construct()
    {
        $this->enlace = new MySqlConnect();
    }

    // Listar todos los barcos
    public function all()
    {
        try {
            $vSQL = "SELECT * FROM barcos ORDER BY Nombre ASC;";
            $vResultado = $this->enlace->ExecuteSQL($vSQL);
            return $vResultado;
        } catch (Exception $e) {
            handleException($e);
        }
    }

    public function get($id)
    {
        try {
            $vSQL = "SELECT b.*, 
                            COALESCE(SUM(hb.Cantidad), 0) AS total_habitaciones 
                     FROM barcos b
                     LEFT JOIN habitacionesbarco hb ON b.id = hb.IDBarco
                     LEFT JOIN habitaciones h ON hb.IDHabitacion = h.id
                     WHERE b.id = $id
                     GROUP BY b.id";
    
            $barco = $this->enlace->ExecuteSQL($vSQL);
            
            if (!empty($barco)) {
                // Convertimos el objeto stdClass a un array
                $barco = json_decode(json_encode($barco[0]), true);
    
                // Obtener habitaciones asociadas al barco
                $vSQLHabitaciones = "SELECT h.id, h.Nombre, h.Tamano 
                                     FROM habitaciones h
                                     INNER JOIN habitacionesbarco hb ON h.id = hb.IDHabitacion
                                     WHERE hb.IDBarco = $id";
    
                $habitaciones = $this->enlace->ExecuteSQL($vSQLHabitaciones);
                $barco['habitaciones'] = $habitaciones;
            }
            return $barco;
        } catch (Exception $e) {
            handleException($e);
        }
    }
    
    
    public function getBarcosConHabitaciones()
    {
        try {
            $vSQL = "SELECT b.*, COALESCE(SUM(hb.Cantidad), 0) AS total_habitaciones 
                     FROM barcos b 
                     LEFT JOIN habitacionesbarco hb ON b.id = hb.IDBarco 
                     LEFT JOIN habitaciones h ON hb.IDHabitacion = h.id 
                     GROUP BY b.id";
    
            error_log("SQL Query: " . $vSQL);  
    
            $vResultado = $this->enlace->ExecuteSQL($vSQL);
            return $vResultado;
        } catch (Exception $e) {
            error_log("Error en getBarcosConHabitaciones: " . $e->getMessage());
            handleException($e);
        }
    }
    
    

}
