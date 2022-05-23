module.exports = {

    name: 'Pontuação entre Números',
    section: 'Other Stuff',

    meta: { 
      version: "2.1.2", 
      preciseCheck: true, 
      author: "Tempest#8741", 
      authorUrl: null, 
      downloadUrl: "https://github.com/TempestDBM"
    },

    subtitle(data) {
      return `Pontuação em ${data.number}`;
    },
  
    variableStorage(data, varType) {
      if (parseInt(data.storage, 10) !== varType) return;
      return [data.varName, 'Number'];
    },
  
    fields: ['number', 'storage', 'varName'],
  
    html(_isEvent, data) {
      return `
    <span>Ação feita por: Tempest#8741</span>
    <div class="embed" style="width:98%;">
        <embedleftline></embedleftline><div class="embedinfo">
        <span class="embed-desc">Exemplo:<br>1000 vira 1.000<br>10000 vira 10.000<br>100000 vira 100.000
    </div>
    <div style="float: left; width: 70%; padding-top: 10px; padding-bottom: 15px;">
        Número:
        <input id="number" class="round" type="text" placeholder="Ex: 1000">
    </div>
  <div style="float: left; width: 35%; padding-top: 8px;">
    Store Result In:<br>
    <select id="storage" class="round" onchange="glob.variableChange(this, 'varNameContainer')">
    ${data.variables[1]}
    </select>
  </div>
  <div id="varNameContainer" style="float: right; display: none; width: 60%; padding-top: 8px;">
    Variable Name:<br>
    <input id="varName" class="round" type="text">
  </div>
  <style>
    .embed {
        position: relative;
    }
    .embedinfo {
        background: rgba(46,48,54,.45) fixed;
        border: 1px solid hsla(0,0%,80%,.3);
        padding: 10px;
        margin:0 4px 0 7px;
        border-radius: 0 3px 3px 0;
    }
    embedleftline {
        background-color: #eee;
        width: 4px;
        border-radius: 3px 0 0 3px;
        border: 0;
        height: 100%;
        margin-left: 4px;
        position: absolute;
    }
    span {
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    }
    span.embed-desc {
        color: rgb(128, 128, 128);
    }
  </style>`;
    },
  
    init() {
      const { glob, document } = this;
      glob.variableChange(document.getElementById('storage'), 'varNameContainer');
    },
  
    async action(cache) {
        const data = cache.actions[cache.index];
        const number = this.evalMessage(data.number, cache);

        result = parseInt(number).toLocaleString("pt-BR");

        const storage = parseInt(data.storage, 10);
        const varName = this.evalMessage(data.varName, cache);
        this.storeValue(result, storage, varName, cache);

      this.callNextAction(cache);
    },
  
    mod() {},
  };
  