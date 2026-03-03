import '../../welcome_common/js/lib/jquery.min.js';
import { RRLIB } from '../../js/pallib.js';
import CommonDemoARI from '../../tools/js/core.js';

class PageManager {
  constructor() {
    this.host = "http://" + window.location.hostname;
    this.ros = new RRLIB.Ros({
      host: this.host
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
  // Back to the previous screen
  $(".control-btn[title='Back']").on("click", function() {
    // page_manager.common_demo.logBack("back_from_torso_cam");
    // page_manager.common_demo.sendRobotIntentInput("unitn_main_menu");
    // parent.switchConfig("unitn_main_menu");
    window.location.href = "../unitn_main_menu/index.html";
  });  
  // Back to the home screen
  $(".control-btn[title='Home']").on("click", function() {
    // page_manager.common_demo.logBack("back_to_unitn_menu");
    // page_manager.common_demo.sendRobotIntentInput("unitn_main_menu");
    // parent.switchConfig("unitn_main_menu");
    window.location.href = "../unitn_main_menu/index.html";
  });
});