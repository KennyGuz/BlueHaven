<?php
//localhost:81/apibarco/barco
class barco
{
    // GET: Listar todos los barcos
    public function index()
    {
        try {
            $response = new Response();
            $barcoM = new BarcoModel();
            $result = $barcoM->all();
            $response->toJSON($result);
        } catch (Exception $e) {
            handleException($e);
        }
    }

    // GET: Obtener barco por ID
    public function get($id)
    {
        try {
            $response = new Response();
            $barco = new BarcoModel();
            $result = $barco->get($id); 
            $response->toJSON($result);
        } catch (Exception $e) {
            handleException($e);
        }
    }
    

    // POST: Crear barco
    public function create()
    {
        try {
            $request = new Request();
            $response = new Response();
            $inputJSON = $request->getJSON();
            $barco = new BarcoModel();
            $result = $barco->create($inputJSON);
            $response->toJSON($result);
        } catch (Exception $e) {
            handleException($e);
        }
    }


 //PUT actualizar
 public function update()
 {
     try {
         $request = new Request();
         $response = new Response();
         //Obtener json enviado
         $inputJSON = $request->getJSON();
         //Instancia del modelo
         $barco = new BarcoModel();
         //Acción del modelo a ejecutar
         $result = $barco->update($inputJSON);
         //Dar respuesta
         $response->toJSON($result);
     } catch (Exception $e) {
         handleException($e);
     }
 }
    // DELETE: Eliminar barco
    public function delete($id)
    {
        try {
            $response = new Response();
            $barco = new BarcoModel();
            $result = $barco->delete($id);
            $response->toJSON($result);
        } catch (Exception $e) {
            handleException($e);
        }
    }
}
