package pragma.data;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by giacomomanzoli on 21/02/15.
 */
public class DocumentReport {
    File file;
    List<Line> lines = new ArrayList<>();

    public DocumentReport(File f){
        file = f;
    }

    public void addLine(Line l){ lines.add(l);}

    public boolean isEmpty(){ return lines.size() == 0;}

    public String getDocumentName(){
        return file.getName().replace(".tex","");
    }


    public String getDocumentReport(){
        String result="";
        String documentName = "<h2 id=\""+getDocumentName()+"\" class=\"documentName\">"+file.getName()+"</h2>";
        String documentPath = "<h3 class=\"documentPath\">"+file.getPath()+"</h3>";

        result += documentName +"\n" + documentPath + "\n";
        result += "<ul class=\"listaModifiche\">";
        for (Line l: lines){
            String number = "<p class=\"number\">"+l.getLineNumber()+"</p>";
            String old = "<p class=\"oldLine\">"+l.getOriginal()+"</p>";
            String current = "<p class=\"newLine\">"+l.getCurrent()+"</p>";
            result += "<li>"+number+"<div class=\"changeLog\">"+old+current+"</div>"+"</li>"+"\n";
        }
        result += "</ul>";

        return  result;
    }
}
