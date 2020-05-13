<?php

$config['maintenance'] = false;
$config['maintenance_url'] = '/maintenance';

//$config['version'] = 7;
if($_SERVER['SERVER_ADDR'] == "127.0.0.1" || $_SERVER['SERVER_ADDR'] == "localhost" || $_SERVER['SERVER_ADDR'] == "xxx.xx.xx.xxx"){
    $config['version'] = uniqid();
}else{
    $config['version'] = 42;
}


if($config['maintenance'])
{
    header('Location: '.$config['maintenance_url']);
    die('Under maintenance, please come back later');
}

?>
