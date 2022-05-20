
$(document).ready(function () {

	var cart = new shopping_cart("jadrn034");
	var cartArray = cart.getCartArray();
  
        for(i=0; i < cartArray.length; i++) {
                
                    $.ajax({
                        url:"http://jadran.sdsu.edu/jadrn034/servlets/servlet/UpdateDB?skuID="+ cartArray[i][0] + "&qty=" + cartArray[i][1], 
                            success: function(response){
                                
                        },error: function(response) {
                                
                        }                        
                  
                                               
                    });
        }
        document.cookie = "jadrn034=; expires=Sun, 25 Sep 1994 00:00:00 UTC; path=/;";
});