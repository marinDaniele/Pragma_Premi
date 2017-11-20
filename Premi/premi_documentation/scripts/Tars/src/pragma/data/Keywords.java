package pragma.data;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by giacomomanzoli on 19/02/15.
 * L'idea è questa:
 * Mi tengo una Keyword list con le varie keyword corrette e una badList con le keyword che hanno delle keyword all'interno
 */
public class Keywords {


    List<String> lowerCaseKeyword; /*Contiene tutte le keyword in lowercase*/
    List<String> simpleKeywords; /*Contiene tutte le keyword di una parola sola*/
    List<String> componentsKeywords; /*Contiene tutte le parti di keyword, queste parti potrebbero essere a loro volta una keyword unica*/

    public Keywords(List<String> keys){
        lowerCaseKeyword= new ArrayList<String>();
        simpleKeywords = new ArrayList<String>();
        componentsKeywords = new ArrayList<String>();

        /*Popolo la goodList di keyword*/
        String newKey;
        for(String s: keys){
            newKey = s.trim();
            newKey = newKey.toLowerCase();
            if (newKey.contains("(")){
                newKey = newKey.substring(0,newKey.indexOf("(")-1);
                newKey = newKey.trim();
            }
            if (newKey.contains(" ")){
                String[] components = newKey.split(" ");
                for (String c: components){
                    componentsKeywords.add(c);
                }
                String partial =components[0];
                for (int i = 1; i < components.length; i++) {
                    partial+=" " + components[i];
                    componentsKeywords.add(partial);
                }

            }else{
                simpleKeywords.add(newKey);
            }
            lowerCaseKeyword.add(newKey);
        }



    }


    public boolean isComponent(String w){
        return componentsKeywords.contains(w.toLowerCase());
    }
    public boolean isKeyword(String w){ return lowerCaseKeyword.contains(w.toLowerCase());}
    public List<String> getKeywords(){
        return lowerCaseKeyword.subList(0,lowerCaseKeyword.size());
    }
    public List<String> getSimpleKeywords(){
        return simpleKeywords.subList(0,simpleKeywords.size());
    }
    public List<String> getComponents(){
        return componentsKeywords.subList(0,componentsKeywords.size());
    }
}
