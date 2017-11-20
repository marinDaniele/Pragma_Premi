package script;


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

public class Gulpy {

    static List<String> IGNORE_COMMANDS = new ArrayList<>();
    static Map<String, String> CUSTOM_COMMANDS = new HashMap<>();
    static List<String> IGNORE_ENV = new ArrayList<>();

    static File workingDirectory;
    static boolean skippableArea = false;
    static String currentEnv = "document";

    static {
        IGNORE_ENV.add("table");
        IGNORE_ENV.add("tabular");
        IGNORE_ENV.add("figure");

        IGNORE_COMMANDS.add("newcommand");
        IGNORE_COMMANDS.add("item");
        IGNORE_COMMANDS.add("caption");
        IGNORE_COMMANDS.add("ref");
        IGNORE_COMMANDS.add("label");
        IGNORE_COMMANDS.add("includegraphics");
        IGNORE_COMMANDS.add("centering");
        IGNORE_COMMANDS.add("begin");
        IGNORE_COMMANDS.add("end");
        IGNORE_COMMANDS.add("url");
        IGNORE_COMMANDS.add("section");
        IGNORE_COMMANDS.add("subsection");
        IGNORE_COMMANDS.add("subsubsection");
        IGNORE_COMMANDS.add("subsubsubsection");

        CUSTOM_COMMANDS.put("RR","Revisione dei requisiti");
        CUSTOM_COMMANDS.put("RP","Revisione di progettazione");
        CUSTOM_COMMANDS.put("RQ","Revisione di qualifica");
        CUSTOM_COMMANDS.put("RA","Revisione di accettazione");


        CUSTOM_COMMANDS.put("fA","Analisi");
        CUSTOM_COMMANDS.put("fAD","Analisi di dettaglio");
        CUSTOM_COMMANDS.put("fPA","progettazione architetturale");
        CUSTOM_COMMANDS.put("fPD","progettazione di dettaglio");
        CUSTOM_COMMANDS.put("fC","codifica");
        CUSTOM_COMMANDS.put("fVV","verifica e validazione");

        CUSTOM_COMMANDS.put("rRP","Responsabile di progetto");
        CUSTOM_COMMANDS.put("rAP","Amministratore di progetto");
        CUSTOM_COMMANDS.put("rA","Analista");
        CUSTOM_COMMANDS.put("rP","Progettista");
        CUSTOM_COMMANDS.put("rp","Programmatore");
        CUSTOM_COMMANDS.put("rV","Verificatore");

        CUSTOM_COMMANDS.put("rRPs","Responsabile di progetto");
        CUSTOM_COMMANDS.put("rAPs","Amministratore di progetto");
        CUSTOM_COMMANDS.put("rAs","Analista");
        CUSTOM_COMMANDS.put("rPs","Progettista");
        CUSTOM_COMMANDS.put("rps","Programmatore");
        CUSTOM_COMMANDS.put("rVs","Verificatore");

        CUSTOM_COMMANDS.put("rRPt","Responsabile di progetto");
        CUSTOM_COMMANDS.put("rAPt","Amministratore di progetto");
        CUSTOM_COMMANDS.put("rAt","Analista");
        CUSTOM_COMMANDS.put("rPt","Progettista");
        CUSTOM_COMMANDS.put("rpt","Programmatore");
        CUSTOM_COMMANDS.put("rVt","Verificatore");

        CUSTOM_COMMANDS.put("scopoProdotto","Lo scopo del prodotto è quello di fornire all'utente la possibilità di creare una mappa mentale e di poterla usare per costruire dei percorsi di visualizzazione dei nodi della mappa. \\\\\n" +
                "Il prodotto dovrà funzionare sul browser del computer dell'utente, mentre le presentazioni create potranno essere visualizzate anche su dispositivi mobile quali smartphone e tablet.");
        CUSTOM_COMMANDS.put("descrizioneGlossario","Al fine di evitare ogni ambiguità di linguaggio e massimizzare la comprensione dei" +
                "documenti, i termini tecnici, di dominio, gli acronimi e le parole che necessitano di" +
                "essere chiarite, sono riportate nel documento glossario vx,y,z." +
                "Ogni occorrenza di vocaboli presenti nel Glossario è marcata da una ``G'' maiuscola in" +
                "pedice.");

        CUSTOM_COMMANDS.put("analisiDeiRequisiti","Analisi dei requisiti vx,y,z");
        CUSTOM_COMMANDS.put("glossario","Glossario vx,y,z");
        CUSTOM_COMMANDS.put("normeDiProgetto","Norme di progetto vx,y,z");
        CUSTOM_COMMANDS.put("pianoDiProgetto","Piano di progetto vx,y,z");
        CUSTOM_COMMANDS.put("pianoDiQualifica","piano di qualifica vx,y,z");
        CUSTOM_COMMANDS.put("studioDiFattibilita","studio di fattibilità vx,y,z");
        CUSTOM_COMMANDS.put("specificaTecnica","specifica tecnica vx,y,z");
        CUSTOM_COMMANDS.put("manualeUtente","manuale utente vx,y,z");
        CUSTOM_COMMANDS.put("definizioneDiProdotto","definizione di prodotto vx,y,z");

        CUSTOM_COMMANDS.put("AR","Analisi dei requisiti");
        CUSTOM_COMMANDS.put("G","Glossario");
        CUSTOM_COMMANDS.put("NP","Norme di progetto");
        CUSTOM_COMMANDS.put("PP","Piano di progetto");
        CUSTOM_COMMANDS.put("PQ","piano di qualifica");
        CUSTOM_COMMANDS.put("SF","studio di fattibilità");
        CUSTOM_COMMANDS.put("ST","specifica tecnica");
        CUSTOM_COMMANDS.put("MU","manuale utente");
        CUSTOM_COMMANDS.put("DP","definizione di prodotto");

        CUSTOM_COMMANDS.put("proponente","Zucchetti S,p,A");
        CUSTOM_COMMANDS.put("referenteProponente","Gregorio Piccoli");
        CUSTOM_COMMANDS.put("committente","Prof, Vardanega Tullio");
        CUSTOM_COMMANDS.put("committenteAlt","Prof, Cardin Riccardo");
        CUSTOM_COMMANDS.put("gruppo","Pragma");
        CUSTOM_COMMANDS.put("progetto","Premi");
        CUSTOM_COMMANDS.put("groupmail","pragma,swe@gmail,com");

        CUSTOM_COMMANDS.put("ao","Andrea Ongaro");
        CUSTOM_COMMANDS.put("dm","Daniele Marin");
        CUSTOM_COMMANDS.put("fv","Fabio Vedovato");
        CUSTOM_COMMANDS.put("gma","Giacomo Manzoli");
        CUSTOM_COMMANDS.put("gmi","Gianmarco Midena");
        CUSTOM_COMMANDS.put("mb","Massimiliano Baruffato");
        CUSTOM_COMMANDS.put("sm","Stefano Munari");


    }

    public static void main(String[] args) {
        if (IGNORE_COMMANDS.size()==0) return;


        if (args.length == 0){
            System.out.println("Nessun file selezionato");
            return;
        }
	    String filePath = args[0];
        File file = new File(filePath);
        workingDirectory = file.getParentFile();
        if (!workingDirectory.isDirectory()){
            System.err.println("Non ho una working directory");
        }


        String parsedFile = parseFile(file);

        //System.out.println(parsedFile);

        //parsedFile contiene automagicamente il plain text pronto per calcolare gulpease.

        double g = gulpease(parsedFile);

        System.out.println("Gulpease: "+g);

        String outputPath = filePath+".txt";
        Charset charset = StandardCharsets.UTF_8;
        System.out.println("File parsato salvato nel percorso: "+outputPath);
        try (BufferedWriter writer = Files.newBufferedWriter(Paths.get(outputPath), charset)) {
            writer.write(parsedFile);
            writer.flush();
            writer.close();
        } catch (IOException e) {
            System.out.println(e.toString());
        }
        System.out.println("Fine salvataggio file");

    }

    public static double gulpease(String text){
        //89 + 300 * numero frasi - 10 * numero lettere / numero parole

        //[\wèéàòùì] pattern per cifre e lettere
        //[^\w^è^é^à^ò^ù^ì\n] matcha tutto quello che non è una cifra o lettera
        double charCount;
        double wordCount = 0;

        String patternStr = "[a-zA-Zòàùèéì,']+";
        Pattern pattern = Pattern.compile(patternStr);
        Matcher matcher = pattern.matcher(text);
        String words = "";
        while(matcher.find()) {wordCount++; words += matcher.group();}
        charCount=words.length();

        String newText = text.replaceAll("\\.","\n");
        newText = newText.replaceAll(";","\n");
        newText = newText.replaceAll("\n\n", "\n");
        String[] lines = newText.split("\n");
        int sentenceCount = lines.length;


        //newText = text.replaceAll("\\.","\n");

        lines = text.split("\\.");
        int alternativeSentenceCount = lines.length;


        System.out.println("Frasi, considerando solo il . come terminatore: "+ alternativeSentenceCount);
        System.out.println("Frasi, contando come terminatori di frase \\n, '.' e ';': " + sentenceCount);
        System.out.println("Parole:" +wordCount);
        System.out.println("Caratteri:" +charCount);


        double someMagic = 300*sentenceCount - 10 * charCount;
        double moreMagic = 89 + someMagic/wordCount; //Gulpease con il ;

        double evilMagic = 300*alternativeSentenceCount - 10*charCount;
        double evenMoreMagic = 89 + evilMagic/wordCount;


        System.out.println("Gulpease pessimistico (usando solo il . come terminatore) "+ evenMoreMagic);



        return moreMagic; //Ritorna il gulpease ottimistico
    }



    /* Metodi del parser*/

    /* Carica tutto il file .tex, comprese le parti incluse */
    public static String parseFile(File file){
        String filePath = file.getPath();

        String result="";
        Charset charset = StandardCharsets.UTF_8;

        try (BufferedReader reader = Files.newBufferedReader(Paths.get(filePath), charset)) {
            String line;
            while ((line = reader.readLine()) != null) {

                //line è una riga del file che ho letto
                if (line.equals("")) continue;

                //Analizzo tutti i comandi presenti nella linea


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
                    String commandResult = executeCommand(matcher.group(2), matcher.group(4) + "\n" + matcher.group(7), "");

                    line = line.replace(fullCommand, commandResult);
                }
                if (line.equals("")) continue;
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

                if (line.equals("") || skippableArea) continue;
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

                if (line.equals("")) continue;
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

                if (line.equals("")) continue;
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

                if (line.equals("")) continue;

                line = line.replaceAll("\\\\","");
                line = line.trim();
                if (!line.equals("")){
                    result += line.trim()+"\n";
                }
            } // Fine while

            reader.close();
        } catch (Exception e) {
            System.out.println(e.toString());
        }
        return result;
    }



    public static String executeCommand(String commandName, String commandParams, String commandOptions){
        if (commandName.equals("")) return ""; //Nessun comando
        //Se è una macro la calcolo
        if (CUSTOM_COMMANDS.get(commandName) != null) {
            return CUSTOM_COMMANDS.get(commandName);
        }
        //Se ho un comando del tipo \item e non è una macro ritorno, "" e ciao!
        if ( !commandName.equals("") && !commandOptions.equals("") && commandParams.equals("")) return "";

        if (!commandParams.equals("")){
            /*Il comando ha dei parametri*/

            if (commandName.equals("input")){
                //commandParams contiene il percorso relativo del file da includere.
                String filePath = workingDirectory.getPath() + "/" + commandParams;
                if (commandParams.startsWith("..")) return ""; //Sono gli include del template
                System.out.println("Includo il file: "+filePath);
                return parseFile(new File(filePath));
            }

            /*Begin di un Enviroment da skippare*/
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

            if (IGNORE_COMMANDS.contains(commandName)) return "";
            return commandParams;
        }

        return "";
    }
}
