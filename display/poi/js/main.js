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
  // Back to the previous screen
  $(".control-btn[title='Back']").on("click", function() {
    // page_manager.common_demo.logBack("back_from_poi_menu");
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
  $("#poi_1, #poi_2, #poi_3").on("click", function() {
        // Opzionale: recuperiamo il testo del bottone per personalizzare il pop-up
        let destinazione = $(this).text();
        $("#modal-text").text("Do you want to go to " + destinazione + "?");
        
        // Mostra il pop-up con un effetto di entrata
        $("#confirmation-modal").fadeIn(300);
    });

    // 2. Quando clicchi su ANNULLA, il pop-up scompare e basta
    $("#confirm-no").on("click", function() {
        $("#confirmation-modal").fadeOut(300);
    });

    // 3. Quando clicchi su SÌ, il pop-up scompare e basta (per ora)
    $("#confirm-yes").on("click", function() {
        console.log("Confirm decision");
        $("#confirmation-modal").fadeOut(300);
    });
});