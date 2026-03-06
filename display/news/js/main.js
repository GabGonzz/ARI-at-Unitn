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

    // Mock data just to test function and layout, they will be replaced with real data in the end
    const newsData = {
        "1": {
            id: "1",
            date: "06 MAR 2026",
            title: "News 1",
            preview: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod...",
            fullText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        },
        "2": {
            id: "2",
            date: "04 MAR 2026",
            title: "News 2",
            preview: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod...",
            fullText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
        }
    };

    // Code to load the news in the list by loading it one by one in the HTML page
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

    // Logic to open the detail of a news in a new HTML page
    const urlParams = new URLSearchParams(window.location.search);
    const newsId = urlParams.get('id');
    if (newsId && newsData[newsId]) {
        const currentNews = newsData[newsId];
        $("#detail-title").text(currentNews.title);
        $("#detail-date").text(currentNews.date);
        $("#detail-text").text(currentNews.fullText);
    }

    // ROS initialization to make ARI read the text of the news, moved here because it would block the 
    // other functions when the ROS is not communicating, later it will be moved 
    // correctly in the beginning
    page_manager.init(() => {
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

    // "If" branch to understand how the "back" button should work, to go back to the news list or to 
    // go back to the main menu
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('id')) {
        // If we are in a news detail, we go back to the list
        window.history.back();
    } else {
        //Else, we go back to the main menu
        window.location.href = "../unitn_main_menu/index.html";
    }
  });

  // Back to the home screen
  $(".control-btn[title='Home']").on("click", function() {

    // The navigation between the pages is usually handled by some ROS functions, but while
    // working only on the layout these are not usable, so here they are commented
    // page_manager.common_demo.logBack("back_to_unitn_menu");
    // page_manager.common_demo.sendRobotIntentInput("unitn_main_menu");
    // parent.switchConfig("unitn_main_menu");

    window.location.href = "../unitn_main_menu/index.html";
  });
});