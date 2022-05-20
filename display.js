

// <!--code by Name:Abhishek RedID: 822056658 -->

 
  var proj4_data;

  proj4_data = new Array();
  var cart;
$(document).ready(function() {
    
  cart = new shopping_cart("jadrn034");
    $.ajax({
  url:"http://jadran.sdsu.edu/jadrn034/servlets/servlet/AjaxDB",    
  success: function(response){
  // alert(response);
  storeData(response);
  display();  
  cartProducts();
    }});
    

    ///////Modal View///////
    $('#content').on('click', "table" ,function(e) {
        
        if(e.target.nodeName == "IMG"){
             
              document.getElementById('id01').style.display='block';
              productDetails(e.target.id);

        }else{
            return;
        }
     });
    
    
      /////Add to Cart///////////
// $(document).on('click', ".buy", function() { 
//          // // alert(cart.getCartArray());
//          var sku = this.id;
//          // // alert(sku);
//          // cart.add(sku,1);
//          // //alert(cart.getCartArray());
//          // $(this).next().fadeIn(50).fadeOut(2000);
//          //  cartProducts();
//          addToCart(sku);
// });
(document).on('change', "#add", function(e) {  
        var sku = $(e.target).attr("name");
        var qty = parseInt(e.target.value);
        if(qty <= 0){
            cart.delete(sku);
        }else{
            cart.setQuantity(sku,qty);
        }
        // updateCartDisplay();
        // displayProducts();
    });

});




///////Remove from cart///////
$(document).on('click','#remove', function(e){
        
        // alert("remove");
        cart.delete($(e.target).attr("name"));
        cartProducts();
        });


//////Cart Products///////
function cartProducts(){

      var cartArray = cart.getCartArray();
    
     
        var toWrite = "";
        var price = 0;
        var total = 0;
       

        var toWrite = "<table border='1'>";
        // toWrite += "<tr><th>Title</th><th>Quantity</th></tr>";
        for(i=0; i < cartArray.length; i++) {

            for(j=0;j<proj4_data.length-1;j++) {
               
                if (proj4_data[j][0] == cartArray[i][0])
                {
                     
                  
                        // toWrite += "<table border='1'>";
                        
                        toWrite += "<tr><td rowspan='4'><center><img src='http://jadran.sdsu.edu/~jadrn034/proj1/file_upload/"+proj4_data[j][6]+"'"+"id = '"+ proj4_data[j][0] +"'"+"</td></tr> ";
                        toWrite += "<tr><td class='productQuantity' >"+"Price : $" + proj4_data[j][5]  +"</td></tr>";     
                      
                        
                        
                            
                        toWrite += "<tr><td><input type='button' class='update' id='"+ cartArray[i][0] +"' value='"+ cartArray[i][0] +"' /> box <input type='button' id='remove' name='"+proj4_data[j][0]+ "' value='Remove from Cart' /></td></tr>";

                        toWrite += "<tr><td><input type='button' class='plus' id='"+proj4_data[j][0]+ "' id='"+ cartArray[i][0] +"' value='+' /> <input type='button' class='minus' name='"+proj4_data[j][0]+ "' id='"+ cartArray[i][0] +"' value='-' /></td></tr>";

                        // toWrite += "</table><hr />"; 
                        price +=   proj4_data[j][5];
                        total += cartArray[i][1]*proj4_data[j][5];
                        
                }
            }
           
            }
            toWrite += "<hr/><tr><td>Items Total:"+ eval(total).toFixed(2)+"<br/>Tax (@ 8%):"+ eval(0.08*total).toFixed(2)+"<br/>Shipping Charges:$2.00<br/>Net Amount Payable:"+ eval(1.08* total + 2).toFixed(2) + "</td>";
                    
        toWrite += "</table>"; 
        $('#cart').html(toWrite); 
           
        // display();

               
        }

// function addToCart(sku){
//     // if($(e.target).val() != 'Add to Cart') return;
//     //      var sku = $(e.target).attr("name");
//         cart.add(sku,1);
        
//         // document.getElementById('cart-count').innerHTML = cart.size();
        
//         $(e.target).next().fadeIn(50).fadeOut(1000);
//     }

function addToCart(e){
    if($(e.target).val() != 'Add to Cart') return;
         var sku = $(e.target).attr("name");
        cart.add(sku,1);
        // globalqty[sku] = globalqty[sku]-1;
        // document.getElementById('cart-count').innerHTML = cart.size();
        
        $(e.target).next().fadeIn(50).fadeOut(1000);
    }



function newDisp(){
    str = "";
     var cartValues = cart.getCartArray();


    for(var i=0; i < proj4_data.length-1; i++) {
        
str += "<table class='prod-size'><tr><td class='prod-text'>" + proj4_data[i][3] + " " +proj4_data[i][1] + "</td></tr> ";      
                str += "<tr><td><img id = '" +proj4_data[i][0]+ "' class='prod-img' src= 'http://jadran.sdsu.edu/~jadrn034/proj1/file_upload/"+ proj4_data[i][6]+"'></td></tr> ";                                    
                str += "<tr><td class='prod-text'> Price : $" + proj4_data[i][5]  +"</td></tr>";  
                
                // str += "<tr><td>" + stockValue  +"</td></tr>";  

                    str += "<tr><td class='tdBreak'><input type='button'  value='Add to Cart' name="+proj4_data[i][0]+ " class='cart-button'/>";        

                str += "<span class='addedToCart' hidden='hidden'>Added to Cart</span></td></tr>";
                str += "</table >";  
                                                   
    }
    if(document.getElementById('content') != null){
        document.getElementById('content').innerHTML = str; 
    }
}

////////////////Display Products///////////////////
    





////////////Modal View/////////////
    
////////////////////







    

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
  
