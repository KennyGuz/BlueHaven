<?php
// localhost:81/BlueHaven/habitacion
class habitacion
{

    
    public function index()
    {
        try {
            $habitacionModel = new HabitacionModel();
            $response = new Response();
            $data = $habitacionModel->all(); // obtiene habitaciones
            $response->toJSON($data);
        } catch (Exception $e) {
            handleException($e);
        }
    }

    public function get($id)
    {
        try {
            $response = new Response();
            $model = new HabitacionModel();
            $result = $model->get($id);
            $response->toJSON($result);
        } catch (Exception $e) {
            handleException($e);
        }
    }
// GET /habitacion/nombre/:nombre
public function getByNombre($nombre)
{
    try {
        $response = new Response();
        $habitacionModel = new HabitacionModel();
        $result = $habitacionModel->getByNombre($nombre);
        $response->toJSON($result);
    } catch (Exception $e) {
        handleException($e);
    }
}

    public function create()
    {
        try {
            $request = new Request();
            $response = new Response();
            $input = $request->getJSON();
            $model = new HabitacionModel();
            $result = $model->create($input);
            $response->toJSON($result);
        } catch (Exception $e) {
            handleException($e);
        }
    }

    public function update()
    {
        try {
            $request = new Request();
            $response = new Response();
            $input = $request->getJSON();
            $model = new HabitacionModel();
            $result = $model->update($input);
            $response->toJSON($result);
        } catch (Exception $e) {
            handleException($e);
        }
    }

    public function delete($id)
    {
        try {
            $response = new Response();
            $habitacion = new HabitacionModel();
            $result = $habitacion->delete($id);
            $response->toJSON($result);
        } catch (Exception $e) {
            handleException($e);
        }
    }
    

}
