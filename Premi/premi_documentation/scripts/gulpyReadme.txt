Gulpy: Calcola l'indice di Gulpease di un documenot.

Da avviare con:
Gulpy.sh percorsoDocumento

Lo script deve essere eseguito sul file principale del documento (es: pianoDiProgetto.tex, normeDiProgetto.tex), sarà poi compito dello script andare ad includere gli opportuni file.

Lo script calcola due indici di Gulpease:
- Gulpease: che viene calcolato considerando come delimitarore di frase il \n, il ";" e il "."
- Gulpease "Pessimistico": che viene calcolato considerando come delimitatore di frase solamente il "."

Viene inoltre prodotto un file .txt contenente il testo generato dal file .tex

IL SUPPORTO ALLE TABELLE E ALLE IMMAGINI DEVE ESSERE ANCORA COMPLETATO,
nel caso il documento contenga tabelle o immagini il risultato potrebbe essere inaffidabile.