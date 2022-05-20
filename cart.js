


$(document).ready(function() {
checkCartOnLoad();
});
var proj4_data = new Array();
var a = {};

$(document).on('click','#remove', function(e){
        cart.delete($(e.target).attr("name"));
        cartProducts();
});
    
var cart = new shopping_cart("jadrn034");
    $.ajax({
  url:"http://jadran.sdsu.edu/jadrn034/servlets/servlet/AjaxDB",    
  success: function(response){
  storeData(response);
    
  cartProducts();
    }
});


function cartProducts()
{
    var cartArray = cart.getCartArray();
        var toWrite = "";
        var write = "";
        var price = 0;
        var total = 0;
        

        var toWrite = "<table>";
       
        for(i=0; i < cartArray.length; i++) {

            for(j=0;j<proj4_data.length;j++) {
               // a = cartArray[i][1];
                if (proj4_data[j][0] == cartArray[i][0])
                {
                     a[proj4_data[j][0]] = cartArray[i][1]
                  
                        toWrite += "<table border='1'class='cart_table'>";
                        
                        toWrite += "<tr><td rowspan='4' ><center><img src='http://jadran.sdsu.edu/~jadrn034/proj1/file_upload/"+proj4_data[j][6]+"' alt='"+proj4_data[j][0]+"'"+
                        "width='200px'/></td><td>"+ proj4_data[j][2] +"</td></tr>";     
                      
                        toWrite += "<tr><td class='productQuantity' >"+"Price : $" + proj4_data[j][5]  +"</td></tr>"; 
                    
                        
                        toWrite += "<tr><td><input type='button' class='update' id='"+ cartArray[i][0] +"' value='"+cartArray[i][1] +"' /> box <input type='button' id='remove' name='"+proj4_data[j][0]+ "' value='Remove from Cart' /></td></tr>";

                        toWrite += "<tr><td><input type='button' class='plus' name='"+proj4_data[j][0]+ "' id='"+ cartArray[i][0] +"' value='+' /> <input type='button' class='minus' name='"+proj4_data[j][0]+ "' id='"+ cartArray[i][0] +"' value='-' /></td></tr>";

                        toWrite += "</table>"; 
                        
                        price +=   proj4_data[j][5];
                        total += cartArray[i][1]*proj4_data[j][5];
                        
                }
            }
           
            }
                    
        toWrite += "</table>"; 

        $('#cart').html(toWrite); 
        write += "<table><tr><td>Items Total:"+ eval(total).toFixed(2)+"<br/>Tax (@ 8%):"+ eval(0.08*total).toFixed(2)+"<br/>Shipping Charges:$5.00<br/>Net Amount Payable:"+ eval(1.08* total + 5).toFixed(2) + "</td></tr></table>";
        $('#ordersummary').html(write);
            
        tot = eval(1.08* total + 5).toFixed(2);
        retail = eval(1 * total).toFixed(2);
        tax = eval(0.08* total).toFixed(2);

         var b = cart.size()

               if(b == 0) {
           
            if(document.getElementById('order') != null)  
            document.getElementById('order').style.visibility = 'hidden';
            document.getElementById('ordersummary').style.visibility = 'hidden';
            document.getElementById('message').style.visibility = 'visible';

        } else {
            if(document.getElementById('order') != null)
            document.getElementById('order').style.visibility = 'visible';
            document.getElementById('ordersummary').style.visibility = 'visible';
            document.getElementById('message').style.visibility = 'hidden';
        }

}



// function check(sku,quantity){
//     var cartValues = cart.getCartArray();
// for(var i=0; i < cartValues.length; i++) {
//             for(var j=0; j < proj4_data.length-1; j++) {
//                     if(proj4_data[j][0] == cartValues[i][0]){
//                           if(parseInt(cartValues[i][1]) >= parseInt(proj4_data[j][4])){
//                             cart.setQuantity(cartValues[i][0],proj4_data[j][4]);
                           
//                             return proj4_data[j][4];
//                         }else{
//                             return quantity;
                                
//                         }
//                     }
//                 }
//             }
//               cartProducts();
// }



function checkCartOnLoad(){

var cartValues = cart.getCartArray();
for(var i=0; i < cartValues.length; i++) {
            for(var j=0; j < proj4_data.length-1; j++) {
                    if(proj4_data[j][0] == cartValues[i][0]){
                          if(parseInt(cartValues[i][1]) >= parseInt(proj4_data[j][4])){
                            cart.setQuantity(cartValues[i][0],proj4_data[j][4]);

                            cartValues = cart.getCartArray();
                        }
                    }
                }
            }
        cartProducts();
       
}





function checkCart(skuID){

var cartValues = cart.getCartArray();
for(var i=0; i < cartValues.length; i++) {
            for(var j=0; j < proj4_data.length-1; j++) {
                    if(proj4_data[j][0] == cartValues[i][0]){
                          if(parseInt(cartValues[i][1]) >=parseInt(proj4_data[j][4])){
                            cart.setQuantity(cartValues[i][0],proj4_data[j][4]);
                            alert("The Maximum quantity of "+proj4_data[j][2] +" we have right now is "+proj4_data[j][4]);
                            cartValues = cart.getCartArray();
                        }else{
                             var sku = skuID;
                             cart.add(sku,1);
                                
                        }
                    }
                }
            }

       
        cartProducts();
}

$(document).on('click','.plus', function(e){
     
        var sku = this.id;
        checkCart(sku);

        }); 

        $(document).on('click','.minus', function(e){
          var sku = this.id;
          for(var key in a){
            if(key === sku){
                 if( a[key] > 1){
        
                cart.sub(sku,1);
                
                cartProducts();
            }else{
                    cart.delete($(e.target).attr("name"));
                    cartProducts();
            }
        }
    }

}); 




  

 
   function FillBilling(f) {
    if(f.billingtoo.checked == true) {
    f.shipfirstName.value = f.billingfirstName.value;
    f.shipmiddleName.value = f.billingmiddleName.value;
    f.shiplastName.value = f.billinglastName.value;
    f.shipaddress1.value = f.billingaddress1.value;
    f.shipaddress2.value = f.billingaddress2.value;
    f.shipcity.value = f.billingcity.value;
    f.shipstate.value = f.billingstate.value;
    f.shipzip.value = f.billingzip.value;
    f.shipphone.value = f.billingphone.value;
  }
  else{
    f.shipfirstName.value = "";
    f.shipmiddleName.value = "";
    f.shiplastName.value = "";
    f.shipaddress1.value = ""; 
    f.shipaddress2.value = "";
    f.shipcity.value = "";
     f.shipstate.value = "";
    f.shipzip.value = "";
    f.shipphone.value = "";


  }
}



function storeData(response) {
    var tmpArray = explodeArray(response,';');
    // var tmpArray = response.split(';');
    for(var i=0; i < tmpArray.length; i++) {
        innerArray = explodeArray(tmpArray[i],'|');
        // innerArray = tmpArray[i].split('|');
        proj4_data[i] = innerArray;
        }
    }
    // from http://www.webmasterworld.com/forum91/3262.htm            
function explodeArray(item,delimiter) {
tempArray=new Array(1);
var Count=0;
var tempString=new String(item);

while (tempString.indexOf(delimiter)>0) {
tempArray[Count]=tempString.substr(0,tempString.indexOf(delimiter));
tempString=tempString.substr(tempString.indexOf(delimiter)+1,tempString.length-tempString.indexOf(delimiter)+1);
Count=Count+1
}

tempArray[Count]=tempString;
return tempArray;
}  