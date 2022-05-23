module.exports = {

    name: 'Backup',
    section: 'Other Stuff',

    meta: { 
      version: "2.1.2", 
      preciseCheck: true, 
      author: "Tempest#8741", 
      authorUrl: null, 
      downloadUrl: "https://github.com/TempestDBM"
    },

    subtitle(data) {
      return `Backup ${data.pastaBackup}`;
    },

    fields: ['pastaBackup', 'backupNome', 'log', 'nextAction'],
  
    html(_isEvent, data) {
      return `
  <span>Ação feita por: Tempest#8741</span>
  <div style="float: left; width: 70%; padding-top: 10px; padding-bottom: 15px;">
    Pasta a fazer Backup:
    <input id="pastaBackup" class="round" type="text" placeholder="Ex: data">
  </div>
  <div style="float: left; width: 70%; padding-top: 10px; padding-bottom: 15px;">
    Nome do Backup:
    <input id="backupNome" class="round" type="text" placeholder="Ex: backup">
  </div>
  <div style="float: left; width: 70%; padding-top: 10px; padding-bottom: 15px;">
  Log no console:
  <select id="log" class="round">
      <option value="0" selected>Sim</option>
      <option value="1">Não</option>
  </select>
  </div>
  <div style="float: left; width: 70%; padding-top: 10px; padding-bottom: 15px;">
  Chamar próxima action:
  <select id="nextAction" class="round">
      <option value="0" selected>Sim</option>
      <option value="1">Não</option>
  </select>
  </div>`;
    },
  
    init() {
      const { glob, document } = this;
      glob.variableChange(document.getElementById('storage'), 'varNameContainer');
    },
  
    async action(cache) {
        const data = cache.actions[cache.index];
        const zip = require('zip-local');

        var pastaBackup = this.evalMessage(data.pastaBackup, cache);
        pastaBackup = "./" + pastaBackup.toString().replace("./", "");
        var backupNome = this.evalMessage(data.backupNome, cache);
        backupNome = backupNome.toString().replace(".zip", "").replace(".rar", "") + ".zip";
        const log = parseInt(data.log, 10);
        const nextAction = parseInt(data.nextAction, 10);

        zip.sync.zip(pastaBackup).compress().save(backupNome);

        switch (log) {
          case 0:
              console.log("Backup feito com sucesso!");
            break;
          case 1:
            break;
        }

        switch (nextAction) {
            case 0:
                this.callNextAction(cache);
              break;
            case 1:
                this.endActions(cache);
              break;
          }
    },
  
    mod() {},
  };
  