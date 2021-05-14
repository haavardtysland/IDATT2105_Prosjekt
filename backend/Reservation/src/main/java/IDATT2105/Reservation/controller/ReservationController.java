package IDATT2105.Reservation.controller;


import IDATT2105.Reservation.service.RoomService;
import IDATT2105.Reservation.util.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(value="/reservation")
public class ReservationController {

  Logger log = new Logger(ReservationController.class.toString());
  @Autowired
  private ReservationService service;

}
