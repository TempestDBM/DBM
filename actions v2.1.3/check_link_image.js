module.exports = {

    name: "Check Link Image",
  
  
    section: "Conditions",
  
    //---------------------------------------------------------------------
    // Action Subtitle
    //
    // This function generates the subtitle displayed next to the name.
    //---------------------------------------------------------------------
  
    subtitle(data, presets) {
      return `${presets.getConditionsText(data)}`;
    },
  
    //---------------------------------------------------------------------
    // Action Meta Data
    //
    // Helps check for updates and provides info if a custom mod.
    // If this is a third-party mod, please set "author" and "authorUrl".
    //
    // It's highly recommended "preciseCheck" is set to false for third-party mods.
    // This will make it so the patch version (0.0.X) is not checked.
    //---------------------------------------------------------------------
  
    meta: { version: "2.1.1", preciseCheck: true, author: null, authorUrl: null, downloadUrl: null },
  
    //---------------------------------------------------------------------
    // Action Fields
    //
    // These are the fields for the action. These fields are customized
    // by creating elements with corresponding IDs in the HTML. These
    // are also the names of the fields stored in the action's JSON data.
    //---------------------------------------------------------------------
  
    fields: ["storage", "varName", "comparison", "value", "branch"],
  
    //---------------------------------------------------------------------
    // Command HTML
    //
    // This function returns a string containing the HTML used for
    // editing actions.
    //
    // The "isEvent" parameter will be true if this action is being used
    // for an event. Due to their nature, events lack certain information,
    // so edit the HTML to reflect this.
    //---------------------------------------------------------------------
  
    html(isEvent, data) {
      return `
  <span>Ação feita por: Tempest#8741</span><br><br>
  <retrieve-from-variable allowSlashParams dropdownLabel="Variavel" selectId="storage" variableContainerId="varNameContainer" variableInputId="varName"></retrieve-from-variable>

  <br><br><br>
  
  <conditional-input id="branch" style="padding-top: 8px;"></conditional-input>
  
  <br><br><br>

  <hr class="subtlebar">

  
  <div style="text-align: left;">
    Formatos de links válidos:
    <br><br>
    https://cdn.discordapp.com/
    <br>
    https://i.imgur.com/
    <br>
    https://i.giphy.com/
    <br>
    https://c.tenor.com/
  </div>
  `;
    },
  
    //---------------------------------------------------------------------
    // Action Editor Pre-Init Code
    //
    // Before the fields from existing data in this action are applied
    // to the user interface, this function is called if it exists.
    // The existing data is provided, and a modified version can be
    // returned. The returned version will be used if provided.
    // This is to help provide compatibility with older versions of the action.
    //
    // The "formatters" argument contains built-in functions for formatting
    // the data required for official DBM action compatibility.
    //---------------------------------------------------------------------
  
    preInit(data, formatters) {
      return formatters.compatibility_2_0_0_iftruefalse_to_branch(data);
    },
  
    //---------------------------------------------------------------------
    // Action Editor Init Code
    //
    // When the HTML is first applied to the action editor, this code
    // is also run. This helps add modifications or setup reactionary
    // functions for the DOM elements.
    //---------------------------------------------------------------------
  
    init() {
      const { glob, document } = this;
  
      glob.onComparisonChanged = function (event) {
        if (event.value === "0") {
          document.getElementById("directValue").style.display = "none";
        } else {
          document.getElementById("directValue").style.display = null;
        }
      };
  
      glob.onComparisonChanged(document.getElementById("comparison"));
    },
  
    //---------------------------------------------------------------------
    // Action Bot Function
    //
    // This is the function for the action within the Bot's Action class.
    // Keep in mind event calls won't have access to the "msg" parameter,
    // so be sure to provide checks for variable existence.
    //---------------------------------------------------------------------
  
    action(cache) {
      const data = cache.actions[cache.index];
      const varName = this.evalMessage(data.varName, cache);
      const type = parseInt(data.storage, 10);
      const variable = this.getVariable(type, varName, cache);
      var result = false;

      var link = variable;

      function checkLink(link) {

        link = link.toString().replace("https://", "").replace("www.", "");
    
        var ok = 0;
    
        var comecaOk = 0;
        var terminaOk = 0;
        var tamanhoOk = 0;

        var sitesComeca = [
            "cdn.discordapp.com/attachments/",
            "cdn.discordapp.com/avatars/",
            "cdn.discordapp.com/emojis",
            "i.imgur.com/",
            "i.giphy.com/",
            "c.tenor.com/",
        ]
    
        var sitesTermina = [
            ".png",
            ".jpg",
            ".gif",
            ".jpeg",
            ".webp",
        ]
    
        var sitesTamanho = [
            68,
            45,
            46,
            18,
            36,
            28,
        ]
    
        for(var i = 0; i <= sitesComeca.length; i++) {
            if(link.startsWith(sitesComeca[i])) {
                comecaOk = 1;
            }
        }
    
        for(var i = 0; i <= sitesTermina.length; i++) {
            if(link.endsWith(sitesTermina[i])) {
                terminaOk = 1;
            }
        }
    
        for(var i = 0; i <= sitesTermina.length; i++) {
            link = link.replace(sitesTermina, "");
        }
    
        for(var i = 0; i <= sitesTamanho.length; i++) {
            if(link.length > sitesTamanho[i]) {
                tamanhoOk = 1;
            }
        }
    
        if(comecaOk == 1 && terminaOk == 1 && tamanhoOk == 1) {
            ok = 1;
        }
    
        return ok;
      }
    
      link = checkLink(link);

      if(link == 1) {
        result = true;
      }

      this.executeResults(result, data?.branch ?? data, cache);
    },
  
    //---------------------------------------------------------------------
    // Action Bot Mod Init
    //
    // An optional function for action mods. Upon the bot's initialization,
    // each command/event's actions are iterated through. This is to
    // initialize responses to interactions created within actions
    // (e.g. buttons and select menus for Send Message).
    //
    // If an action provides inputs for more actions within, be sure
    // to call the `this.prepareActions` function to ensure all actions are
    // recursively iterated through.
    //---------------------------------------------------------------------
  
    modInit(data) {
      this.prepareActions(data.branch?.iftrueActions);
      this.prepareActions(data.branch?.iffalseActions);
    },
  
    //---------------------------------------------------------------------
    // Action Bot Mod
    //
    // Upon initialization of the bot, this code is run. Using the bot's
    // DBM namespace, one can add/modify existing functions if necessary.
    // In order to reduce conflicts between mods, be sure to alias
    // functions you wish to overwrite.
    //---------------------------------------------------------------------
  
    mod() {},
  };
  