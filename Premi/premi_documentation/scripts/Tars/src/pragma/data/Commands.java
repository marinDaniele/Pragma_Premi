package pragma.data;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by giacomomanzoli on 19/02/15.
 */
public class Commands {
    public static List<String> IGNORE_COMMANDS = new ArrayList<>();
    public static Map<String, String> CUSTOM_COMMANDS = new HashMap<>();
    public static List<String> IGNORE_ENV = new ArrayList<>();

    static {
        IGNORE_ENV.add("lstlisting");
        IGNORE_ENV.add("table");
        IGNORE_ENV.add("tabular");
        IGNORE_ENV.add("figure");
        IGNORE_ENV.add("longtable");

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
        IGNORE_COMMANDS.add("hyperreff");
        IGNORE_COMMANDS.add("hyperlink");
        IGNORE_COMMANDS.add("hypertarget");
        IGNORE_COMMANDS.add("input"); // Serve per Gloxy, Compiler continua a compilare correttamente.

        IGNORE_COMMANDS.add("lstdefinelanguage");

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
}
