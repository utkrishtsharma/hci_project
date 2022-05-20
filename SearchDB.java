import java.io.*;
import java.text.*;
import java.util.*;
import javax.servlet.*;
import javax.servlet.http.*;
import java.sql.*;

import sdsu.*;


public class SearchDB extends HttpServlet {
    private static String connectionURL = "jdbc:mysql://opatija:3306/jadrn034?user=jadrn034&password=suitcase";               
    private static Connection connection = null;
    private static Statement statement = null;
    private static ResultSet resultSet = null;
    public void doGet(HttpServletRequest request,
                      HttpServletResponse response)
        throws IOException, ServletException
    {   
    response.setContentType("text/html");
    PrintWriter out = response.getWriter();
    String search = request.getParameter("search");
    String s = "SELECT sku, vendorModel, vendor.name, category.name, quantity, retail ,image,description,features FROM product join  category on category.id=product.catID  join vendor on vendor.id=product.venID where vendor.name LIKE '%."+search +"';";
    String result = DBHelper.doQuery(s);
    out.print(result);	
    }
    public static String doQuery(String s) {
            String answer = "";     
        try {
        Class.forName("com.mysql.jdbc.Driver").newInstance();
        connection = DriverManager.getConnection(connectionURL);
        statement = connection.createStatement();
        resultSet = statement.executeQuery(s);
                ResultSetMetaData rsmd = resultSet.getMetaData();                
                
                                
        while(resultSet.next()) {
                    int columns = rsmd.getColumnCount();
                    
                    for(int i=1; i <= columns; i++)  {                      
                        answer += resultSet.getString(i) + "|"; 
                        }
                answer += ";";                                                                                       
            }
                                  
        }
        catch(Exception e) {
            e.printStackTrace();
            return e.toString();
            }


        //////////////////////////////////////////////////////////////////////////            
        // The finally clause always runs, and closes resources if open.
        // DO NOT OMIT THIS!!!!!!
        finally {
            try {
                if(resultSet != null)
                    resultSet.close();
                if(statement != null)
                    statement.close();
                if(connection != null)                   
                    connection.close();
                }
            catch(SQLException e) {
                answer += e;
                }
        //////////////////////////////////////////////////////////////////////////
        }
        return answer;
    }  
}
