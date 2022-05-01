module.exports = {

    name: 'Cooldown',
    section: 'Other Stuff',

    subtitle(data) {
      return `Cooldown`;
    },
  
    variableStorage(data, varType) {
      if (parseInt(data.storage, 10) !== varType) return;
      return [data.varName, 'Date'];
    },
  
    fields: ['storage', 'varName'],
  
    html(_isEvent, data) {
      return `
  <span>Ação feita por: Tempest#8741</span>
  <div style="float: left; width: 35%; padding-top: 35px;">
    Store Result In:<br>
    <select id="storage" class="round" onchange="glob.variableChange(this, 'varNameContainer')">
    ${data.variables[0]}
    </select>
  </div>
  <div id="varNameContainer" style="float: right; display: none; width: 60%; padding-top: 15px;">
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
      const moment = require('moment');

      var d1 = new Date();
      var d2 = moment(new Date()).add(1, 'days').format("DD/MM/YYYY");
      d2 = d2 + " 00:00:00";
      
      var result = moment(d2, 'DD/MM/YYYY HH:mm:ss').diff(moment(d1, 'DD/MM/YYYY HH:mm:ss'), 'seconds');

        const storage = parseInt(data.storage, 10);
        const varName = this.evalMessage(data.varName, cache);
        this.storeValue(result, storage, varName, cache);

      this.callNextAction(cache);
    },
  
    mod() {},
  };
  