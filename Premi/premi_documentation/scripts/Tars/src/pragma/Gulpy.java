package pragma;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Created by giacomomanzoli on 22/02/15.
 */
public class Gulpy {
    double accettabile, ottimo;
    public Gulpy(double acc, double ott){
        accettabile=acc;
        ottimo = ott;
    }
    public double gulpease(String text){
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

    public String htmlForGulpease(double gIndex){
        String result= "<div class=\"gulpyBox\"><h2>Gulpease:</h2>";

        String color = "black"; //orange, green;
        if (gIndex >= accettabile) color = "orange";
        if (gIndex >= ottimo) color = "green";

        result += "<strong style=\"color:"+color+";\">"+gIndex+"</strong></div>";

        return result;
    }
}
