<?php

 function getData(){
    $data_file = fopen("data-1.json","r");
    $data_readed = fread($data_file, filesize("data-1.json"));
    $data = json_decode($data_readed, true);
    fclose($data_file);
    return $data;
  }  
  
  $ciudad = $_POST['ciudad'];
  $tipo = $_POST['tipo']; 
 
  $data = getData();
  $a = array();
  
 if (isset($data)) {
      foreach ($data as $key => $value) {
        if ($value['Ciudad']==$ciudad ) {
		  if ($value['Tipo']==$tipo ) {						
          $a[$key]['Id'] = $value['Id'];
		  $a[$key]['Direccion'] = $value['Direccion'];
		  $a[$key]['Ciudad'] = $value['Ciudad'];
		  $a[$key]['Telefono'] = $value['Telefono'];
		  $a[$key]['Codigo_Postal'] = $value['Codigo_Postal'];
		  $a[$key]['Tipo'] = $value['Tipo'];
		  $a[$key]['Precio'] = $value['Precio'];
		                                }
		                       }
                        }
      	
	
                }
		
		 
 echo json_encode($a);


 ?>
 