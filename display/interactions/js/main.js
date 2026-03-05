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
  // Back to the previous screen
  $(".control-btn[title='Back']").on("click", function() {
    // page_manager.common_demo.logBack("back_from_interactions_menu");
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
  $("#speech_btn").on("click", function() {
    // page_manager.common_demo.logBack("unitn_speech_menu");
    // page_manager.common_demo.sendRobotIntentInput("unitn_speech_menu");
    // parent.switchConfig("unitn_speech_menu");
    window.location.href = "../unitn_speech_menu/index.html";
  });
});