import '../../tools/js/lib/jquery.min.js';
import { RRLIB } from '../../js/pallib.js';
import CommonDemoARI from '../../tools/js/core.js';

class PageManager {
  constructor() {
    this.url = "ws://" + window.location.hostname + ":9090";
    this.ros = new RRLIB.Ros({
      url: this.url
    });
    this.common_demo = new CommonDemoARI({
      ros: this.ros
    });
  }
  init() {
    this.common_demo.init(() => {
    });
  }
}

let page_manager = new PageManager();

$(document).ready(function() {
  page_manager.init();

  // When any part of the screen will be clicked, the application will start by navigating to 
  // the main menu
  $(".main-container").on("click", function() {

    // The navigation between the pages is usually handled by some ROS functions, but while
    // working only on the layout these are not usable, so here they are commented
    // page_manager.common_demo.logBack("navigating_to_unitn_menu");
    // page_manager.common_demo.sendRobotIntentInput("unitn_main_menu");
    // parent.switchConfig("unitn_main_menu");

    window.location.href = "../unitn_main_menu/index.html";
  });
});