<?php
require_once 'vendor/autoload.php';
session_start();

$client = new Google_Client();
$client->setClientId(getenv('GOOGLE_CLIENT_ID'));
$client->setClientSecret(getenv('GOOGLE_CLIENT_SECRET'));
$client->setRedirectUri(getenv('GOOGLE_REDIRECT_URI'));
$client->addScope("email");
$client->addScope("profile");

$login_url = $client->createAuthUrl();
?>

<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <title>Login con Google</title>
</head>
<body>
  <?php if (!isset($_SESSION['user'])): ?>
    <a href="<?= htmlspecialchars($login_url) ?>">Iniciar sesión con Google</a>
  <?php else: ?>
    <h2>Bienvenido, <?= htmlspecialchars($_SESSION['user']['name']) ?></h2>
    <p>Email: <?= htmlspecialchars($_SESSION['user']['email']) ?></p>
    <img src="<?= htmlspecialchars($_SESSION['user']['picture']) ?>" alt="Foto de perfil" />
    <br />
    <a href="logout.php">Cerrar sesión</a>
  <?php endif; ?>
</body>
</html>
