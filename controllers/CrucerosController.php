<?php
class Cruceros
{
    public function index() {
        try {
            $response = new Response();
            $crucero = new CruceroModel();
          
            $result = $crucero->all();
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
        $crucero = new CruceroModel();
        $result = $crucero->get($id);
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
            $crucero = new CruceroModel();
            $result = $crucero->get($id);
            $response->toJSON($result);
        } catch (Exception $e) {
            handleException($e);
        }
    }
}
