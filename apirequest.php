<?php
if($_SERVER['REQUEST_METHOD'] == "POST") {
    $host = 'http://localhost:8000';
    // Your ID and token
    $client_id = 1;
    $client_secret = 'Z6UTO36NWuPGqTcIb7cdrO9BAGQSAu7AISBe2UEU';

    // The data to send to the API
    $postData = array(
        'client_id'=>$client_id,
        'client_secret'=>$client_secret,
        'grant_type'=>'password',
        'username'=>$_POST['username'],
        'password'=>$_POST['password'],
    );

    // Setup cURL
    $ch = curl_init($host.'/api/v1/oauth/token');
    curl_setopt_array($ch, array(
        CURLOPT_POST => TRUE,
        CURLOPT_RETURNTRANSFER => TRUE,
        CURLOPT_HTTPHEADER => array(
            'Content-Type: application/json',
            'Accept: application/json',
        ),
        CURLOPT_POSTFIELDS => json_encode($postData)
    ));

    // Send the request
    $response = curl_exec($ch);

    // Check for errors
    if ($response === FALSE) {
        die(curl_error($ch));
    }

    // Decode the response
    $responseData = json_decode($response, TRUE);

    // Print the date from the response
    echo $responseData;
}