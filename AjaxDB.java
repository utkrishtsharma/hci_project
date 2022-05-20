import java.io.*;
import java.text.*;
import java.util.*;
import javax.servlet.*;
import javax.servlet.http.*;

import sdsu.*;


public class AjaxDB extends HttpServlet {
    public void doGet(HttpServletRequest request,
                      HttpServletResponse response)
        throws IOException, ServletException
    {   
    response.setContentType("text/html");
    PrintWriter out = response.getWriter();
    String s = "SELECT sku, vendorModel, vendor.name, category.name, quantity, retail ,image,description,features FROM product join  category on category.id=product.catID  join vendor on vendor.id=product.venID;";
    String result = DBHelper.doQuery(s);
    out.print(result);	
    }  
}