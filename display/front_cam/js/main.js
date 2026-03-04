import '../../welcome_common/js/lib/jquery.min.js';
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

  const cameraTopic = new RRLIB.Topic({
    ros: page_manager.ros,
    name: '/head_front_camera/color/image_raw/compressed', // Cambia in /torso_front_camera/... se sei nella pagina torso
    messageType: 'sensor_msgs/CompressedImage'
  });

  // 3. Sottoscrizione al flusso dati
  cameraTopic.subscribe(function(message) {
    const imageElement = document.getElementById('camera-feed');
    if (imageElement) {
      // Iniettiamo i dati Base64 direttamente nel tag img
      imageElement.src = 'data:image/jpeg;base64,' + message.data;
    }
  });
  
  // Back to the previous screen
  $(".control-btn[title='Back']").on("click", function() {
    // page_manager.common_demo.logBack("back_from_front_cam");
    // page_manager.common_demo.sendRobotIntentInput("unitn_main_menu");
    // parent.switchConfig("unitn_main_menu");
    // cameraTopic.unsubscribe();
    window.location.href = "../unitn_main_menu/index.html";
  });  
  // Back to the home screen
  $(".control-btn[title='Home']").on("click", function() {
    // page_manager.common_demo.logBack("back_to_unitn_menu");
    // page_manager.common_demo.sendRobotIntentInput("unitn_main_menu");
    // parent.switchConfig("unitn_main_menu");
    // cameraTopic.unsubscribe();
    window.location.href = "../unitn_main_menu/index.html";
  });
});