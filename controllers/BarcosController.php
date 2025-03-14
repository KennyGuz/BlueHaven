<?php
class Barcos
{
    public function index() {
        try {
            $response = new Response();
            $barcoM = new BarcoModel();
          
            $result = $barcoM->getBarcosConHabitaciones();
            $response->toJSON($result);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["error" => $e->getMessage()]);
        }
    }   
    public function detalle($id)
{
    try {
        $response = new Response();
        $barcoM = new BarcoModel();
        $result = $barcoM->get($id);
        $response->toJSON($result);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(["error" => $e->getMessage()]);
    }
}

    public function get($id)
    {
        try {
            $response = new Response();
            $barcoM = new BarcoModel();
            $result = $barcoM->get($id);
            $response->toJSON($result);
        } catch (Exception $e) {
            handleException($e);
        }
    }
}
