<?php
$dataFromFile = json_decode(file_get_contents("data.json"));
echo json_encode($dataFromFile);
