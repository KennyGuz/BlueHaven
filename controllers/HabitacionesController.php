<?php
// localhost:81/apimovie/habitaciones
class Habitaciones
{
    // GET - Listar todas las habitaciones
    public function index()
    {
        try {
            $response = new Response();
            // Instancia del modelo
            $habitacionM = new HabitacionModel();
            // Método del modelo
            $result = $habitacionM->all();
            // Dar respuesta en JSON
            $response->toJSON($result);
        } catch (Exception $e) {
            handleException($e);
        }
    }

    // GET - Obtener una habitación por ID
    public function get($id)
    {
        try {
            $response = new Response();
            // Instancia del modelo
            $habitacion = new HabitacionModel();
            // Acción del modelo a ejecutar
            $result = $habitacion->get($id);
            // Dar respuesta
            $response->toJSON($result);
        } catch (Exception $e) {
            handleException($e);
        }
    }

    // GET - Obtener habitaciones disponibles según capacidad
    public function habitacionesPorCapacidad($maxHuespedes)
    {
        try {
            $response = new Response();
            // Instancia del modelo
            $habitacion = new HabitacionModel();
            // Acción del modelo a ejecutar
            $result = $habitacion->getByCapacity($maxHuespedes);
            // Dar respuesta
            $response->toJSON($result);
        } catch (Exception $e) {
            handleException($e);
        }
    }

    // POST - Crear una nueva habitación
    public function create()
    {
        try {
            $request = new Request();
            $response = new Response();
            // Obtener JSON enviado
            $inputJSON = $request->getJSON();
            // Instancia del modelo
            $habitacion = new HabitacionModel();
            // Acción del modelo a ejecutar
            $result = $habitacion->create($inputJSON);
            // Dar respuesta
            $response->toJSON($result);
        } catch (Exception $e) {
            handleException($e);
        }
    }

    // PUT - Actualizar información de una habitación
    public function update()
    {
        try {
            $request = new Request();
            $response = new Response();
            // Obtener JSON enviado
            $inputJSON = $request->getJSON();
            // Instancia del modelo
            $habitacion = new HabitacionModel();
            // Acción del modelo a ejecutar
            $result = $habitacion->update($inputJSON);
            // Dar respuesta
            $response->toJSON($result);
        } catch (Exception $e) {
            handleException($e);
        }
    }
}
