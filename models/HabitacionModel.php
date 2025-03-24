<?php
class HabitacionModel
{
    private $enlace;

    public function __construct()
    {
        $this->enlace = new MySqlConnect();
    }

    public function all()
    {
        $sql = "SELECT * FROM habitaciones";
        return $this->enlace->ExecuteSQL($sql);
    }

    public function get($id)
    {
        try {
            $sql = "SELECT * FROM habitaciones WHERE id = $id;";
            $result = $this->enlace->executeSQL($sql);
            return !empty($result) ? $result[0] : null;
        } catch (Exception $e) {
            handleException($e);
        }
    }

    public function create($obj)
    {
        try {
            $sql = "INSERT INTO habitaciones (nombre, descripcion, minHuespedes, maxHuespedes, tamano)
                    VALUES ('$obj->nombre', '$obj->descripcion', $obj->minHuespedes, $obj->maxHuespedes, '$obj->tamano')";
            $id = $this->enlace->executeSQL_DML_last($sql);
            return $this->get($id);
        } catch (Exception $e) {
            handleException($e);
        }
    }
    public function getByNombre($nombre)
    {
        $sql = "SELECT * FROM habitaciones WHERE nombre = '$nombre'";
        $res = $this->enlace->ExecuteSQL($sql);
        return !empty($res) ? $res[0] : null;
    }
    
    public function update($obj)
    {
        try {
            $sql = "UPDATE habitaciones SET 
                    nombre = '$obj->nombre',
                    descripcion = '$obj->descripcion',
                    minHuespedes = $obj->minHuespedes,
                    maxHuespedes = $obj->maxHuespedes,
                    tamano = '$obj->tamano'
                    WHERE id = $obj->id";
            $this->enlace->executeSQL_DML($sql);
            return $this->get($obj->id);
        } catch (Exception $e) {
            handleException($e);
        }
    }

    public function delete($id)
    {
        $sql = "DELETE FROM habitaciones WHERE ID = $id";
        return $this->enlace->executeSQL_DML($sql);
    }
    
}
