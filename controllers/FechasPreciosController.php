<?php
class FechasPrecios
{
    public function index() {
        try {
            $response = new Response();
            $itinearario = new FechasPreciosModel();
          
            $result = $itinearario->all();
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
        $itinearario = new FechasPreciosModel();
        $result = $itinearario->get($id);
        $response->toJSON($result);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(["error" => $e->getMessage()]);
    }
}

}
