FROM adoptopenjdk/maven-openjdk11

ADD backend /backend
WORKDIR "/backend"
CMD ["mvn", "spring-boot:run"]