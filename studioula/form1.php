<?php
    $captcha;
    if(isset($_POST['g-recaptcha-response'])){
        $captcha=$_POST['g-recaptcha-response'];
    }
    if(!$captcha){
      echo '<h2>Please check the the captcha form.</h2>';
      exit;
    }
    $secretKey = "6LfEcDQUAAAAAFxUsXA-zGZkxO2HRUBO73VsvT8k";
    $ip = $_SERVER['https://www.google.com/recaptcha/api/siteverify'];
    $response=file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=".$secretKey."&response=".$captcha."&remoteip=".$ip);
    $responseKeys = json_decode($response,true);

    if(intval($responseKeys["success"]) !== 1) {
        echo '<h2>Capture verification failed. Please try again</h2>';
    } else {
        $res = mail("stydiya_ula@mail.ru", "Обратный звонок", "Пожалуйста, свяжитесь со мной по следующиему вопросу: $_POST[qVopros] \nМои данные. \nИмя: $_POST[qName] \nТелефон: $_POST[qPhone] \E-mail: $_POST[qEmail]" );
        if (res) {
        echo "Ваше письмо отправлено.";
        } else {
        echo "Не удалось отправить письмо. Попробуйте еще раз.";
        }
    }
?>