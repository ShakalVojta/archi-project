<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require './vendor/autoload.php';


loadEnv(__DIR__ . '/.env');
ob_start();

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);

    if ($data) {
        $name = isset($data['name']) ? $data['name'] : '';
        $phone = isset($data['phone']) ? $data['phone'] : '';
        $email = isset($data['email']) ? $data['email'] : '';
        $sector = isset($data['sector']) ? $data['sector'] : '';
        $buildingType = isset($data['buildingType']) ? $data['buildingType'] : '';
        $message = isset($data['message']) ? $data['message'] : '';

        $mail = new PHPMailer(true);
        $mail->CharSet = 'UTF-8';

        try {
            $mail->isSMTP();
            $mail->Host       = getenv('MAIL_HOST');
            $mail->SMTPAuth   = true;
            $mail->Username   = getenv('MAIL_USERNAME');
            $mail->Password   = getenv('MAIL_PASSWORD');
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port       = getenv('MAIL_PORT');


            $mail->setFrom(getenv('MAIL_USERNAME'), 'Architektonické soutěže');
            $mail->addAddress('architektonickesouteze@gmail.com');

            $mail->isHTML(true);
            $mail->Subject = 'Nový dotaz z webu - Architektonická soutěž';
            $mail->Body    = "
            <div style='font-family: Arial, sans-serif; color: #333; line-height: 1.6;'>
                <h2 style='color: #007bff; font-size: 24px;'>Nový dotaz z webu</h2>
                <p style='font-size: 16px;'>Byla odeslána nová zpráva z vašeho webového formuláře.</p>
                <h3 style='color: #007bff; font-size: 20px;'>Detaily zprávy:</h3>
                <ul style='list-style: none; padding: 0;'>
                    <li style='font-size: 16px;'><strong>Jméno:</strong> $name</li>
                    <li style='font-size: 16px;'><strong>Telefon:</strong> $phone</li>
                    <li style='font-size: 16px;'><strong>Email:</strong> $email</li>
                    <li style='font-size: 16px;'><strong>Typ Sektoru:</strong> $sector</li>
                    <li style='font-size: 16px;'><strong>Typ Stavby:</strong> $buildingType</li>
                </ul>
                <p style='font-size: 16px;'><strong>Zpráva:</strong><br>$message</p>
            </div>";

            $mail->send();

            $mail->clearAddresses();
            $mail->addAddress($email);
            $mail->Subject = 'Děkujeme za Váš dotaz';
            $mail->Body    = "
                <div style='font-family: Arial, sans-serif; color: #333; line-height: 1.6; margin-top: 20px;'>
                    <p style='font-size: 16px;'>Dobrý den, $name,</p>
                    <br>
                    <p style='font-size: 16px;'>děkujeme za váš dotaz ohledně architektonické soutěže.</p>
                    <p style='font-size: 16px;'>Brzy vás budeme kontaktovat s dalšími podrobnostmi.</p>
                    <br>
                    <p style='font-size: 16px;'>S pozdravem,</p>
                    <p style='font-size: 16px;'>Tým architektonických soutěží</p>
                </div>";

            $mail->send();

            echo json_encode(['message' => 'E-mail byl úspěšně odeslán']);
        } catch (Exception $e) {
            echo json_encode(['error' => "E-mail se nepodařilo odeslat. Chyba: {$mail->ErrorInfo}"]);
        }
    } else {
        echo json_encode(['error' => 'Neplatná data']);
    }
} else {
    echo json_encode(['error' => 'Neplatný požadavek']);
}

function loadEnv($path)
{
    if (!file_exists($path)) {
        throw new Exception(".env soubor nebyl nalezen.");
    }

    $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (strpos(trim($line), '#') === 0) {
            continue;
        }

        list($name, $value) = explode('=', $line, 2);
        $name = trim($name);
        $value = trim($value);

        if (!array_key_exists($name, $_SERVER) && !array_key_exists($name, $_ENV)) {
            putenv("$name=$value");
            $_ENV[$name] = $value;
            $_SERVER[$name] = $value;
        }
    }
}

error_reporting(E_ALL);
ini_set('display_errors', 1);
