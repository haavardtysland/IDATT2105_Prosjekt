package IDATT2105.Reservation.util;

public class ReservationTime {

    private Long start, end;

    public ReservationTime(Long start, Long end){
        this.start = start;
        this.end = end;
    }

    @Override
    public String toString() {
        return "{" +
                "\n\"start\": "  + start  +
                ",\n\"end\": " + "\"" + end + "\"" +
                "\n}";
    }
}
