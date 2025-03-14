<?php
class Reservas
{
    public function index()
    {
        try {
            $response = new Response();
            $reservaM = new ReservaModel();
            $result = $reservaM->all();
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
            $reservaM = new ReservaModel();
            $result = $reservaM->get($id);
            $response->toJSON($result);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["error" => $e->getMessage()]);
        }
    }
}
