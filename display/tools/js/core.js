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

        this.updateStatusBar();
        
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
    // Metodo per gestire l'aggiornamento della Status Bar
    updateStatusBar() {
        const update = () => {
            const now = new Date();
            
            // Aggiorna Ora
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const timeSpan = document.querySelector('#status-time span');
            if (timeSpan) timeSpan.textContent = `${hours}:${minutes}`;
            
            // Aggiorna Data
            const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
            const dateSpan = document.querySelector('#status-date span');
            if (dateSpan) dateSpan.textContent = now.toLocaleDateString('it-IT', options);
        };

        setInterval(update, 1000);
        update();
        
        // Attiva i listener ROS per l'energia
        // this.subscribeBattery();
    }

    subscribeBattery() {
        // Topic per la percentuale
        const batteryTopic = new RRLIB.Topic({
            ros: this.ros,
            name: '/power/battery_level',
            messageType: 'std_msgs/Float32'
        });

        // Topic per lo stato di ricarica
        const chargingTopic = new RRLIB.Topic({
            ros: this.ros,
            name: '/power/is_charging',
            messageType: 'std_msgs/Bool'
        });

        let isCharging = false;

        // Monitoriamo la ricarica
        chargingTopic.subscribe((msg) => {
            isCharging = msg.data;
            this.updateBatteryUI(null, isCharging); // Aggiorna solo l'icona
        });

        // Monitoriamo il livello
        batteryTopic.subscribe((msg) => {
            let level = Math.round(msg.data);
            this.updateBatteryUI(level, isCharging);
        });
    }

    // Funzione interna per aggiornare graficamente l'icona e il testo
    updateBatteryUI(level, isCharging) {
        const batterySpan = document.getElementById('battery-level');
        const batteryIcon = document.querySelector('#status-battery i');

        if (batterySpan && level !== null) {
            batterySpan.textContent = level + "%";
        }

        if (batteryIcon) {
            // Se sta caricando, mostra SEMPRE il fulmine
            if (isCharging) {
                batteryIcon.className = "fa-solid fa-bolt";
                batteryIcon.style.color = "#f1c40f"; // Giallo ricarica
            } else if (level !== null) {
                // Se non carica, icona dinamica in base al livello
                if (level <= 20) {
                    batteryIcon.className = "fa-solid fa-battery-quarter";
                    batteryIcon.style.color = "#e74c3c"; // Rosso
                } else if (level <= 50) {
                    batteryIcon.className = "fa-solid fa-battery-half";
                    batteryIcon.style.color = "#f39c12"; // Arancione/Giallo
                } else {
                    batteryIcon.className = "fa-solid fa-battery-full";
                    batteryIcon.style.color = "#27ae60"; // Verde
                }
            }
        }
    }
}

export default CommonDemoARI;