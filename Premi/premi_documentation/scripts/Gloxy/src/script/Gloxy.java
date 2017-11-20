package script;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;

import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.*;

import java.nio.file.Paths;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

//http://www.mkyong.com/java/how-to-send-http-request-getpost-in-java/

/*
ssh -L23306:basidati:3306 -L20443:basidati:443 -L20080:basidati:80 -L20022:basidati:22 gmanzoli@ssh.studenti.math.unipd.it
* */

public class Gloxy {

    private static final String USER_AGENT = "Mozilla/5.0";
    private static final String TERM_LIST_URL = "http://localhost:20080/basidati/~smunari/PragmaDB/Glossario/glossariosw.php?dHjhlCaf=8sdfjhG34239bj3r459srglQjhq3r";
    private static final String DEFAULT_GLOSSARY_URL ="http://localhost:20080/basidati/~smunari/PragmaDB/Glossario/getglossario.php?dHjhlCaf=8sdfjhG34239bj3r459srglQjhq3r";
    private static final String GLOSSARY_MARK = "\\\\ped{G}"; //server per le Regex
    private static final String GLOSSARY_MARK_REPLACE = "\\ped{G}"; //serve per String.replace()
    private static final String[] IGNORE_COMMANDS = new String[]{"nomark","texttt","input","ref","label","includegraphics","url", "section", "subsection","subsubsection","subsubsubsection","proponente", "committente", "referenteProponente"};

    public static void main(String[] args) throws Exception {
        System.out.println("Avviato!");
        // download urlToDownload outputPath
        // download glossary outputPath
        // mark file filePath
        // mark dir dirPath
        // clear file filePath
        // clear dir dirPath

        if (args.length < 3) {
            System.out.println("Non ci sono abbastanza parametri");
            return;
        }

        String command = args[0];
        if (command.equals("download")){
            String downloadUrl = args[1];
            if (downloadUrl.equals("glossary")){
                downloadUrl=DEFAULT_GLOSSARY_URL;
            }
            String outputPath = args[2];
            String content = downloadFile(downloadUrl);
            if (!content.equals("")){
                Charset charset = StandardCharsets.UTF_8;
                System.out.println("Inizio a scrivere il file sul percorso: "+outputPath);
                try (BufferedWriter writer = Files.newBufferedWriter(Paths.get(outputPath), charset)) {
                    writer.write(content);
                    writer.flush();
                    writer.close();
                } catch (IOException e) {
                    System.out.println(e.toString());
                }
                System.out.println("Fine salvataggio file");

            }

        }

        if (command.equals("mark")){
            String what = args[1];
            List<String> termList = getTermList(TERM_LIST_URL);
            if (what.equals("file")){
                String filePath = args[2];
                System.out.println("Mark il file "+filePath);
                //sistema il file
                markFile(filePath,termList);

            }
            if (what.equals("dir")){
                //sistema tutti i file nella directory e sotto dir
                markDir(args[2],termList);
            }
        }

        if (command.equals("clear")){
            String what = args[1];
            List<String> termList = getTermList(TERM_LIST_URL);
            if (what.equals("file")){
                String filePath = args[2];
                System.out.println("Pulisco il file "+filePath);
                //sistema il file
                markFile(filePath,new ArrayList<String>());
                 /*Passo una lista di termini vuota, in questo modo viene tolto il mark dal metodo processLine e non
                 * viengono agginti nuovi mark perché la lista che gli passo è vuota*/

            }
            if (what.equals("dir")){
                //sistema tutti i file nella directory e sotto dir
                markDir(args[2],new ArrayList<String>());
            }
        }
    }

    private static void markDir(String dirPath, List<String> termList){
        File dir = new File(dirPath);

        File[] content = dir.listFiles();

        for (int i=0; i < content.length; i++){
            if (content[i].isDirectory()){
                markDir(content[i].getPath(),termList);
            }else{
                //ho un file
                //.getPath() -> /Users/giacomomanzoli/Desktop/normeDiProgetto/normeDiProgetto.aux
                //.getName() -> normeDiProgetto.aux
                if (content[i].getName().contains(".tex")){
                    System.out.println("Mark il file: "+content[i].getPath());
                    markFile(content[i].getPath(),termList);
                }
            }
        }
    }


    private static void markFile(String filePath, List<String> termList){
        String newFileContent = "";

        //Carico il file e nel mentre elaboro le righe
        Charset charset = StandardCharsets.UTF_8;
        try (BufferedReader reader = Files.newBufferedReader(Paths.get(filePath), charset)) {
            String line;
            while ((line = reader.readLine()) != null) {
				/* line: linea del file che ho letto.*/
                newFileContent += processLine(line, termList);
                newFileContent += "\n";
            }
            reader.close();
        } catch (Exception e) {
            System.out.println(e.toString());
        }
        System.out.println("Fine caricamento file");
        //newFileContent è una stringa che rappresenta il nuovo file.
        //Stando a stackoverflow e ai 60 tizi che hanno vato la risposta una stringa può contenere più di un miliardo di caratteri

        try (BufferedWriter writer = Files.newBufferedWriter(Paths.get(filePath), charset)) {
            writer.write(newFileContent);
            writer.flush();
            writer.close();
        } catch (IOException e) {
            System.out.println(e.toString());
        }
        System.out.println("Fine salvataggio file");

    }


    private static String processLine(String line, List<String> termList){
        //non posso splittare sugli spazi perché le parole separate mi mandano in malora tutto


        //tolgo eventuali GLOSSARY_MARK
        line = removeMarkFromLine(line);
        //Aggiungo i Mark su ogni keyword, possono essercene di superflui
        line = addMarkOnLine(line, termList);


        //Toglie i mark per keyword doppie es: W3C / W3C Recomandation

        for (String keyword: termList){
            if (line.contains("banner")){
                int x = 10;
            }
            String[] keywordComponents = keyword.toLowerCase().split(" ");
            if (keywordComponents.length>1 && keywordConflict(keyword, termList)){
                //keyword composta
                String troubleMaker = makeBadKeyword(keyword,termList);

                if (line.toLowerCase().contains(troubleMaker.toLowerCase())) {

                    String lowercaseLine = line.toLowerCase();
                    int countDeMarked = 0; //numero di termini marcati
                    int removedChar = 0; //numero di caratteri rimossi da lowercaseLine

                    for (int i = 0; i < keywordComponents.length - 1; i++) {
                        String comp = keywordComponents[i];
                        while (containsWord(lowercaseLine, comp)) {
                            int matchStart = lowercaseLine.indexOf(comp);
                            int afterMatch = matchStart + comp.length();
                            String remainLowercaseLine = lowercaseLine.substring(afterMatch); /*remainLowercaseLine è la parte di line che "avanza" dopo il match della keyword*/


                            if (remainLowercaseLine.indexOf(GLOSSARY_MARK_REPLACE.toLowerCase()) == 0) { //Se dopo il componente della keyword c'è il simbolo del glossario, lo tolgo
                                int projAfterMatch = removedChar - (GLOSSARY_MARK_REPLACE.length() * countDeMarked) + afterMatch;

                                line = line.substring(0, projAfterMatch) + line.substring(projAfterMatch + GLOSSARY_MARK_REPLACE.length());
                                countDeMarked++;
                            }
                            removedChar += afterMatch;
                            lowercaseLine = remainLowercaseLine;
                        }
                    }
                }
            }
        }


        // Toglie i mark dai comandi

        /* Il Mark può essere stato messo anche dentro i comandi latex in cui non può andare.
        * cerco quindi se c'è uno di questi comandi e nel caso gli tolgo il mark*/

        for (int i=0; i <IGNORE_COMMANDS.length; i++){
            /*Il comando è un comando del tipo \section{...}*/
            String patternStr = "(\\\\+)"+IGNORE_COMMANDS[i]+"(\\{)(.*)(\\})";
            Pattern pattern = Pattern.compile(patternStr);
            Matcher matcher = pattern.matcher(line);
            if (matcher.find()){
                String commandText = matcher.group(3);
                line = line.replace(commandText, removeMarkFromLine(commandText));
            }else{
                /*Il comando è del tipo \includegraphics[...]{...}*/
                patternStr = "(\\\\)"+IGNORE_COMMANDS[i]+"(\\[)(.*)(\\])(\\{)(.*)(\\})";
                pattern = Pattern.compile(patternStr);
                matcher = pattern.matcher(line);
                if (matcher.find()){
                    String commandOption = matcher.group(3);
                    line = line.replace(commandOption, removeMarkFromLine(commandOption));
                    String commandText = matcher.group(6);
                    line = line.replace(commandText, removeMarkFromLine(commandText));
                }else {
                    /*Il comando è del tipo \normeDiProgetto, prende il nome di tutti i comandi LaTeX*/
                    patternStr = "(\\\\+)"+IGNORE_COMMANDS[i]+"\\b";
                    pattern = Pattern.compile(patternStr);
                    matcher = pattern.matcher(line);
                    if (matcher.find()){
                        String commandName = IGNORE_COMMANDS[i];
                        line = line.replace(commandName, removeMarkFromLine(commandName));
                    }
                }
            }
        }

        return line;
    }

    private static String makeBadKeyword(String keyword, List<String> keywordList){
        return addMarkOnLine(keyword,keywordList);
    }

    private static boolean containsWord(String line, String word){
        String patternStr = "(\\b)("+Pattern.quote(word)+")(\\b)";
        Pattern pattern = Pattern.compile(patternStr);
        Matcher matcher = pattern.matcher(line);
        return matcher.find();
    }

    private static boolean keywordConflict(String keyword, List<String> keywordList){
        boolean conflict = false;
        int i = 0;
        while (!conflict && i < keywordList.size()){
            conflict = containsWord(keyword, keywordList.get(i));
            i++;
        }
        return conflict;
    }

    private static String removeMarkFromLine(String line){
        //String patternStr = "([a-zA-Z_0-9]*)\\\\ped\\{G\\}";//+Pattern.quote(GLOSSARY_MARK); //Pattern da trovare

        String patternStr = "([a-zA-Z_0-9]*)\\\\ped\\{G\\}";
        Pattern pattern = Pattern.compile(patternStr);
        Matcher matcher = pattern.matcher(line);
        while(matcher.find()){
            //matcher.start();indice di inizio del match
            Character lastMarkChar = GLOSSARY_MARK.charAt(GLOSSARY_MARK.length()-1);
            System.out.println(matcher.group(1));
            String word = matcher.group(1);
            String wordToReplace =word+GLOSSARY_MARK_REPLACE;
            line = line.replace(wordToReplace, word);

        }
        return line;
    }


    private static String addMarkOnLine(String line, List<String> termList){
        if (line.contains("banner")){
            line=line;
        }
        for(String s: termList){
            //Ragioniamo su stringhe lowercase
            String lowercaseLine = line.toLowerCase();
            String lowercaseTerm = s.toLowerCase();
            int countMarked = 0; //numero di termini marcati
            int removedChar = 0; //numero di caratteri rimossi da lowercaseLine

            //while (lowercaseLine.contains(lowercaseTerm)){ DA PROBLEMI CON PAROLE TIPO "HOSTING" CHE MATCHA ANCHE "HOST".
            while (containsWord(lowercaseLine,lowercaseTerm)){
                /*Questo while viene fatto per ogni termine*/
                //cerco il primo match
                int matchStart = lowercaseLine.indexOf(lowercaseTerm); /* Indice di dove inizia il primo match della keyword*/
                int afterMatch = matchStart + lowercaseTerm.length(); /* Indice del primo carattere che non appartiene alla keyword*/
                String remainLowercaseLine = lowercaseLine.substring(afterMatch); /*remainLowercaseLine è la parte di line che "avanza" dopo il match della keyword*/
                System.out.println(lowercaseTerm);
                System.out.println(lowercaseLine);
                /* Se la parte che avanza dopo la keyword inizia con il mark del glossario vuol dire che il termine è già stato marcato*/
                if (remainLowercaseLine.indexOf(GLOSSARY_MARK_REPLACE.toLowerCase()) != 0){
                    /*remainLowercaseLine è il resto della linea lowercase dopo il termine che matcha
                    * se subito dopo il pezzo che devo marcare c'è già un marchio lo skippo (cioè quando l'espressione valuta false)*/

                    /*Problema: Alla seconda itererazione gli indici relativi al resto della frase sono diversi perché la frase originale viene
                    * modificata durante l'esecuzione, devo quindi calcolarmi una proiezione*/

                    /* projAfterMatch è la proiezione dell'indice afterMatch nella linea vera
                    * removedChar: caratteri della linea originale già elaborati
                    * GLOSSARY_MARK_REPLACE.length(): lunghezza del mark
                    * countMarked: numero di mark fin'ora inseriti nella linea
                    * afterMatch: indice del primo carattere dopo il match*/

                    int projAfterMatch = removedChar + (GLOSSARY_MARK_REPLACE.length() * countMarked) + afterMatch;
                    line = line.substring(0, projAfterMatch) + GLOSSARY_MARK_REPLACE + line.substring(projAfterMatch);


                    countMarked++;
                    //avanzo con la lettura di lowercaseLine

                }
                removedChar += afterMatch;
                lowercaseLine = remainLowercaseLine;
            }



        }
        return line;
    }

    // HTTP GET request
    private static List<String> getTermList(String fromURL) throws Exception {

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
