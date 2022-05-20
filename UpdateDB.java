import java.io.*;
import java.text.*;
import java.util.*;
import javax.servlet.*;
import javax.servlet.http.*;
import java.sql.*;
import java.util.*;


public class UpdateDB extends HttpServlet {
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
    String skuID = request.getParameter("skuID"); 
    String qty = request.getParameter("qty");     
    String query = "UPDATE product SET quantity = quantity - "+ qty  +" WHERE sku ='" + skuID + "';";
    String result = doQuery(query);
    out.print(result);  
    }  
public static String doQuery(String s) {
        String answer = "";     
        try {
        Class.forName("com.mysql.jdbc.Driver").newInstance();
        connection = DriverManager.getConnection(connectionURL);
        statement = connection.createStatement();
       
        int result = statement.executeUpdate(s);
        answer += String.valueOf(result);                    
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