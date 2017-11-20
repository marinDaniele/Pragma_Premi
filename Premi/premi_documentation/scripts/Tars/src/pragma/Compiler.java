package pragma;

import java.io.*;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.*;

import java.nio.file.Paths;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.regex.PatternSyntaxException;

/**
 * Created by giacomomanzoli on 19/02/15.
 * Dato un file LaTeX lo trasforma in plain text, ignorando i vari comandi
 */
public class Compiler {
    List<String> IGNORE_COMMANDS; /*Comandi da ignorare totalmente*/
    Map<String, String> CUSTOM_COMMANDS; /*Comandi personalizzati, da sostituire con il testo*/
    List<String> IGNORE_ENV; /*Ambienti LaTeX da ignorare*/

    File workingDirectory; /*Directory in cui sto lavorando*/
    boolean skippableArea = false; /*Flag che sengala se sono in un'area da saltare*/
    String currentEnv = "document"; /*Ambiente di lavoro corrente*/


    public Compiler(List<String> ic, Map<String,String> cc, List<String> ie){
       IGNORE_COMMANDS = ic;
       CUSTOM_COMMANDS = cc;
       IGNORE_ENV = ie;
    }

    public String compileFile(File file){
        workingDirectory = file.getParentFile();
        return parseFile(file);
    }


    private String parseFile(File file){

        String filePath = file.getPath();

        String result="";
        Charset charset = StandardCharsets.UTF_8;

        try (BufferedReader reader = Files.newBufferedReader(Paths.get(filePath), charset)) {
            String line;
            while ((line = reader.readLine()) != null) {
                //line è una riga del file che ho letto
                if (line.equals("")) continue;

                String parsedLine = parseLine(line);
                if (!parsedLine.equals(""))
                    result += parsedLine + "\n";

            } // Fine while

            reader.close();
        } catch (Exception e) {
            System.out.println(e.toString());
        }
        return result;
    }

    /* Analizza una linea di codice LaTeX ed esegue i comandi presenti*/
    private String parseLine(String line){

        /* Controllo l'ambiente in cui sono e se sono in una tabella cancello le &*/
        if (currentEnv.equals("table") || currentEnv.equals("tabular") || currentEnv.equals("longtable")){
            line = line.replaceAll("&","");
        }

        //___________________________________________________________________________________________________________________________
        //Matcha tutti i comandi del tipo \command{}{}
        String patternStr = "(\\\\)(\\w+)(\\{)(.*?)(\\})(\\{)(.*)(\\})";
        Pattern pattern = Pattern.compile(patternStr);
        Matcher matcher = pattern.matcher(line);
        while (matcher.find()){
            // 2: nome del comando
            // 4: contenuto del { }
            // 7: secondo contenuto {}
            String fullCommand = matcher.group(1)+matcher.group(2)+matcher.group(3)+matcher.group(4)+matcher.group(5)+matcher.group(6)+matcher.group(7)+matcher.group(8);
            //BADPATCH
            String commandResult;
            if (matcher.group(4).equals("longtable")){
                commandResult = executeCommand(matcher.group(2), matcher.group(4),matcher.group(7));
            }else{
                commandResult = executeCommand(matcher.group(2), matcher.group(4) + "\n" + matcher.group(7), "");
            }

            line = line.replace(fullCommand, commandResult);
        }
        if (line.equals("")) return "";
        //___________________________________________________________________________________________________________________________
        //Matcha tutti i comandi del tipo \command{}
        patternStr = "(\\\\)(\\w+)(\\{)(.*?)(\\})";
        pattern = Pattern.compile(patternStr);
        matcher = pattern.matcher(line);
        while (matcher.find()){
            // 2: nome del comando
            // 4: contenuto del { }
            String fullCommand = matcher.group(1)+matcher.group(2)+matcher.group(3)+matcher.group(4)+matcher.group(5);
            String commandResult = executeCommand(matcher.group(2), matcher.group(4), "");

            if (!skippableArea){
                        /* skippableArea: indica che sono dentro un'ambiente Table, Tabular, Figure e le linee all'interno devono essere saltate
                        * Il valore di skippableArea viene modificato solo da executeCommand()*/
                line = line.replace(fullCommand, commandResult);
            } else{
                line = "";
            }
        }

        if (line.equals("") || skippableArea) return "";
        // (\\)(\w+)(\{)(.*?)(\})(\{.*\})

        //___________________________________________________________________________________________________________________________
        //Matcha tutti i comandi del tipo \includegraphics[]{}
        patternStr = "(\\\\)(\\w+)(\\[)(.*)(\\])(\\{)(.*?)(\\})";
        pattern = Pattern.compile(patternStr);
        matcher = pattern.matcher(line);
        while (matcher.find()){
            // 2: nome del comando
            // 4: opzioni
            // 7: contenuto
            String fullCommand = matcher.group(1)+matcher.group(2)+matcher.group(3)+matcher.group(4)+matcher.group(5)+matcher.group(6)+matcher.group(7)+matcher.group(8);
            String commandResult = executeCommand(matcher.group(2), matcher.group(7), matcher.group(4));

            line = line.replace(fullCommand, commandResult);
        }

        if (line.equals("")|| skippableArea) return "";
        //___________________________________________________________________________________________________________________________
        //Matcha tutti i comandi del tipo \item
        patternStr = "(\\\\+)(\\w+)";
        pattern = Pattern.compile(patternStr);
        matcher = pattern.matcher(line);

        while (matcher.find()){
            // 2: nome del comando
            String fullCommand = matcher.group(1)+matcher.group(2);
            String commandResult = executeCommand(matcher.group(2), "", "");

            line = line.replace(fullCommand, commandResult);
        }

        if (line.equals("")|| skippableArea) return "";
        //___________________________________________________________________________________________________________________________
        //Commenti
        patternStr = "(%)(.*)";
        pattern = Pattern.compile(patternStr);
        matcher = pattern.matcher(line);
        while (matcher.find()){
            // 1: %
            // 2: contenuto del commento
            String fullCommand = matcher.group(1)+matcher.group(2);
            String commandResult = "";

            line = line.replace(fullCommand, commandResult);
        }

        if (line.equals("")|| skippableArea) return "";

        //(\(?)(UC)([\d.]+)(\)?) Pattern per trovare gli uc
        //___________________________________________________________________________________________________________________________
        //Commenti
        patternStr = "(\\(?)(UC)([\\d.]+)(\\)?)";
        pattern = Pattern.compile(patternStr);
        matcher = pattern.matcher(line);
        while (matcher.find()){
            // 1: %
            // 2: contenuto del commento
            String fullCommand = matcher.group();
            String commandResult = "";

            line = line.replace(fullCommand, commandResult);
        }

        if (line.equals("")|| skippableArea) return "";

        line = line.replaceAll("\\\\","");
        line = line.trim();
        return line;
    }


    /* "Esegue" un comando LaTeX, trasforma il comando nel corrispondente testo*/
    private String executeCommand(String commandName, String commandParams, String commandOptions){
        if (commandName.equals("")) return ""; //Nessun comando


        //Se ho un comando del tipo \item e non è una macro ritorno, "" e ciao!
        if ( !commandName.equals("") && !commandOptions.equals("") && commandParams.equals("")) return "";

        if (!commandParams.equals("")){
            /*Il comando ha dei parametri*/
            /*Begin di un Enviroment da skippare*/

            /*Debug purpose*/
            if (commandParams.contains("longtable")){
                String x ="";
            }
            if (IGNORE_ENV.contains(commandParams) && commandName.equals("begin")){

                if (!skippableArea){
                    currentEnv = commandParams;
                }
                skippableArea = true;
                return "";
            }
            if (IGNORE_ENV.contains(commandParams) && commandName.equals("end")){
                if (skippableArea && currentEnv.equals(commandParams)){
                    skippableArea = false;
                    currentEnv = "document";
                }
                return "";
            }


            if (skippableArea) return "";

            if (commandName.equals("input")){
                //commandParams contiene il percorso relativo del file da includere.
                String filePath = workingDirectory.getPath() + "/" + commandParams;
                if (commandParams.startsWith("..")) return ""; //Sono gli include del template
                System.out.println("Includo il file: "+filePath);
                return parseFile(new File(filePath));
            }

            /* Parla glossariata, semplicemente toglo il mark*/
            if (commandName.equals("gloxy")){
                return commandParams;
            }
            //Se è una macro la calcolo
            if (CUSTOM_COMMANDS.get(commandName) != null) {
                return CUSTOM_COMMANDS.get(commandName);
            }


            if (IGNORE_COMMANDS.contains(commandName)) return "";
            return commandParams;
        }

        return "";
    }

}
