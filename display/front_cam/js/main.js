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

  // 1. Definiamo il topic della camera come nell'esempio
    // Usiamo /compressed perché è l'unico che può essere messo in un tag <img>
    // const cameraTopic = new RRLIB.Topic({
    //     ros: page_manager.ros,
    //     name: '/head_front_camera/color/image_raw/compressed',
    //     messageType: 'sensor_msgs/CompressedImage'
    // });

    // // 2. Sottoscrizione (Identica alla logica topics.forEach del tuo esempio)
    // cameraTopic.subscribe(function(message) {
    //     // Usiamo l'ID del tuo HTML: "camera-feed"
    //     const imageElement = document.getElementById('camera-feed');
    //     if (imageElement) {
    //         // ARI invia JPEG, quindi usiamo data:image/jpg
    //         imageElement.src = 'data:image/jpg;base64,' + message.data;
    //     }
    // });
  
  
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