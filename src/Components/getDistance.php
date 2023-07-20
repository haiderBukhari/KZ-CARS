<?php

function calculateDistance($lat1, $long1, $lat2, $long2){
    $theta = $long1 - $long2;
    $miles = (sin(deg2rad($lat1))) * sin(deg2rad($lat2)) + (cos(deg2rad($lat1)) * cos(deg2rad($lat2)) * cos(deg2rad($theta)));
    $miles = acos($miles);
    $miles = rad2deg($miles);
    $result['miles'] = $miles * 60 * 1.1515;
    $result['feet'] = $result['miles']*5280;
    $result['yards'] = $result['feet']/3;
    $result['kilometers'] = $result['miles']*1.609344;
    $result['meters'] = $result['kilometers']*1000;
    return $result;
  }

echo json_encode(calculateDistance($_POST['lat_to'],$_POST['long_to'],$_POST['lat_from'],$_POST['long_from']));
// echo "hii";
?>