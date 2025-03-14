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
            $vSQL = "SELECT * FROM Itinerario where Itinerario.ID = $id";
            $crucero = $this->enlace->ExecuteSQL($vSQL);
            if (!empty($crucero)) {

                $crucero = json_decode(json_encode($crucero[0]), true);
                $vSQLPuetos = "SELECT p.ID AS IDPuerto, 
                    p.Nombre AS NombrePuerto, 
                    p.Pais AS PaisPuerto 
                    FROM Puertos p
                    INNER JOIN Itinerario i ON p.ID = i.IDPuerto
                    WHERE i.IDCrucero = $id;";

                $puertos = $this->enlace->ExecuteSQL($vSQLPuetos);
                $crucero['puertos'] = $puertos;
            }

            return $crucero;
        } catch (Exception $e) {
            handleException($e);
        }
    }
}
