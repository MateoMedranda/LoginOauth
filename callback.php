<?php
require_once 'vendor/autoload.php';
session_start();

$client = new Google_Client();
$client->setClientId(getenv('GOOGLE_CLIENT_ID'));
$client->setClientSecret(getenv('GOOGLE_CLIENT_SECRET'));
$client->setRedirectUri(getenv('GOOGLE_REDIRECT_URI'));

if (isset($_GET['code'])) {
    $token = $client->fetchAccessTokenWithAuthCode($_GET['code']);
    
    if (isset($token['error'])) {
        echo "Error al obtener el token: " . htmlspecialchars($token['error']);
        exit;
    }
    
    $client->setAccessToken($token);

    $oauth = new Google_Service_Oauth2($client);
    $userData = $oauth->userinfo->get();

    $_SESSION['user'] = [
        'name' => $userData->name,
        'email' => $userData->email,
        'picture' => $userData->picture
    ];

    header('Location: index.php');
    exit;
} else {
    header('Location: index.php');
    exit;
}
