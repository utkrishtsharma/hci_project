<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
   "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">


<head>
	<title>Confirmation Page</title>
	<script type="text/javascript" src="http://jadran.sdsu.edu/jadrn034/js/jquery-2.1.1.js"></script>
	<script type="text/javascript" src="http://jadran.sdsu.edu/jadrn034/js/bootstrap.min.js"></script>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
  <link href='http://fonts.googleapis.com/css?family=Asap:400,700' rel='stylesheet' type='text/css'>
	<script src="http://jadran.sdsu.edu/jadrn034/shopping_cart.js"></script>
   <script src="http://jadran.sdsu.edu/jadrn034/show.js"></script>
   <script src="http://jadran.sdsu.edu/jadrn034/cart.js"></script>
   <script src="http://jadran.sdsu.edu/jadrn034/confirm.js"></script>
<link rel="stylesheet" type="text/css" href="http://jadran.sdsu.edu/jadrn034/style.css">

</head>
<body>

<div class="confirmation">
 	<h2><center>Order Confirmation</center></h2>
			<table id="confirm">
          
      <tr>
        <td id="confirm_Name">Name</td>
        <td><%= request.getParameter("shipfirstName")%><%= request.getParameter("shipmiddleName")%><%= request.getParameter("shiplastName")%></td>
      </tr>
      <tr>
        <td id="confirm_Card">Card</td>
        <td>XXXX XXXX XXXX <%= (request.getParameter("card")).substring(12) %></td>
      </tr> 
      <tr>
        <td id="confirm_Address">Address</td>
        <td><%= request.getParameter("shipaddress1")%> <%= request.getParameter("shipaddress2")%> <%= request.getParameter("shipcity")%> <%= request.getParameter("shipstate")%> <%= request.getParameter("shipzip")%> </td>
      </tr>
      <tr>
        <td id="confirm_Phone">Phone</td>
        <td><%= request.getParameter("shipphone")%></td>
      </tr>
      
    </table> 
    <a href="http://jadran.sdsu.edu/jadrn034/products.html"><center><button  class="btn btn-info btn-lg">Buy More Items</button></center></a>   	
    </div>
</body>
</html>