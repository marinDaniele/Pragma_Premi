package pragma.data;

/**
 * Created by giacomomanzoli on 21/02/15.
 * Coppia di stringhe: original e current. Contiene anche informazioni riguardo al numero di linea
 */
public class Line {
    private String original, current;
    private int lineNumber;
    public Line(int n,String line){
        original = line;
        lineNumber = n;
    }

    public int getLineNumber(){return lineNumber;}
    public String getOriginal(){ return original;}
    public String getCurrent(){ return current;}
    public void setCurrent(String s){ current=s; }

}
