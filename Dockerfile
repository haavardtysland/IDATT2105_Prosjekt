FROM adoptopenjdk/maven-openjdk11

COPY backend /backend

WORKDIR "/backend/Reservation"

CMD ["mvn", "spring-boot:run"]