module.exports = {

    name: 'Diferença entre Datas',
    section: 'Other Stuff',

    subtitle(data) {
      return `Calcular ${data.time}`;
    },
  
    variableStorage(data, varType) {
      if (parseInt(data.storage, 10) !== varType) return;
      return [data.varName, 'Date'];
    },
  
    fields: ['time', 'storage', 'varName'],
  
    html(_isEvent, data) {
      return `
  <span>Ação feita por: Tempest#8741</span>
  <div style="float: left; width: 70%; padding-top: 10px; padding-bottom: 15px;">
    Data inicial:
    <input id="time" class="round" type="text" placeholder="22/02/2022 22:22:22">
  </div>
  <div style="float: left; width: 35%; padding-top: 8px;">
    Store Result In:<br>
    <select id="storage" class="round" onchange="glob.variableChange(this, 'varNameContainer')">
    ${data.variables[0]}
    </select>
  </div>
  <div id="varNameContainer" style="float: right; display: none; width: 60%; padding-top: 8px;">
    Variable Name:<br>
    <input id="varName" class="round" type="text">
  </div>`;
    },
  
    init() {
      const { glob, document } = this;
      glob.variableChange(document.getElementById('storage'), 'varNameContainer');
    },
  
    async action(cache) {
      const data = cache.actions[cache.index];
      const time = this.evalMessage(data.time, cache);
      const moment = require('moment');

        const d1 = time;
        const d2 = new Date();

        result = moment(d2, 'DD/MM/YYYY HH:mm:ss').diff(moment(d1, 'DD/MM/YYYY HH:mm:ss'), 'seconds');

        const storage = parseInt(data.storage, 10);
        const varName = this.evalMessage(data.varName, cache);
        this.storeValue(result, storage, varName, cache);

      this.callNextAction(cache);
    },
  
    mod() {},
  };
  