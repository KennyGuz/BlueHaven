<?php
class FechasPreciosModel
{
    public $enlace;

    public function __construct()
    {
        $this->enlace = new MySqlConnect();
    }

    public function all()
    {
        try {
            $vSQL = "SELECT * FROM fechasprecios";
            $vResultado = $this->enlace->ExecuteSQL($vSQL);
            return $vResultado;
        } catch (Exception $e) {
            handleException($e);
        }
    }
    public function get($id)
    {
        try {
            // Consulta para obtener fechas de precios con los detalles del crucero y habitación
            $vSQL = "SELECT 
                        fp.ID AS IDFechaPrecio,
                        fp.FechaInicio,
                        fp.FechaLimitePago,
                        fp.PrecioPorPersona,
                        c.ID AS IDCrucero,
                        c.Nombre AS NombreCrucero,
                        c.Foto AS FotoCrucero,
                        c.Dias AS DiasCrucero,
                        h.ID AS IDHabitacion,
                        h.Nombre AS NombreHabitacion,
                        h.Descripcion AS DescripcionHabitacion,
                        h.MinHuespedes,
                        h.MaxHuespedes,
                        h.Tamano,
                        DATE_ADD(fp.FechaInicio, INTERVAL c.Dias DAY) AS FechaLlegada
                     FROM fechasprecios fp
                     INNER JOIN Cruceros c ON fp.IDCrucero = c.ID
                     INNER JOIN Habitaciones h ON fp.IDHabitacion = h.ID
                     WHERE fp.IDCrucero = $id;";
    
            // Ejecutar la consulta y obtener los resultados
            $fechaPrecios = $this->enlace->ExecuteSQL($vSQL);
    
            if (!empty($fechaPrecios)) {
                // Convertir el resultado en formato de array
                $fechaPrecios = json_decode(json_encode($fechaPrecios), true);
            }
    
            return $fechaPrecios;
        } catch (Exception $e) {
            handleException($e);
        }
    }
    
    
}
