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

## Testing
Vi har valgt å lage integrasjonstester som tester hele stakken, helt fra controller og til database. Vi har god dekningsgrad på server-siden, der testene dekker 58% av linjene i kodebasen. Disse har blitt brukt i en kombinasjon med CI/CD slik at når man oppretter pull requests, blir testene kjørt, og vi får beskjed fra CI om testene feiler. 
![Skjermbilde 2021-05-21 kl  16 11 32](https://user-images.githubusercontent.com/55196403/119150974-3936af80-ba4f-11eb-8b25-39afc81a85df.png)


## Installasjonsinstrukser
Hvis man ønsker å kjøre backend lokalt så er man avhengig av egen database, inloggingsinformasjonen til denne må man legge i en application.properties-fil som skal ligge i mappestrukturen: 

```Backend/src/main/resources/```

Den skal se slik ut, men rdshostname, rdsport, rdsusername, rdspassword, spring.mail.username, spring.mail.password skal byttes til verdier fra egen database/mail.

```
RDSHOSTNAME=mysql-ait.stud.idi.ntnu.no
RDSPORT=3306
RDSDBNAME=databasenavn
RDSUSERNAME=brukernavn
RDSPASSWORD=passord
server.port=8080
secretKey = (nøkkel til å lage token)
spring.mail.protocol=smtp
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username= (en mail du bruker til å sende ut brukernavn og passord til brukere)
spring.mail.password= (passord til denne mailen)
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true
```

### Kjøre backend lokalt
  1. Clone eller last ned koden til egen datamaskin
  2. Last ned [Maven](https://maven.apache.org/)
  3. Skriv maven --version i kommandolinjen. Java version må være java 11 eller senere.
  4. Gå til Backend mappen i terminalen
  5. Skriv mvn spring-boot:run
  6. Om du ønsker å kjøre testene kan du skrive mvn test
  7. Serveren starter på localhost:8081 
  8. Gå til filen Axios.tsx i kildekoden på klient siden under ".client/src/", og endre baseURL til 'http://localhost:8081'

### Kjøre frontend lokalt
  1. Clone eller last ned koden til egen datamaskin
  2. Last ned [Node](https://nodejs.org/en/)
  3. Gå til client mappen i terminalen
  4. Skriv "npm install" og trykk enter
  5. Skriv "npm start" og trykk enter
  6. Applikasjonen vil nå starte på http://localhost:3000 i nettleseren, med mindre terminalen sier noe annet
 




  
