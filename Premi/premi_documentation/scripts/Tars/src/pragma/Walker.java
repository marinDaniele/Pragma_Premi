package pragma;
import pragma.data.*;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.IOException;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Created by giacomomanzoli on 21/02/15.
 * Dato un file .tex legge ogni riga, è ingrado di identificare e elaborare il comando \input.
 */
public class Walker {
    File workingDirectory; /*Directory in cui sto lavorando*/
    Gloxy gloxy;
    List<DocumentReport> reports;

    public Walker(Keywords keys){
        gloxy = new Gloxy(keys);
    }

    /*Parsa il file e crea un report completo a partire dai vari DocumentReport
    * Ogni file parsato vine modificato e le modifche vengono salvate*/
    public HTMLReport texasRanger(File file){
        reports = new ArrayList<>();
        workingDirectory = file.getParentFile();
        if (!workingDirectory.isDirectory()){
            System.err.println("Non ho una working directory");
        }
        DocumentReport r = parseFile(file);
        reports.add(0,r);

        return new HTMLReport(file,reports);
    }


    /* Prende un file .tex e lo analizza riga per riga, se fa delle modifiche crea un oggetto di tipo DocumentReport
    * questo oggetto contiene le informazioni sulle modifiche effettuate: linea originale, nuova linea e numero di linea,
    * in questo modo è possibile esportarle in HTML*/
    private DocumentReport parseFile(File file){
        String filePath = file.getPath();
        DocumentReport report = new DocumentReport(file); /* Report contenete le varie linee modificate*/
        int lineCount = 0;
        String result=""; /* Risultato dell'elaborazione del file, deve andare a sovrascrivere il vecchio testo.*/
        Charset charset = StandardCharsets.UTF_8;

        try (BufferedReader reader = Files.newBufferedReader(Paths.get(filePath), charset)) {
            String line;
            while ((line = reader.readLine()) != null) {
                lineCount++;
                //line è una riga del file che ho letto
                if (line.equals("")) continue;
                //\item L'utente può stampare un progetto esistente \hyperref[UC1.7]{(UC1.7)};
                //\item L'utente può chiudere il progetto corrente aperto \hyperref[UC1.8]{(UC1.8)};


                String lineResult = parseLine(line);

                if (!line.trim().equals(lineResult)){
                    /*Sono state fatte delle modifiche, creo una ReportLine*/
                    Line l = new Line(lineCount,line);
                    l.setCurrent(lineResult);
                    report.addLine(l);
                }

                result += lineResult + "\n";

            } // Fine while

            reader.close();
        } catch (Exception e) {
            System.out.println(e.toString());
        }

        //ho elaborato tutto il file.
        //Salvo il file e ritorno il report
        saveFile(file, result);
        return report;
    }

    /* Analizza una linea di un documento LaTeX, controlla se deve essere eseguito un include, glossaria i vari termini
    * ed è estendibile con nuove azioni e controlli.*/
    private String parseLine(String line){

        //Cerca se ci sono dei file da includere, se ci sono elabora prima quelli.
        String patternStr = "(\\\\)(\\w+)(\\{)(.*?)(\\})";
        Pattern pattern = Pattern.compile(patternStr);
        Matcher matcher = pattern.matcher(line);
        while (matcher.find()){
            // 2: nome del comando
            // 4: contenuto del { }
            String commandName = matcher.group(2); // deve essere include
            String commandParams = matcher.group(4); //Filepath
            if (commandName.equals("input")){
                File includedFile = loadFile(commandParams);
                if (includedFile != null) {
                    DocumentReport r = parseFile(includedFile);
                    reports.add(r);
                }
            }
        }
        /* Il programma ha elaborato i vari file inclusi, ora tocca a questa linea*/
        String newLine = gloxy.markLineSkippingCommand(line, Commands.IGNORE_COMMANDS);

        //Controlla accenti
        //Controlla elenchi

        return newLine;
    }

    /* Da un'instruzione \include{...} carica e analizza il relativo file, usa parseFile()*/
    private File loadFile(String relativePath){
        /*Il comando ha dei parametri*/
        if (relativePath.startsWith("..")) return null; //Sono gli include del template
        //commandParams contiene il percorso relativo del file da includere.
        String filePath = workingDirectory.getPath() + "/" + relativePath;

        System.out.println("Carico il file: "+filePath);

        return new File(filePath);
    }


    private void saveFile(File file, String content) {
        Charset charset = StandardCharsets.UTF_8;
        System.out.println("Inizio a scrivere il file sul percorso: "+file.getPath());
        try (BufferedWriter writer = Files.newBufferedWriter(Paths.get(file.getPath()), charset)) {
            writer.write(content);
            writer.flush();
            writer.close();
        } catch (IOException e) {
            System.out.println(e.toString());
        }
        System.out.println("Fine salvataggio file");
    }


}
