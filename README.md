# IDATT2105_Prosjekt
**En applikasjon for å reservere rom**<br>
Gruppe: Håvard Tysland, Mathias Myrold, Hans William Forbrigd, Ole Løkken

## Introduksjon
Frivillig prosjekt i faget Fullstack Applikasjonsutvikling(IDATT2105) ved NTNU.<br>
Målet for prosjektet var å lage en applikasjon der administratorer kan legge til brukere, som skal kunne reservere rom eller seksjoner av rommet. I tillegg skal administratorene kunne slette eller endre på reservasjoner, rom og brukere.

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
 
## Fremtidig arbeid
  Eventuelle forbedringer vi kan se på ved fremtidig arbeid er: 
   - Støtte for kryptert overføring med HTTPS
   - Frontend tester
   - Teste sikkerheten til applikasjonen slik at den blir sikker mot eventuelle angrep


## Testing
Vi har valgt å lage integrasjonstester som tester hele stakken, helt fra controller og til database. Vi har god dekningsgrad på server-siden, der testene dekker 58% av linjene i kodebasen. Disse har blitt brukt i en kombinasjon med CI/CD slik at når man oppretter pull requests, blir testene kjørt, og vi får beskjed fra CI om testene feiler. 
![Skjermbilde 2021-05-21 kl  16 11 32](https://user-images.githubusercontent.com/55196403/119150974-3936af80-ba4f-11eb-8b25-39afc81a85df.png)

## CI/CD
Vi har brukt Github Actions til Continious Integration. Dette har vi brukt utover prosjektet i samsvar med testene for å passe på at alt kjører riktig før vi merger pull requestene.<br>
Vi har brukt [Heroku](https://www.heroku.com/) til å deploye backend for å gjøre utviklingen lettere på frontend: http://idatt2105.herokuapp.com/ <br>
Vi har også brukt [Firebase](https://firebase.google.com/?gclid=CjwKCAjwtJ2FBhAuEiwAIKu19hfjT2CysVLTzz4LpKZhKRdVQxuaeUZdcvc2m_QN_dBEHq6kUkiNphoCswMQAvD_BwE&gclsrc=aw.ds) til å deploye frontend: https://reservation-app-b824f.web.app/, men her må man kjøre backend lokalt ettersom vi fikk problemer med at det ikke var HTTPS.


## Installasjonsinstrukser
Hvis man ønsker å kjøre backend lokalt så er man avhengig av egen database, inloggingsinformasjonen til denne må man legge i en application.properties-fil som skal ligge i mappestrukturen: 

```Backend/src/main/resources/```

Den skal se slik ut, men rdshostname, rdsport, rdsusername og rdspassword skal byttes til verdier fra egen database.

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
spring.mail.username=reservasjonapp@gmail.com
spring.mail.password=guttaruler123
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true
```

### Kjøre backend lokalt
  1. Clone eller last ned koden til egen datamaskin
  2. Last ned [Maven](https://maven.apache.org/)
  3. Skriv maven --version i kommandolinjen. Java version må være java 11 eller senere.
  4. Gå til Backend mappen i terminalen
  5. Skriv ```mvn spring-boot:run```
  6. Om du ønsker å kjøre testene kan du skrive ```mvn test```
  7. Serveren starter på http://localhost:8081 
  8. Gå til filen Axios.tsx i kildekoden på klient siden under ".client/src/", og endre baseURL til ```'http://localhost:8081'```

### Kjøre frontend lokalt
  1. Clone eller last ned koden til egen datamaskin
  2. Last ned [Node](https://nodejs.org/en/)
  3. Gå til client mappen i terminalen
  4. Skriv ```npm install``` og trykk enter
  5. Skriv ```npm start``` og trykk enter
  6. Applikasjonen vil nå starte på http://localhost:3000 i nettleseren, med mindre terminalen sier noe annet
 
### Kjøre frontend og backend lokalt med Docker compose
  1. Clone eller last ned koden til egen datamaskin
  2. Last ned [Docker Desktop](https://www.docker.com/products/docker-desktop)
  3. Gå til filen Axios.tsx i kildekoden på klient siden under ".client/src/", og endre baseURL til 'http://localhost:8081'
  4. Gå til rot-mappen i prosjektet og skriv ```docker compose up```
  5. Frontend vil da kjøre på http://localhost:3000
  6. Backend kjører på http://localhost:8081


## Endepunkter med Swagger UI
Vi har brukt [Swagger UI](https://swagger.io/tools/swagger-ui/) for å dokumentere endepunktene våre. Når du kjører backend lokalt kan du gå til http://localhost:8081/swagger-ui.html#/. Hvis du vil se det uten å kjøre lokalt kan du også se det på http://idatt2105.herokuapp.com/swagger-ui.html# hvor vi har deployet backend. Det kan være at den deploya bacekend sover når den ikke er brukt på lenge, og vil derfor ta lang tid å laste inn. Om det står application error på nettsiden http://idatt2105.herokuapp.com, vil det bety at applikasjonen har kræsjet. Send isåfall mail til ole.lokken1@gmail.com om du vil vi skal vekke den igjen. 

