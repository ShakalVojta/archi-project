<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception as PHPMailerException;

require __DIR__ . '/vendor/autoload.php';

ini_set('display_errors', 0);
ini_set('log_errors', 1);
error_reporting(E_ALL);
ini_set('error_log', __DIR__ . '/error_log.txt');

ob_start();
header("Access-Control-Allow-Origin: https://archi-souteze.cz");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=utf-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

try {
    loadEnv(__DIR__ . '/.env');
} catch (\Exception $e) {
    error_log("Chyba při načítání .env souboru: {$e->getMessage()}");
    http_response_code(500);
    echo json_encode(['error' => 'Chyba při načítání .env souboru.']);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Neplatný požadavek']);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    http_response_code(400);
    echo json_encode(['error' => 'Neplatná data']);
    exit;
}

$name         = $data['name']         ?? '';
$phone        = $data['phone']        ?? '';
$email        = $data['email']        ?? '';
$sector       = $data['sector']       ?? '';
$buildingType = $data['buildingType'] ?? '';
$message      = $data['message']      ?? '';

$e = fn($v) => htmlspecialchars((string)$v, ENT_QUOTES | ENT_HTML5, 'UTF-8');

$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';

try {
    $mail->isSMTP();
    $mail->Host       = $_ENV['MAIL_HOST'];
    $mail->SMTPAuth   = true;
    $mail->Username   = $_ENV['MAIL_USERNAME'];
    $mail->Password   = $_ENV['MAIL_PASSWORD'];
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = (int)$_ENV['MAIL_PORT'];

    $mail->setFrom($_ENV['MAIL_USERNAME'], 'Architektonické soutěže');
    $mail->addAddress('architektonickesouteze@gmail.com');

    $mail->isHTML(true);
    $mail->Subject = 'Nový dotaz z webu - Architektonická soutěž';
    $mail->Body    = "
        <div style='font-family: Arial, sans-serif; color: #333; line-height: 1.6;'>
            <h2 style='color: #007bff; font-size: 24px;'>Nový dotaz z webu</h2>
            <p style='font-size: 16px;'>Byla odeslána nová zpráva z vašeho webového formuláře.</p>
            <h3 style='color: #007bff; font-size: 20px;'>Detaily zprávy:</h3>
            <ul style='list-style: none; padding: 0;'>
                <li style='font-size: 16px;'><strong>Jméno:</strong> {$e($name)}</li>
                <li style='font-size: 16px;'><strong>Telefon:</strong> {$e($phone)}</li>
                <li style='font-size: 16px;'><strong>Email:</strong> {$e($email)}</li>
                <li style='font-size: 16px;'><strong>Typ Sektoru:</strong> {$e($sector)}</li>
                <li style='font-size: 16px;'><strong>Typ Stavby:</strong> {$e($buildingType)}</li>
            </ul>
            <p style='font-size: 16px;'><strong>Zpráva:</strong></p>
            <p>{$e($message)}</p>
        </div>";
    $mail->send();

    if (!empty($email)) {
        $mail->clearAddresses();
        $mail->addAddress($email);
        $mail->Subject = 'Děkujeme za Váš dotaz';
        $mail->Body    = "
            <div style='font-family: Arial, sans-serif; color: #333; line-height: 1.6; margin-top: 20px;'>
                <p style='font-size: 16px;'>Dobrý den, {$e($name)},</p>
                <br>
                <p style='font-size: 16px;'>děkujeme za váš dotaz ohledně architektonické soutěže.</p>
                <p style='font-size: 16px;'>Brzy vás budeme kontaktovat s dalšími podrobnostmi.</p>
                <br>
                <p style='font-size: 16px;'>S pozdravem,</p>
                <p style='font-size: 16px;'>Tým architektonických soutěží</p>
            </div>";
        $mail->send();
    }

    echo json_encode(['message' => 'E-mail byl úspěšně odeslán']);
} catch (PHPMailerException $ex) {
    error_log("E-mail se nepodařilo odeslat. Chyba: {$mail->ErrorInfo}");
    http_response_code(500);
    echo json_encode(['error' => "E-mail se nepodařilo odeslat. Chyba: {$mail->ErrorInfo}"]);
}

ob_end_flush();


function loadEnv(string $path): void
{
    if (!file_exists($path)) {
        throw new \Exception(".env soubor nebyl nalezen.");
    }

    $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        $line = trim($line);
        if ($line === '' || strpos($line, '#') === 0) {
            continue;
        }
        if (strpos($line, '=') === false) {
            continue;
        }

        [$name, $value] = explode('=', $line, 2);
        $name  = trim($name);
        $value = trim($value);
        $value = trim($value, "\"'");

        $_ENV[$name]    = $value;
        $_SERVER[$name] = $value;
    }
}
