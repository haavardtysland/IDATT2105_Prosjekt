package IDATT2105.Reservation.controller;

import IDATT2105.Reservation.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;


@Controller
public class controller {

  @Autowired
  private UserService userService;
}

