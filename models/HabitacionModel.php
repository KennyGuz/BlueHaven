<?php
class HabitacionModel
{
    // Conectar a la BD
    public $enlace;

    public function __construct()
    {
        $this->enlace = new MySqlConnect();
    }

    /**
     * Listar habitaciones
     * @return $vResultado - Lista de habitaciones
     */
    public function all()
    {
        try {
            // Consulta SQL
            $vSQL = "SELECT * FROM habitaciones ORDER BY Nombre DESC;";
            // Ejecutar la consulta
            $vResultado = $this->enlace->ExecuteSQL($vSQL);
            return $vResultado;
        } catch (Exception $e) {
            handleException($e);
        }
    }

    /**
     * Obtener una habitación por ID
     * @param $id - ID de la habitación
     * @return $vResultado - Objeto habitación
     */
    public function get($id)
    {
        try {
            $vSQL = "SELECT * FROM habitaciones WHERE id=$id;";
            // Ejecutar la consulta SQL
            $vResultado = $this->enlace->ExecuteSQL($vSQL);
            return !empty($vResultado) ? $vResultado[0] : null;
        } catch (Exception $e) {
            handleException($e);
        }
    }

    /**
     * Obtener habitaciones por capacidad máxima de huéspedes
     * @param $maxHuespedes - Número máximo de huéspedes
     * @return $vResultado - Lista de habitaciones
     */
    public function getByCapacity($maxHuespedes)
    {
        try {
            $vSQL = "SELECT * FROM habitaciones WHERE MaxHuespedes >= $maxHuespedes;";
            // Ejecutar la consulta
            $vResultado = $this->enlace->ExecuteSQL($vSQL);
            return $vResultado;
        } catch (Exception $e) {
            handleException($e);
        }
    }

    /**
     * Crear una habitación
     * @param $objeto - Datos de la habitación
     * @return $this->get($idHabitacion) - Objeto habitación creada
     */
    public function create($objeto)
    {
        try {
            // Consulta SQL para insertar la habitación
            $sql = "INSERT INTO habitaciones (Nombre, Descripcion, MinHuespedes, MaxHuespedes, Tamano)
                    VALUES ('$objeto->Nombre', '$objeto->Descripcion', 
                    '$objeto->MinHuespedes', '$objeto->MaxHuespedes', '$objeto->Tamano')";
            // Ejecutar la consulta y obtener el ID generado
            $idHabitacion = $this->enlace->executeSQL_DML_last($sql);
            return $this->get($idHabitacion);
        } catch (Exception $e) {
            handleException($e);
        }
    }

    /**
     * Actualizar una habitación
     * @param $objeto - Datos de la habitación a actualizar
     * @return $this->get($objeto->id) - Objeto habitación actualizada
     */
    public function update($objeto)
    {
        try {
            // Consulta SQL para actualizar la habitación
            $sql = "UPDATE habitaciones SET 
                    Nombre = '$objeto->Nombre', 
                    Descripcion = '$objeto->Descripcion',
                    MinHuespedes = '$objeto->MinHuespedes',
                    MaxHuespedes = '$objeto->MaxHuespedes',
                    Tamano = '$objeto->Tamano'
                    WHERE id = $objeto->id";

            // Ejecutar la consulta
            $this->enlace->executeSQL_DML($sql);
            return $this->get($objeto->id);
        } catch (Exception $e) {
            handleException($e);
        }
    }
}
