// <!--code by Name:Abhishek RedID: 822056658 -->
//   Cs645 Proj2


var proj4_data = new Array();
$(document).ready(function() {
$('#cartCount').html(cart.size());
    $.ajax({
  url:"http://jadran.sdsu.edu/jadrn034/servlets/servlet/AjaxDB",    
  success: function(response){

  storeData(response);
  display();  

    }});


$('#content').on('click',$('input[type=button]'), function(e) {
    if($(e.target).val() != 'Add to Cart') return; 
        var sku = $(e.target).attr("name");
        cart.add(sku,1);
        $('#cartCount').html(cart.size());
        $(e.target).next().fadeIn(50).fadeOut(2000);
        });      
     
$('#modal-body').on('click',"input[type=button]", function(e) {
    if($(e.target).val() != 'Add to Cart') return; 
        var sku = $(e.target).attr("name");
        cart.add(sku,1);
        $('#cartCount').html(cart.size());
        $(this).next().fadeIn(50).fadeOut(2000);
        });


        $('#content').on('click', "table" ,function(e) {
        if(e.target.nodeName == "IMG"){
             
              document.getElementById('id01').style.display='block';
              productDetail(e.target.id);

        }else{
            return;
        }
     });

   $('#search').on('click', function(){
   		getFilter();
   });
    

///
  });


function getFilter(){
	 var selectedID1 = [];
	 var selectedID2 = [];
	$(':checkbox[name="chk1"]:checked').each (function () {
    	selectedID1.push(this.id);
	});

	$(':checkbox[name="chk2"]:checked').each (function () {
    	selectedID2.push(this.id);
	});	

	if(selectedID1.length != 0 || selectedID2.length != 0){
		filterVals(selectedID1, selectedID2);	
	}else{
		display();
	}

	
}


function filterVals(selectedID1, selectedID2){
	    Vendor = false;
		Category = false;
		str = "";
	document.getElementById('content').innerHTML = "";
	if(selectedID1.length > 0) {
		Vendor = true;
	}
	if(selectedID2.length > 0) {
		Category = true;
	}


	if(selectedID1.length == 0){
	for(var j = 0; j<selectedID2.length; j++){
    for(var i=0; i < proj4_data.length; i++) {
	    	if(Vendor & Category){
	    		if((proj4_data[i][2] != undefined ? proj4_data[i][2].toUpperCase() : proj4_data[i][2]) == (selectedID1[j] != undefined ? selectedID1[j].toUpperCase() : selectedID1[j]) 
	    			&& ((proj4_data[i][3] != undefined ? proj4_data[i][3].toUpperCase() : proj4_data[i][3]) == (selectedID2[j] != undefined ? selectedID2[j].toUpperCase() : selectedID2[j]))){
		        str += "<table class='products' ><tr><td class='prodName'>" + proj4_data[i][3] + " " +proj4_data[i][1] + "</td></tr> ";      
	         	str += "<tr><td class='prod_img'><img id = '" +proj4_data[i][0]+ "'  src= 'http://jadran.sdsu.edu/~jadrn034/proj1/file_upload/"+ proj4_data[i][6]+"' width='300px' height= 'auto'></td></tr> ";                                    
	          	str += "<tr><td class='prod_Price'> Price : $" + proj4_data[i][5]  +"</td></tr>";  
	          
        if(proj4_data[i][4] > 0 ){
	          	str += "<tr><td class='cart_button'><input type='button'  value='Add to Cart' name="+proj4_data[i][0]+ " class='cart-button'/>";      	

				str += "<span class='addedToCart' hidden='hidden'>Added to Cart</span></td></tr>";
			}else{
				str += "<tr><td class='stock'>OUT OF STOCK </td></tr>";
			}
	            str += "</table >";    
		        }
	    	}else if(Vendor){
	    		if((proj4_data[i][2] != undefined ? proj4_data[i][2].toUpperCase() : proj4_data[i][2]) == (selectedID1[j] != undefined ? selectedID1[j].toUpperCase() : selectedID1[j])){
		        	str += "<table class='products' ><tr><td class='prodName'>" + proj4_data[i][3] + " " +proj4_data[i][1] + "</td></tr> ";      
	         	str += "<tr><td class='prod_img'><img id = '" +proj4_data[i][0]+ "'  src= 'http://jadran.sdsu.edu/~jadrn034/proj1/file_upload/"+ proj4_data[i][6]+"' width='300px' height= 'auto'></td></tr> ";                                    
	          	str += "<tr><td class='prod_Price'> Price : $" + proj4_data[i][5]  +"</td></tr>";  
	          	
        if(proj4_data[i][4] > 0 ){
	          	str += "<tr><td class='cart_button'><input type='button'  value='Add to Cart' name="+proj4_data[i][0]+ " class='cart-button'/>";      	

				str += "<span class='addedToCart' hidden='hidden'>Added to Cart</span></td></tr>";
			}else{
				str += "<tr><td class='stock'>OUT OF STOCK </td></tr>";
			}
	            str += "</table >";      
	    		}
	    	}
	    	else if(Category){
	    		if((proj4_data[i][3] != undefined ? proj4_data[i][3].toUpperCase() : proj4_data[i][3]) == (selectedID2[j] != undefined ? selectedID2[j].toUpperCase() : selectedID2[j])){
		        	str += "<table class='products' ><tr><td class='prodName'>" + proj4_data[i][3] + " " +proj4_data[i][1] + "</td></tr> ";      
	         	str += "<tr><td class='prod_img'><img id = '" +proj4_data[i][0]+ "'  src= 'http://jadran.sdsu.edu/~jadrn034/proj1/file_upload/"+ proj4_data[i][6]+"' width='300px' height= 'auto'></td></tr> ";                                    
	          	str += "<tr><td class='prod_Price'> Price : $" + proj4_data[i][5]  +"</td></tr>";  
	          	 
        if(proj4_data[i][4] > 0 ){
	          	str += "<tr><td class='cart_button'><input type='button'  value='Add to Cart' name="+proj4_data[i][0]+ " class='cart-button'/>";      	

				str += "<span class='addedToCart' hidden='hidden'>Added to Cart</span></td></tr>";
			}else{
				str += "<tr><td class='stock'>OUT OF STOCK </td></tr>";
			}
	            str += "</table >";     
	    		}
	    	}	
		}
	}

} 
else if(selectedID2.length == 0){
	for(var k = 0; k<selectedID1.length; k++){
    for(var i=0; i < proj4_data.length; i++) {
	    	if(Vendor & Category){
	    		if((proj4_data[i][2] != undefined ? proj4_data[i][2].toUpperCase() : proj4_data[i][2]) == (selectedID1[k] != undefined ? selectedID1[k].toUpperCase() : selectedID1[k]) 
	    			&& ((proj4_data[i][3] != undefined ? proj4_data[i][3].toUpperCase() : proj4_data[i][3]) == (selectedID2[k] != undefined ? selectedID2[k].toUpperCase() : selectedID2[k]))){
		        	 str += "<table class='products' ><tr><td class='prodName'>" + proj4_data[i][3] + " " +proj4_data[i][1] + "</td></tr> ";      
	         	str += "<tr><td class='prod_img'><img id = '" +proj4_data[i][0]+ "'  src= 'http://jadran.sdsu.edu/~jadrn034/proj1/file_upload/"+ proj4_data[i][6]+"' width='300px' height= 'auto'></td></tr> ";                                    
	          	str += "<tr><td class='prod_Price'> Price : $" + proj4_data[i][5]  +"</td></tr>";  
	          	
	          	
        if(proj4_data[i][4] > 0 ){
	          	str += "<tr><td class='cart_button'><input type='button'  value='Add to Cart' name="+proj4_data[i][0]+ " class='cart-button'/>";      	

				str += "<span class='addedToCart' hidden='hidden'>Added to Cart</span></td></tr>";
			}else{
				str += "<tr><td class='stock'>OUT OF STOCK </td></tr>";
			}
	            str += "</table >";   
		        } 
		        }
	    	else if(Vendor){
	    		if((proj4_data[i][2] != undefined ? proj4_data[i][2].toUpperCase() : proj4_data[i][2]) == (selectedID1[k] != undefined ? selectedID1[k].toUpperCase() : selectedID1[k])){
		        	 str += "<table class='products' ><tr><td class='prodName'>" + proj4_data[i][3] + " " +proj4_data[i][1] + "</td></tr> ";      
	         	str += "<tr><td class='prod_img'><img id = '" +proj4_data[i][0]+ "'  src= 'http://jadran.sdsu.edu/~jadrn034/proj1/file_upload/"+ proj4_data[i][6]+"' width='300px' height= 'auto'></td></tr> ";                                    
	          	str += "<tr><td class='prod_Price'> Price : $" + proj4_data[i][5]  +"</td></tr>";  
	 
        if(proj4_data[i][4] > 0 ){
	          	str += "<tr><td class='cart_button'><input type='button'  value='Add to Cart' name="+proj4_data[i][0]+ " class='cart-button'/>";      	

				str += "<span class='addedToCart' hidden='hidden'>Added to Cart</span></td></tr>";
			}else{
				str += "<tr><td class='stock'>OUT OF STOCK </td></tr>";
			}
	            str += "</table >";      
		        } 
	    		}
	    	
	    	else if(Category){
	    		if((proj4_data[i][3] != undefined ? proj4_data[i][3].toUpperCase() : proj4_data[i][3]) == (selectedID2[k] != undefined ? selectedID2[k].toUpperCase() : selectedID2[k])){
		        	 str += "<table class='products' ><tr><td class='prodName'>" + proj4_data[i][3] + " " +proj4_data[i][1] + "</td></tr> ";      
	         	str += "<tr><td class='prod_img'><img id = '" +proj4_data[i][0]+ "'  src= 'http://jadran.sdsu.edu/~jadrn034/proj1/file_upload/"+ proj4_data[i][6]+"' width='300px' height= 'auto'></td></tr> ";                                    
	          	str += "<tr><td class='prod_Price'> Price : $" + proj4_data[i][5]  +"</td></tr>";  
	        
        if(proj4_data[i][4] > 0 ){
	          	str += "<tr><td class='cart_button'><input type='button'  value='Add to Cart' name="+proj4_data[i][0]+ " class='cart-button'/>";      	

				str += "<span class='addedToCart' hidden='hidden'>Added to Cart</span></td></tr>";
			}else{
				str += "<tr><td class='stock'>OUT OF STOCK </td></tr>";
			}
	            str += "</table >";  
		        }
	    		
	    	}	
		}
	}
} else{
	for(var k = 0; k<selectedID1.length; k++){
	for(var l = 0; l<selectedID2.length; l++){
    for(var i=0; i < proj4_data.length; i++) {
	    	if(Vendor & Category){
	    		if((proj4_data[i][2] != undefined ? proj4_data[i][2].toUpperCase() : proj4_data[i][2]) == (selectedID1[k] != undefined ? selectedID1[k].toUpperCase() : selectedID1[k]) 
	    			&& ((proj4_data[i][3] != undefined ? proj4_data[i][3].toUpperCase() : proj4_data[i][3]) == (selectedID2[l] != undefined ? selectedID2[l].toUpperCase() : selectedID2[l]))){
		        	 str += "<table class='products' ><tr><td class='prodName'>" + proj4_data[i][3] + " " +proj4_data[i][1] + "</td></tr> ";      
	         	str += "<tr><td class='prod_img'><img id = '" +proj4_data[i][0]+ "'  src= 'http://jadran.sdsu.edu/~jadrn034/proj1/file_upload/"+ proj4_data[i][6]+"' width='300px' height= 'auto'></td></tr> ";                                    
	          	str += "<tr><td class='prod_Price'> Price : $" + proj4_data[i][5]  +"</td></tr>";  
	          	
	          	
        if(proj4_data[i][4] > 0 ){
	          	str += "<tr><td class='cart_button'><input type='button'  value='Add to Cart' name="+proj4_data[i][0]+ " class='cart-button'/>";      	

				str += "<span class='addedToCart' hidden='hidden'>Added to Cart</span></td></tr>";
			}else{
				str += "<tr><td class='stock'>OUT OF STOCK </td></tr>";
			}
	            str += "</table >";  
		        }
		        
	    	}else if(Vendor){
	    		if((proj4_data[i][2] != undefined ? proj4_data[i][2].toUpperCase() : proj4_data[i][2]) == (selectedID1[k] != undefined ? selectedID1[k].toUpperCase() : selectedID1[k])){
		        	 str += "<table class='products' ><tr><td class='prodName'>" + proj4_data[i][3] + " " +proj4_data[i][1] + "</td></tr> ";      
	         	str += "<tr><td class='prod_img'><img id = '" +proj4_data[i][0]+ "'  src= 'http://jadran.sdsu.edu/~jadrn034/proj1/file_upload/"+ proj4_data[i][6]+"' width='300px' height= 'auto'></td></tr> ";                                    
	          	str += "<tr><td class='prod_Price'> Price : $" + proj4_data[i][5]  +"</td></tr>";  
	          	
	          	  
        if(proj4_data[i][4] > 0 ){
	          	str += "<tr><td class='cart_button'><input type='button'  value='Add to Cart' name="+proj4_data[i][0]+ " class='cart-button'/>";      	

				str += "<span class='addedToCart' hidden='hidden'>Added to Cart</span></td></tr>";
			}else{
				str += "<tr><td class='stock'>OUT OF STOCK </td></tr>";
			}
	            str += "</table >";    
		        }   
	    		
	    	}
	    	else if(Category){
	    		if((proj4_data[i][3] != undefined ? proj4_data[i][3].toUpperCase() : proj4_data[i][3]) == (selectedID2[l] != undefined ? selectedID2[l].toUpperCase() : selectedID2[l])){
		        	 str += "<table class='products' ><tr><td class='prodName'>" + proj4_data[i][3] + " " +proj4_data[i][1] + "</td></tr> ";      
	         	str += "<tr><td class='prod_img'><img id = '" +proj4_data[i][0]+ "'  src= 'http://jadran.sdsu.edu/~jadrn034/proj1/file_upload/"+ proj4_data[i][6]+"' width='300px' height= 'auto'></td></tr> ";                                    
	          	str += "<tr><td class='prod_Price'> Price : $" + proj4_data[i][5]  +"</td></tr>";  
	          	
	     
        if(proj4_data[i][4] > 0 ){
	          	str += "<tr><td class='cart_button'><input type='button'  value='Add to Cart' name="+proj4_data[i][0]+ " class='cart-button'/>";      	

				str += "<span class='addedToCart' hidden='hidden'>Added to Cart</span></td></tr>";
			}else{
				str += "<tr><td class='stock'>OUT OF STOCK </td></tr>";
			}
	            str += "</table >";     
		        }
	    		
	    	}	
		}
	}
	}
}

 if(document.getElementById('content') != null){
    	document.getElementById('content').innerHTML = str;	
    }

}



function productDetail(sku){
        
    tmpString = "";
    head = "";
    footer = "";
        for(var i=0; i < proj4_data.length; i++) {
            if(proj4_data[i][0] == sku){

                
                head += "<tr><td>"+proj4_data[i][2] + " " + proj4_data[i][1]+"</td></tr>";
                
                

                tmpString += "<table class='products_modal'  ><tr><td class='productName' colspan='2'>"+ proj4_data[i][3]+"</td></tr><tr><td class='prod_img' rowspan = '3'><img  width='400px' height= 'auto'" +" src= 'http://jadran.sdsu.edu/~jadrn034/proj1/file_upload/"+ proj4_data[i][6]+"'"+"id = '"+ proj4_data[i][0] +"'"+"</td>";
                tmpString +="<td class='productDes' >"+"Description : " + proj4_data[i][7]  +"</td></tr><tr><td class='productFeatures' >"+"Features: " + proj4_data[i][8]  +"</td></tr> ";
                
                tmpString += "<tr><td class='productQuantity' >"+"Price : $" + proj4_data[i][5]  +"</td></tr>";
                 if(proj4_data[i][4]>0){
                   
                tmpString += "<tr><td class='cart_button' colspan='2'><input type='button'  value='Add to Cart' name="+proj4_data[i][0]+ " class='cart-button'/>";      	

				tmpString += "<span class='addedToCart' hidden='hidden'>Added to Cart</span></td></tr>";
} else{
	tmpString += "<tr><td class='stock'>OUT OF STOCK </td></tr>";
}
                tmpString +="</table >"; 
    
            }
        }
        var headerHandle = document.getElementById('title');
        headerHandle.innerHTML = head;
        var bodyhandle = document.getElementById('modal-body');
        bodyhandle.innerHTML = tmpString;
        var footerHandle = document.getElementById('modal-footer');
        footerHandle.innerHTML = footer;

}



function display(){
str = "";


    for(var i=0; i < proj4_data.length-1; i++) {
    	
                str += "<table class='products' ><tr><td class='prod_title'>" + proj4_data[i][3] + " " +proj4_data[i][1] + "</td></tr> ";      
	         	str += "<tr><td class='prod_img'><img id = '" +proj4_data[i][0]+ "'  src= 'http://jadran.sdsu.edu/~jadrn034/proj1/file_upload/"+ proj4_data[i][6]+"' width='300px' height= 'auto'></td></tr> ";                                    
	          	str += "<tr><td class='prod_Price'> Price : $" + proj4_data[i][5]  +"</td></tr>";  
	 			if(proj4_data[i][4] > 0 ){
	          	str += "<tr><td class='cart_button'><input type='button'  value='Add to Cart' name="+proj4_data[i][0]+ " class='cart-button'/>";      	

				str += "<span class='addedToCart' hidden='hidden'>Added to Cart</span></td></tr>";
			}else{
				str += "<tr><td class='stock'>OUT OF STOCK </td></tr>";
			}
	            str += "</table >";  
			
	                                               
    }
    if(document.getElementById('content') != null){
    	document.getElementById('content').innerHTML = str;	
    }

}



function storeData(response) {
    var tmpArray = explodeArray(response,';');
    for(var i=0; i < tmpArray.length; i++) {
        innerArray = explodeArray(tmpArray[i],'|');
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
 
