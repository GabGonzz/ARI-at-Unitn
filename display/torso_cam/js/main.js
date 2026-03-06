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

  // To view the images from the camera, we need to use ARI's topics, so we subscribe to the correct
  // topic. This part is currently commented because it seems that while working on the layout 
  // the ROS library to communicate with ARI's topics is not provided, but there is only an 
  // offline version in ../../js/pallib.js
  // const cameraTopic = new RRLIB.Topic({
  //   ros: page_manager.ros,
  //   name: '/torso_front_camera/color/image_raw/compressed', // Cambia in /torso_front_camera/... se sei nella pagina torso
  //   messageType: 'sensor_msgs/CompressedImage'
  // });
  
  // cameraTopic.subscribe(function(message) {
  //   const imageElement = document.getElementById('camera-feed');
  //   if (imageElement) {
  //     // Iniettiamo i dati Base64 direttamente nel tag img
  //     imageElement.src = 'data:image/jpg;base64,' + message.data;
  //   }
  // });


  // Back to the previous screen
  $(".control-btn[title='Back']").on("click", function() {

    // The navigation between the pages is usually handled by some ROS functions, but while
    // working only on the layout these are not usable, so here they are commented
    // page_manager.common_demo.logBack("back_from_torso_cam");
    // page_manager.common_demo.sendRobotIntentInput("unitn_main_menu");
    // parent.switchConfig("unitn_main_menu");

    // To make the system work fluidly, we unsubscribe from the camera topic, now commented because 
    // the ROS library is not reachable
    // cameraTopic.unsubscribe();

    window.location.href = "../unitn_main_menu/index.html";
  });

  // Back to the home screen
  $(".control-btn[title='Home']").on("click", function() {

    // The navigation between the pages is usually handled by some ROS functions, but while
    // working only on the layout these are not usable, so here they are commented
    // page_manager.common_demo.logBack("back_to_unitn_menu");
    // page_manager.common_demo.sendRobotIntentInput("unitn_main_menu");
    // parent.switchConfig("unitn_main_menu");

    // To make the system work fluidly, we unsubscribe from the camera topic, now commented because 
    // the ROS library is not reachable
    // cameraTopic.unsubscribe();

    window.location.href = "../unitn_main_menu/index.html";
  });
});