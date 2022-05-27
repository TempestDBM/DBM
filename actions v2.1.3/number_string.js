module.exports = {
    name: 'Number to String',
    section: 'Other Stuff',

    subtitle(data) {
      return `Converter`;
    },
  
    variableStorage(data, varType) {
      if (parseInt(data.storage, 10) !== varType) return;
      return [data.varName, 'Text'];
    },
  
    fields: ['number', 'palavra','storage', 'varName'],
  
    html(_isEvent, data) {
      return `
  <span>Ação feita por: Tempest#8741</span>
  <div style="float: left; width: 70%; padding-top: 10px; padding-bottom: 15px;">
    Número:
    <input id="number" class="round" type="text" placeholder="Ex: 1">
  </div>
  <div style="float: left; width: 70%; padding-top: 10px; padding-bottom: 15px;">
    Palavra:
    <input id="palavra" class="round" type="text" placeholder="Ex: Teste">
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
      var n = this.evalMessage(data.numero, cache);
      var p = this.evalMessage(data.palavra, cache);
      var result = "undefined";

      n = n.toString().replace(n, p);
      
      result = n;
      
      const storage = parseInt(data.storage, 10);
      const varName = this.evalMessage(data.varName, cache);


        this.storeValue(result, storage, varName, cache);

      this.callNextAction(cache);
    },
  
    mod() {},
  };