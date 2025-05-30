<?php
header('Content-Type: application/json');

// Configurazione
$config = [
    'email' => 'lucabraca87@gmail.com', // La tua email
    'min_length' => 2,
    'max_length' => 1000
];

// Funzione per sanitizzare l'input
function sanitize_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

// Funzione per validare l'email
function validate_email($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL);
}

// Funzione per validare la lunghezza
function validate_length($str, $min, $max) {
    $len = strlen($str);
    return ($len >= $min && $len <= $max);
}

// Risposta di default
$response = [
    'success' => false,
    'message' => 'Errore sconosciuto'
];

// Verifica se è una richiesta POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Verifica presenza dei campi richiesti
    if (isset($_POST['name']) && isset($_POST['email']) && isset($_POST['subject']) && isset($_POST['message'])) {
        // Sanitizza gli input
        $name = sanitize_input($_POST['name']);
        $email = sanitize_input($_POST['email']);
        $subject = sanitize_input($_POST['subject']);
        $message = sanitize_input($_POST['message']);

        // Validazione
        if (!validate_email($email)) {
            $response['message'] = 'Email non valida';
        } elseif (!validate_length($name, $config['min_length'], $config['max_length'])) {
            $response['message'] = 'Nome troppo corto o troppo lungo';
        } elseif (!validate_length($subject, $config['min_length'], $config['max_length'])) {
            $response['message'] = 'Oggetto troppo corto o troppo lungo';
        } elseif (!validate_length($message, $config['min_length'], $config['max_length'])) {
            $response['message'] = 'Messaggio troppo corto o troppo lungo';
        } else {
            // Prepara l'email
            $headers = [
                'From: ' . $name . ' <' . $email . '>',
                'Reply-To: ' . $email,
                'X-Mailer: PHP/' . phpversion(),
                'Content-Type: text/html; charset=UTF-8'
            ];

            // Template dell'email
            $email_content = "
                <html>
                <head>
                    <style>
                        body { font-family: Arial, sans-serif; line-height: 1.6; }
                        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                        .header { background: #f8f9fa; padding: 20px; border-radius: 5px; }
                        .content { padding: 20px 0; }
                        .footer { font-size: 12px; color: #6c757d; }
                    </style>
                </head>
                <body>
                    <div class='container'>
                        <div class='header'>
                            <h2>Nuovo messaggio dal portfolio</h2>
                        </div>
                        <div class='content'>
                            <p><strong>Nome:</strong> {$name}</p>
                            <p><strong>Email:</strong> {$email}</p>
                            <p><strong>Oggetto:</strong> {$subject}</p>
                            <p><strong>Messaggio:</strong></p>
                            <p>" . nl2br($message) . "</p>
                        </div>
                        <div class='footer'>
                            <p>Questo messaggio è stato inviato dal form di contatto del tuo portfolio.</p>
                        </div>
                    </div>
                </body>
                </html>
            ";

            // Invia l'email
            if (mail($config['email'], $subject, $email_content, implode("\r\n", $headers))) {
                $response = [
                    'success' => true,
                    'message' => 'Messaggio inviato con successo! Ti risponderò al più presto.'
                ];
            } else {
                $response['message'] = 'Errore nell\'invio dell\'email. Per favore, riprova più tardi.';
            }
        }
    } else {
        $response['message'] = 'Tutti i campi sono obbligatori';
    }
} else {
    $response['message'] = 'Metodo non consentito';
}

// Invia la risposta
echo json_encode($response);
?>