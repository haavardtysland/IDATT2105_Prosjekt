package IDATT2105.Reservation.models;

import javax.persistence.*;

@Entity
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int rom_id;
    private String navn;
    private int antall_plasser;

    public int getRom_id() {
        return rom_id;
    }

    public String getNavn() {
        return navn;
    }

    public int getAntall_plasser() {
        return antall_plasser;
    }

    public void setNavn(String navn) {
        this.navn = navn;
    }

    public void setAntall_plasser(int antall_plasser) {
        this.antall_plasser = antall_plasser;
    }

    public void setRom_id(int rom_id) {
        this.rom_id = rom_id;
    }

    @Override
    public String toString() {
        return this.navn;
    }
}
