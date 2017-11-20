package pragma;
import pragma.data.*;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Created by giacomomanzoli on 19/02/15.
 * Contiene i metodi per marcare le linee in LaTeX
 */
public class Gloxy {
    private Keywords keys;

    public Gloxy(Keywords keys){
        this.keys = keys;
    }


    public String markLineSkippingCommand(String line, List<String> commands){
        List<String> recovery = new ArrayList<String>(); /*Contiene i comandi da ignorare*/

        /*TODO trovare una soluzione migliore*/
        commands.add("gloxy");
        commands.add("nogloxy");

        for (int i=0; i <commands.size(); i++){
            String patternStr = "(\\\\+)"+commands.get(i)+"(\\[.*?\\])?(\\{)(.*)(\\})";
            Pattern pattern = Pattern.compile(patternStr);
            Matcher matcher = pattern.matcher(line);
            if (matcher.find()){
                /* Ho trovato un comando da ignorare, mi salvo il vecchio contenuto*/
                recovery.add(matcher.group());
                line = line.replace(matcher.group(),"#%#%"+(recovery.size()-1));
            }
        }
        /*Ho il testo originale dei comandi dentro la lista recovery.
        * Metto i mark su tutta la linea*/

        try {
            line = markLine(line);
        }catch (Exception e){
            System.err.println(e.getMessage());
            System.err.println(line);
        }
        /* Ripristino i comandi originali, sfruttando i vari recoveryMark lasciati nella linea.*/
        for (int i = 0; i < recovery.size(); i++) {
            line = line.replace("#%#%"+i, recovery.get(i));
        }
        return line;
    }

    private boolean bruttaPezza(String w){
        /*Questa brutta pezza serve perché lo stronzo di Java da qualche problema con qualche Hyperref e per quale cacchio di motivo
        * il pattern non matcha.
        * Resta da capire perché su 95 \hyperref presenti su useCase.txt ce ne sono 15 che sollevano un eccezione e gli altri no.
        * #MisteroDellaFede #MosconiTime*/
        if (w.contains("hyperref"))
            return false;
        else
            return true;

    }

    public String markLine(String line){
        String result = "";
        String[] words = line.split(" ");
        String w;

        for (int i = 0; i < words.length; i++) {

            w = words[i];//parola corrente

            if (!w.contains("#%#%") && bruttaPezza(w)) {
                /*Se non è un segnaposto analizzo la parola*/
                //Controllo se w termina con della punteggiatura
                String preamble = getPreamble(w);
                w = w.substring(preamble.length());

                String trail = getTrail(w);

                String clearW = w.substring(0, w.length() - trail.length());
                //clearW = clearW.substring(preamble.length());

                if (keys.isComponent(clearW) && trail.equals("")) {
                /*La parola corrente è un pezzo di keyword.*/
                /*E il componente iniziale non ha un trail*/

                    if (i < words.length - 1) {
                    /* La parola corrente non è l'utlima parola*/
                        String partial = clearW;
                        String fullPartial = clearW;
                        String nextW;
                        String nextPreamble;
                        String nextTrail = "";
                        boolean end = false;
                        int j = i + 1;
                        do {
                        /*Controllo se c'è un'altra parola*/
                            if (j < words.length) {
                            /*Controllo se la prossima parola è ancora parte di una keyword*/

                                nextW = words[j];//parola corrente

                                //Controllo se w termina con della punteggiatura
                                String oldTrail = nextTrail; //Salvo la trail dell'ultimo parziale


                                nextPreamble = getPreamble(nextW);
                                String nextClearW = nextW.substring(0, nextW.length() - nextTrail.length());
                                nextTrail = getTrail(nextClearW);
                                nextClearW = nextClearW.substring(nextPreamble.length());

                                String nextPartial = partial + " " + nextClearW;
                                if (keys.isComponent(nextPartial)) {
                                /* Se è ancora un componente, aggiorno partial*/
                                    partial = nextPartial;
                                    fullPartial += " " + nextPreamble + nextClearW; /* Non aggiungo l'ultimo trail, va messo dopoo aver marcato la frase*/
                                    j++;
                                } else {
                                /* Se la prossima parola non fa parte della keyword termino.
                                *
                                * nextTrail in questo caso è dato dal trail della prossima parola che non appartiene alla keyword.
                                * Devo quindi ripristinare oldTrail
                                * */
                                    nextTrail = oldTrail;
                                    end = true;
                                }
                            } else {
                            /*Se non c'è nessun'altra parola ho finito*/
                                end = true;
                            }
                        } while (keys.isComponent(partial) && !end);
                    /* controllo se partial è una keyword vera e propria.*/
                        if (keys.isKeyword(partial)) {
                            i += j - 1 - i; /*Porto avanti il contatore*/
                            if (!preamble.contains("gloxy")) {
                                clearW = markWord(fullPartial) + nextTrail; /* Evidenzio il termine*/
                            } else {
                                clearW = fullPartial + nextTrail;
                            }
                        }
                    }
                } //Fine caccia ai componenti.
                if (keys.isKeyword(clearW) && !preamble.contains("gloxy")) {
                /*Se non è gia marcato (il primo preambolo non contiene "gloxy")
                * Funziona anche nel caso di nogloxy*/
                    clearW = markWord(clearW);
                }
                result += preamble + clearW + trail + " ";
            } else {
                result += w + " ";
            }
        }

        return result.trim();
    }


    private String getPreamble(String w){
        /*Esempi di valori di w
        * Drive.
        * \gloxy{Google
        * Drive}
        * \gloxy{Drive}
        * \command{a}{b}
        * */
        String preamble = "";
        if (w.contains("{")){
            /* Casi:
            *   \gloxy{Drive
            *   \gloxy{Drive{
            *   \gloxy{Drive}
            * */
            int splitIndex = w.indexOf("{")+1;
            preamble += w.substring(0,splitIndex);
            w = w.substring(splitIndex);
        }
        if (w.contains("\"")){ //Doppi apici "
            int splitIndex = w.indexOf("\"")+1;
            preamble += w.substring(0,splitIndex);
            w = w.substring(splitIndex);
        }
        if (w.contains("''")){//Due volte singoli apici ''
            int splitIndex = w.indexOf("''")+1;
            preamble += w.substring(0,splitIndex);
            w = w.substring(splitIndex);
        }
        return preamble;
    }

    private String getTrail(String w){
        /*Esempi di valori di w
        * Drive.
        * \gloxy{Google
        * Drive}
        * \gloxy{Drive}
        * \command{a}{b}
        * */
        String trail="";

        int index = w.length()+1;

        int lastIndex = w.indexOf("''");
        if (index > lastIndex && lastIndex!=-1) index = lastIndex;
        lastIndex = w.indexOf("\"");
        if (index > lastIndex && lastIndex!=-1) index = lastIndex;
        lastIndex = w.indexOf(".");
        if (index > lastIndex && lastIndex!=-1) index = lastIndex;
        lastIndex = w.indexOf(",");
        if (index > lastIndex && lastIndex!=-1) index = lastIndex;
        lastIndex = w.indexOf(";");
        if (index > lastIndex && lastIndex!=-1) index = lastIndex;
        lastIndex = w.indexOf(":");
        if (index > lastIndex && lastIndex!=-1) index = lastIndex;
        lastIndex = w.indexOf("}");
        if (index > lastIndex && lastIndex!=-1) index = lastIndex;

        if (index < w.length()) {
            trail += w.substring(index);
            w = w.substring(0, index);
        }
        return trail;
    }
    private String markWord(String word){
        return "\\gloxy{" + word + "}";
    }

}
