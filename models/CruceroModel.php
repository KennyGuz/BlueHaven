<?php
class CruceroModel
{
    public $enlace;

    public function __construct()
    {
        $this->enlace = new MySqlConnect();
    }

    public function all()
    {
        try {
            $vSQL = "SELECT 
                    Cruceros.ID, 
                    Cruceros.Nombre, 
                    Cruceros.Foto, 
                    Cruceros.Dias, 
                    Cruceros.IDBarco, 
                    Barcos.Nombre AS NombreBarco, 
                    Barcos.Descripcion AS DescripcionBarco, 
                    Barcos.CapacidadHuespedes AS CapacidadHuespedes, 
                    Barcos.Precio AS PrecioBarco
                 FROM Cruceros
                 JOIN Barcos ON Cruceros.IDBarco = Barcos.ID
                 ORDER BY Cruceros.Nombre ASC;";
            $vResultado = $this->enlace->ExecuteSQL($vSQL);
            return $vResultado;
        } catch (Exception $e) {
            handleException($e);
        }
    }

    public function get($id)
    {
        try {
            $vSQL = "SELECT 
                    Cruceros.ID AS ID, 
                    Cruceros.Nombre AS Nombre, 
                    Cruceros.Dias AS Dias, 
                    Cruceros.Foto AS Foto, 
                    Cruceros.IDBarco, 
                    Barcos.ID AS BarcoID, 
                    Barcos.Nombre AS NombreBarco, 
                    Barcos.Descripcion AS DescripcionBarco, 
                    Barcos.CapacidadHuespedes AS CapacidadHuespedesBarco, 
                    Barcos.Precio AS PrecioBarco
                 FROM Cruceros 
                 INNER JOIN Barcos ON Cruceros.IDBarco = Barcos.ID 
                 WHERE Cruceros.ID = $id";
    
            $crucero = $this->enlace->ExecuteSQL($vSQL);
            
            return $crucero;
        } catch (Exception $e) {
            handleException($e);
        }
    }
    

}
