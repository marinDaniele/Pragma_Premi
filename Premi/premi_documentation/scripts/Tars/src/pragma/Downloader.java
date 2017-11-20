package pragma;
/**
 * Created by giacomomanzoli on 19/02/15.
 */

import pragma.data.Keywords;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;

import java.util.*;


public class Downloader {
    private static final String USER_AGENT = "Mozilla/5.0";
    private static final String TERM_LIST_URL = "http://localhost:20080/basidati/~smunari/PragmaDB/Glossario/glossariosw.php?dHjhlCaf=8sdfjhG34239bj3r459srglQjhq3r";
    //url per scaricare il glossario private static final String DEFAULT_GLOSSARY_URL ="http://localhost:20080/basidati/~smunari/PragmaDB/Glossario/getglossario.php?dHjhlCaf=8sdfjhG34239bj3r459srglQjhq3r";


    public Keywords downloadGlossaryKeywords(){
        return downloadGlossaryKeywords(TERM_LIST_URL);
    }

    public Keywords downloadGlossaryKeywords(String url){
        List<String> k;
        try {
            k = getTermList(url);
        }catch (Exception e){
            System.err.println("Problema con il download");
            k = new ArrayList<String>();
        }
        return new Keywords(k);
    }






    // HTTP GET request
    private List<String> getTermList(String fromURL) throws Exception {

        URL obj = new URL(fromURL);
        HttpURLConnection con = (HttpURLConnection) obj.openConnection();

        // optional default is GET
        con.setRequestMethod("GET");

        //add request header
        con.setRequestProperty("User-Agent", USER_AGENT);

        int responseCode = con.getResponseCode();
        System.out.println("\nSending 'GET' request to URL : " + fromURL);
        System.out.println("Response Code : " + responseCode);

        BufferedReader in = new BufferedReader(
                new InputStreamReader(con.getInputStream()));
        String inputLine;
        List<String> lista = new ArrayList<String>();
        while ((inputLine = in.readLine()) != null) {
            lista.add(inputLine);
        }
        in.close();
        return lista;
    }

    private static String downloadFile(String fromURL) throws Exception {

        URL obj = new URL(fromURL);
        HttpURLConnection con = (HttpURLConnection) obj.openConnection();

        // optional default is GET
        con.setRequestMethod("GET");

        //add request header
        con.setRequestProperty("User-Agent", USER_AGENT);

        int responseCode = con.getResponseCode();
        System.out.println("\nSending 'GET' request to URL : " + fromURL);
        System.out.println("Response Code : " + responseCode);

        BufferedReader in = new BufferedReader(
                new InputStreamReader(con.getInputStream()));
        String inputLine;
        String result="";
        while ((inputLine = in.readLine()) != null) {
            result+=inputLine;
            result+="\n";
        }
        in.close();
        return result;
    }

}
