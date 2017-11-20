Gloxy: Marca i termini presenti nel glossario.

Da avviare con:
Gloxy.sh comando

Questo script può essere eseguito n volte per n grande a piacere, tuttavia direi che è compito dei
verificatori utilizzare lo script per marcare i termini prima di verificare il file.

Nel caso di comportamenti inaspettati e/o errori di compilazione, segnalatemelo via chat o mail,
possibilmente con il nome del file e il termine del glossario che hanno dato problemi. (Giacomo)

I possibili comandi da utilizzare sono:
1) download urlToDownload outputPath
	Legge il testo da urlToDownload e lo salva sul file outputPath
	es: Gloxy.sh download www.google.it/passwords passwords.tex

2) download glossary outputPath
	Legge il contenuto dall'url del glossario già preimpostato e salva il contenuto su outputPath
	es: Gloxy.sh download glossary ./glossario/terminiGlossario.tex

3) mark file filePath
	Mette il Mark del glossario sui termini che trova nella lista predefinita (quella che legge dal db)
	es: Gloxy.sh mark file ./normeDiProgetto/sezioni/introduzione.tex

4) mark dir dirPath
	Mette il Mark su tutti i file presenti nella directory dirPath, visita anche le sottodirecotry
	es: Gloxy.sh mark dir ./normeDiProgetto

5) clear file filePath
	Toglie tutti i mark dal file.

6) clear dir dirPath
	Toglie tutti i mark dai file conenuti nella directory


