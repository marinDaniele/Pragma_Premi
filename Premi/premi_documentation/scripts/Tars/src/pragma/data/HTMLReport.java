package pragma.data;

import java.io.BufferedWriter;
import java.io.File;
import java.io.IOException;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by giacomomanzoli on 21/02/15.
 */
public class HTMLReport {


    List<DocumentReport> reports;
    List<String> htmlComponents = new ArrayList<>();
    File file;
    public HTMLReport(File file,List<DocumentReport> rs){
        reports = rs;
        this.file = file;
    }

    public void addComponent(String html){
        htmlComponents.add(html);
    }

    public String getHTML(){
        String name = file.getName();
        String start = "<html><head>" +
                "<meta charset=\"utf-8\">" +
                "<title>"+name+"</title>" +
                "<style>"+getCSS()+"</style>" +
                "</head>" +
                "<body>";
        String end = "</body></html>";

        String content = "";
        for(DocumentReport r: reports){
            if (!r.isEmpty())
                content += r.getDocumentReport();
        }
        return start + preamble() + content + end;
    }


    private String preamble(){
        String title = "<h1>Report: "+file.getName()+"</h1>";

        String components = "";
        for (String s: htmlComponents){
            components += s + "\n";
        }

        return title + components + getIndex();
    }

    private String getIndex(){

        String index = "<p><strong>Indice modifiche</strong></p>\n<ul>\n";
        for (DocumentReport r: reports){
            if (!r.isEmpty())
                index+="<li><a href=\"#"+r.getDocumentName()+"\">"+r.getDocumentName()+"</a></li>\n";
        }
        index +="</ul>";
        return index;
    }

    public void save(String path){
        Charset charset = StandardCharsets.UTF_8;
        System.out.println("Inizio a scrivere il file sul percorso: "+path);
        try (BufferedWriter writer = Files.newBufferedWriter(Paths.get(path), charset)) {
            writer.write(getHTML());
            writer.flush();
            writer.close();
        } catch (IOException e) {
            System.out.println(e.toString());
        }
        System.out.println("Fine salvataggio file");
    }



    private String getCSS(){
        return "body{\n" +
                "\tfont-family: sans-serif;\n" +
                "\twidth: 80%;\n" +
                "\tmargin: 0 auto;\n" +
                "}\n" +
                "h2.documentName{\n" +
                "\tdisplay: inline;\n" +
                "}\n" +
                "h3.documentPath{\n" +
                "\tdisplay: inline;\n" +
                "}\n" +
                "p.number{\n" +
                "\tmargin: 0;\n" +
                "\tfont-weight: bold;\n" +
                "\tdisplay: inline-block;\n" +
                "\twidth: 5%;\n" +
                "\ttext-align: right;\n" +
                "}\n" +
                "div.changeLog{\n" +
                "\tdisplay: inline-block;\n" +
                "\twidth: 95%;\n" +
                "}\n" +
                "p.oldLine{\n" +
                "\tbackground-color: lightcoral;\n" +
                "\tpadding: .5em;\n" +
                "\tmargin: 0;\n" +
                "}\n" +
                "p.newLine{\n" +
                "\tbackground-color: darkseagreen;\n" +
                "\tpadding: .5em;\n" +
                "\tmargin: 0;\n" +
                "}\n" +
                "ul.listaModifiche{\n" +
                "\tlist-style-type: none;\n" +
                "\tmargin: 1em 0;\n" +
                "\tpadding: 0;\n" +
                "}\n" +
                ".listaModifiche li{\n" +
                "\tmargin: .5em 0;\n" +
                "}\n" +
                "\n";
    }
}
