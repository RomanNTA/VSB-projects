<?php

// $DbConst = array [
//         'host' => 'localhost',
//         'dbname' => 'vsb-pokus',
//         'username' => 'root',
//         'password' => 'stivi68'
//     ];



return (!str_contains($_SERVER['HTTP_HOST'], "pc-nta")) ? [
    'host' => 'md414.wedos.net',
    'dbname' => 'd369439_sliva',
    'username' => 'a369439_sliva',
    'password' => 'WebRomanek#1968'
] :
    [
        'host' => 'localhost',
        'dbname' => 'vsb-pokus',
        'username' => 'root',
        'password' => 'stivi68'
    ];
