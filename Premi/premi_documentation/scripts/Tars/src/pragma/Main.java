/**
 * Created by giacomomanzoli on 19/02/15.
 */
package pragma;
import pragma.data.*;

import java.io.File;
import java.util.ArrayList;

/* Futuro Giacomo che dovrai andare a sistemare questo programma.
* Ricordati che:
*   - Compiler prende del codice latex e lo trasforma in testo
*   - Il testo di Compiler serve per calcolare il Gulpease
*   - Walker modifica i file latex, dentro al metodo parseLine() puoi andare ad aggiungere nuove modifice
*
* Ora come ora non mi viene in mente altro. In ogni caso saranno tante madonne.
* */


public class Main {
    public static void main(String[] args){
        if (args.length == 0 ) return;

        System.out.println("--- TARS ---");
        /*TODO:
        * - Aggiungere supporto \'E a Compiler
        * */

        //get the file
        String filePath = args[0];
        File currentFile = new File(filePath);


        /*Calcolo il gulpease*/
        Compiler compiler = new Compiler(Commands.IGNORE_COMMANDS,Commands.CUSTOM_COMMANDS, Commands.IGNORE_ENV);
        String parsedFile = compiler.compileFile(currentFile);
        Gulpy gulpy = new Gulpy(40,50);
        double gulpease = gulpy.gulpease(parsedFile);

        /*Creo un file con il testo parsato, debug purpose*/
        HTMLReport parsed = new HTMLReport(currentFile,new ArrayList<DocumentReport>());
        parsed.addComponent(parsedFile);
        parsed.save(currentFile.getParent()+"/parsed.txt");

        /* Scarico le keyword*/
        Downloader d = new Downloader();
        Keywords keys = d.downloadGlossaryKeywords();

        /* Edit del codice LaTeX */
        Walker walker = new Walker(keys);
        HTMLReport report = walker.texasRanger(currentFile);

        /* Report delle modifiche */
        report.addComponent(gulpy.htmlForGulpease(gulpease));
        String htmlOutputPath = currentFile.getParent()+"/report.html";
        report.save(htmlOutputPath);


        System.out.println("Elaborazione completata, creato file di report: "+htmlOutputPath);
    }
}
