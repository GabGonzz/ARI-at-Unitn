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
  $("#poi_btn").on("click", function() {
    // page_manager.common_demo.logBack("unitn_poi_list");
    // page_manager.common_demo.sendRobotIntentInput("unitn_poi_list");
    // parent.switchConfig("unitn_poi_list");
    window.location.href = "../unitn_poi_list/index.html";
  });
  $("#front_cam_btn").on("click", function() {
    // page_manager.common_demo.logBack("unitn_front_cam");
    // page_manager.common_demo.sendRobotIntentInput("unitn_front_cam");
    // parent.switchConfig("unitn_front_cam");
    window.location.href = "../unitn_front_cam/index.html";
  });
  $("#torso_cam_btn").on("click", function() {
    // page_manager.common_demo.logBack("unitn_torso_cam");
    // page_manager.common_demo.sendRobotIntentInput("unitn_torso_cam");
    // parent.switchConfig("unitn_torso_cam");
    window.location.href = "../unitn_torso_cam/index.html";
  });
  $("#interactions_btn").on("click", function() {
    // page_manager.common_demo.logBack("unitn_interactions_menu");
    // page_manager.common_demo.sendRobotIntentInput("unitn_interactions_menu");
    // parent.switchConfig("unitn_interactions_menu");
    window.location.href = "../unitn_interactions_menu/index.html";
  });
});