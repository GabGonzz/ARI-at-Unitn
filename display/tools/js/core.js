import { RRLIB, PalLib } from "../../js/pallib.js"

class CommonDemoARI {
    constructor(options) {
        this.ros = options.ros;
        this.pal_lib = new PalLib();
        this.demo_language = "en_GB";
        this.ari_volume = 0;

        // Parametro ROS per il volume
        this.volume_adjust = new RRLIB.Param({
            ros: this.ros,
            name: 'volume'
        });

        // Topic per il log dei dati
        this.data_logger = new RRLIB.Topic({
            ros: this.ros,
            name: 'data_logger'
        });

        // Topic per gli intenti (movimento/navigazione)
        this.user_intent = new RRLIB.Topic({
            ros: this.ros,
            name: 'intents'
        });
    }

    init(cb) {
        this.pal_lib.init();
        // Effetto di comparsa fluida della tua pagina
        $(".main-container").fadeIn("slow");
        
        // Inizializza il volume e lo slider
        this.volumeSlider();
        
        // Callback finale (esegue quello che scriverai nelle singole pagine)
        if (cb) cb();
    }

    // Funzione per far parlare ARI
    say(text_to_say) {
        if (text_to_say !== "")
            this.pal_lib.say(text_to_say, this.demo_language, (id) => {});
    }

    // Gestione dello Slider del Volume
    volumeSlider() {
        // Inserisce l'HTML dello slider nel tuo documento (nascosto inizialmente)
        $("body").append(
            '<div class="slidecontainer" id="volume-container" style="display:none; position:fixed; top:80px; left:20px; z-index:9999; background:white; padding:15px; border:3px solid #990000; border-radius:15px; box-shadow: 0 4px 15px rgba(0,0,0,0.3);">' +
                '<div id="minus-volume" style="cursor:pointer; font-size:24px; font-weight:bold; display:inline-block; margin-right:15px; color:#990000;">-</div>' +
                '<div style="display:inline-block; font-family:sans-serif; font-weight:bold;"><span id="volume-value"></span>%</div>' +
                '<div id="plus-volume" style="cursor:pointer; font-size:24px; font-weight:bold; display:inline-block; margin-left:15px; color:#990000;">+</div>' +
            '</div>'
        );

        // Apre/Chiude lo slider quando clicchi sul TUO tasto volume
        $(".control-btn[title='Volume']").on('click', function(e) {
            e.stopPropagation();
            $("#volume-container").toggle("fast");
        });

        $("#plus-volume").on('click', () => {
            if (this.ari_volume < 91) this.setVolume(this.ari_volume + 10);
        });

        $("#minus-volume").on('click', () => {
            if (this.ari_volume > 9) this.setVolume(this.ari_volume - 10);
        });

        this.getVolume();
    }

    getVolume() {
        this.volume_adjust.get((param) => {
            if (param >= 0) {
                this.ari_volume = (param != 100 && param != 0) ? 5 * Math.round(param * 0.2) : param;
                $("#volume-value").html(this.ari_volume);
            }
        });
    }

    setVolume(target) {
        this.volume_adjust.set(target);
        this.ari_volume = target;
        $("#volume-value").html(this.ari_volume);
    }

    // Logga la pressione dei bottoni su ROS
    logButton(button_id) {
        this.data_logger.publish({
            data: "Button press: " + button_id
        });
    }

    // Invia comandi di intento ad ARI (es. Navigazione)
    sendRobotIntentInput(page_intent_key, intent_="__intent_present_content__") {
        this.user_intent.publish({
            intent: intent_,
            data: '{"object": "' + page_intent_key + '"}',
            source: '__unknown_agent__',
            modality: '__modality_touchscreen__',
            priority: 100,
            confidence: 1.0
        });
    }
}

export default CommonDemoARI;