# IDATT2105_Prosjekt
**En applikasjon for å reservere rom**<br>
Gruppe: Håvard Tysland, Mathias Myrold, Hans William Forbrigd, Ole Løkken

## Introduksjon
Frivillig prosjekt i faget Fullstack Applikasjonsutvikling(IDATT2106) ved NTNU
Målet for prosjektet var å lage en applikasjon der administratorer kan legge til brukere, som skal kunne reservere rom, eller seksjoner av rommet. I tilleg skal administratorene kunne slette eller endre på reservasjoner, rom og brukere.

## Implementert funksjonalitet for administratorer
  - Logge inn
  - Opprette en bruker som kan logge seg inn på appen
  - Sende mail til denne personen, med passord til brukeren
  - Endre eller slette en bruker
  - Legge til, endre og slette rom
  - Legge til, endre og slette seksjoner i et rom
  - Legge til, endre og slette reservasjoner
  - Alt av annen funksjonalitet en vanlig bruker har


## Implementert funksjonalitet for en vanlig bruker
  - Logge inn
  - Endre brukerinformasjon om egen bruker
  - Se alle rom
  - Se ledige rom innenfor et gitt tidsvindu
  - Reservere seksjoner av et rom, eller hele rommet
  - Se, endre eller slette egne reservasjoner
  - Legge til kommentarer i en seksjon, og se andre kommentarer
  - Se statistikk over andre rom

## Videreutvikling

## Testing
Vi har valgt å lage integrasjonstester som tester hele stakken, helt fra controller og til database. Vi har god dekningsgrad på server-siden, der testene dekker 58% av linjene i kodebasen. Disse har blitt brukt i en kombinasjon med CI/CD slik at når man oppretter pull requests, blir testene kjørt, og vi får beskjed fra CI om testene feiler.
![Skjermbilde 2021-05-21 kl  16 11 32](https://user-images.githubusercontent.com/55196403/119150974-3936af80-ba4f-11eb-8b25-39afc81a85df.png)


## Installasjonsinstrukser





  
