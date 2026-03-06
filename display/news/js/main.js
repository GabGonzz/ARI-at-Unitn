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
    // 1. DATABASE TEMPORANEO
    const newsData = {
        "1": {
            id: "1",
            date: "06 MAR 2026",
            title: "Notizia 1",
            preview: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod...",
            fullText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        },
        "2": {
            id: "2",
            date: "04 MAR 2026",
            title: "Notizia 2",
            preview: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod...",
            fullText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
        }
    };

    // --- LOGICA DI CARICAMENTO IMMEDIATA (Per test Offline) ---
    const container = $(".news-container");
    if (container.length) {
        container.empty();
        Object.values(newsData).forEach(news => {
            const cardHtml = `
                <div class="news-card">
                    <div class="news-date">${news.date}</div>
                    <h3>${news.title}</h3>
                    <p>${news.preview}</p>
                    <button class="btn-read-more" onclick="window.location.href='news_detail.html?id=${news.id}'">
                        Read more
                    </button>
                </div>`;
            container.append(cardHtml);
        });
    }

    // --- LOGICA DETTAGLIO IMMEDIATA ---
    const urlParams = new URLSearchParams(window.location.search);
    const newsId = urlParams.get('id');
    if (newsId && newsData[newsId]) {
        const currentNews = newsData[newsId];
        $("#detail-title").text(currentNews.title);
        $("#detail-date").text(currentNews.date);
        $("#detail-text").text(currentNews.fullText);
    }

    // 2. INIZIALIZZAZIONE ROS (Solo per volume, batteria e voce)
    page_manager.init(() => {
        // Se siamo nel dettaglio, colleghiamo il tasto "Say" ora che ROS è pronto
        if (newsId && newsData[newsId]) {
            $("#ari-read-btn").off("click").on("click", function() {
                const currentNews = newsData[newsId];
                const speech = "Sure! Here is the news. " + currentNews.title + ". " + currentNews.fullText;
                page_manager.common_demo.say(speech);
            });
        }
    });
  // Back to the previous screen
  $(".control-btn[title='Back']").on("click", function() {
    // page_manager.common_demo.logBack("back_from_interactions_menu");
    // page_manager.common_demo.sendRobotIntentInput("unitn_main_menu");
    // parent.switchConfig("unitn_main_menu");
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('id')) {
        // Se siamo nel dettaglio, torna semplicemente indietro alla lista
        window.history.back();
    } else {
        // Se siamo già nella lista, torna al menu principale del robot
        window.location.href = "../unitn_main_menu/index.html";
    }
  });  
  // Back to the home screen
  $(".control-btn[title='Home']").on("click", function() {
    // page_manager.common_demo.logBack("back_to_unitn_menu");
    // page_manager.common_demo.sendRobotIntentInput("unitn_main_menu");
    // parent.switchConfig("unitn_main_menu");
    window.location.href = "../unitn_main_menu/index.html";
  });
});