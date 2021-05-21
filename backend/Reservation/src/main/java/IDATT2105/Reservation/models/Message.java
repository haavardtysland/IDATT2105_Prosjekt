package IDATT2105.Reservation.models;

import io.swagger.annotations.ApiModel;
import org.eclipse.persistence.annotations.CascadeOnDelete;
import java.sql.Timestamp;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@ApiModel(description = "Message model")
@Entity
public class Message {
  @Id
  @Column(name = "message_id")
  private int messageId;

  @CascadeOnDelete
  @ManyToOne(targetEntity = User.class)
  @JoinColumn(name = "user_id")
  private User user;

  @CascadeOnDelete
  @ManyToOne(targetEntity = Section.class)
  @JoinColumn(name = "section_id")
  private Section section;

  @Column(name = "message")
  private String message;

  @Column(name = "time_created")
  private Timestamp timeCreated;


  public Message() {
  }

  public Message(int messageId, User user, Section section, String message,Timestamp timeCreated) {
    this.messageId = messageId;
    this.user = user;
    this.section = section;
    this.message = message;
    this.timeCreated = timeCreated;
  }

  public int getMessageId() {
    return messageId;
  }

  public void setMessageId(int messageId) {
    this.messageId = messageId;
  }

  public User getUser() {
    return user;
  }

  public void setUser(User user) {
    this.user = user;
  }

  public Section getSection() {
    return section;
  }

  public void setSection(Section section) {
    this.section = section;
  }

  public String getMessage() {
    return message;
  }

  public void setMessage(String message) {
    this.message = message;
  }

  public Timestamp getTimeCreated() {
    return timeCreated;
  }

  public void setTimeCreated(Timestamp timeCreated) {
    this.timeCreated = timeCreated;
  }

  @Override
  public String toString() {
    return
        "{" +
            "\n\"messageId\": " + messageId + "," +
            "\n \"user\": " + user.toJSON() + "," +
            "\n \"message\":" + '\"' + message + '\"' + "," +
            "\n \"timecreated\":" + (timeCreated == null ? "null" : timeCreated.getTime()) +
            "\n}";
  }
}
