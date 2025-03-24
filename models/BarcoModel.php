<?php
class BarcoModel
{
    public $enlace;

    public function __construct()
    {
        $this->enlace = new MySqlConnect();
    }

    /**
     * Listar todos los barcos
     */
    public function all()
    {
        try {
            $vSQL = "SELECT 
                        ID as id, 
                        Nombre as nombre, 
                        Descripcion as descripcion, 
                        CapacidadHuespedes as capacidadHuespedes, 
                        Precio as precio 
                     FROM barcos 
                     ORDER BY nombre ASC;";

            $vResultado = $this->enlace->ExecuteSQL($vSQL);

            return $vResultado;
        } catch (Exception $e) {
            handleException($e);
        }
    }

    public function get($id)
    {
        try {
            $sql = "SELECT 
                        ID as id, 
                        Nombre as nombre, 
                        Descripcion as descripcion, 
                        CapacidadHuespedes as capacidadHuespedes, 
                        Precio as precio 
                    FROM barcos 
                    WHERE ID = $id";
    
            $res = $this->enlace->ExecuteSQL($sql);
    
            if (!empty($res)) {
                $barco = $res[0];
    
              
                $sqlH = "SELECT 
                            h.ID as id, 
                            h.Nombre as nombre, 
                            h.Descripcion as descripcion,
                            h.MinHuespedes,
                            h.MaxHuespedes,
                            h.Tamano,
                            hb.cantidad 
                        FROM habitacionesbarco hb 
                        JOIN habitaciones h ON hb.IDHabitacion = h.ID
                        WHERE hb.IDBarco = $id";
    
                $barco->habitaciones = $this->enlace->ExecuteSQL($sqlH);
    
                return $barco;
            }
    
            return null;
        } catch (Exception $e) {
            handleException($e);
        }
    }
    
    
    public function update($objeto)
    {
        try {
            
            $sql = "UPDATE barcos SET 
                        nombre = '$objeto->nombre',
                        descripcion = '$objeto->descripcion',
                        capacidadHuespedes = $objeto->capacidadHuespedes,
                        precio = $objeto->precio
                    WHERE id = $objeto->id";
            $this->enlace->executeSQL_DML($sql);
    
            
            $sqlDelete = "DELETE FROM habitacionesbarco WHERE IDBarco = $objeto->id";
            $this->enlace->executeSQL_DML($sqlDelete);
    
           
            foreach ($objeto->habitaciones as $hab) {
                $sqlHab = "INSERT INTO habitacionesbarco (IDBarco, IDHabitacion, Cantidad)
                           VALUES (
                               $objeto->id,
                               $hab->habitacion_id,
                               $hab->cantidad
                           )";
                $this->enlace->executeSQL_DML($sqlHab);
            }
    
            return $this->get($objeto->id);
        } catch (Exception $e) {
            handleException($e);
        }
    }
    
    
    

    /**
     * Crear un nuevo barco
     */
    public function create($objeto)
    {
        try {
            // 1. Insertar barco en tabla 'barcos'
            $sql = "INSERT INTO barcos (nombre, descripcion, capacidadHuespedes, precio)
                    VALUES (
                        '$objeto->nombre',
                        '$objeto->descripcion',
                        $objeto->capacidadHuespedes,
                        $objeto->precio
                    )";
    
            $idBarco = $this->enlace->executeSQL_DML_last($sql); // ID del nuevo barco
    
            // 2. Insertar habitaciones en tabla 'habitacionesbarco'
            foreach ($objeto->habitaciones as $hab) {
                $sqlHab = "INSERT INTO habitacionesbarco (IDBarco, IDHabitacion, Cantidad)
                           VALUES (
                               $idBarco,
                               $hab->habitacion_id,
                               $hab->cantidad
                           )";
                $this->enlace->executeSQL_DML($sqlHab);
            }
    
           
            return $this->get($idBarco);
    
        } catch (Exception $e) {
            handleException($e);
        }
    }
    

    /**
     * Actualizar barco
     */
  

    /**
     * Eliminar barco
     */
    public function delete($id)
    {
        try {
            $sql = "DELETE FROM barcos WHERE ID = $id";

            return $this->enlace->executeSQL_DML($sql);
        } catch (Exception $e) {
            handleException($e);
        }
    }
}
