module.exports = {
    name: 'Remover acentos',
    section: 'Other Stuff',

    subtitle(data) {
      return `Remover`;
    },
  
    variableStorage(data, varType) {
      if (parseInt(data.storage, 10) !== varType) return;
      return [data.varName, 'Text'];
    },
  
    fields: ['palavra', 'espacos', 'capslock', 'storage', 'varName'],
  
    html(_isEvent, data) {
      return `
  <span>Ação feita por: Tempest#8741</span>
  <div style="float: left; width: 70%; padding-top: 10px; padding-bottom: 15px;">
    Palavra:
    <input id="palavra" class="round" type="text" placeholder="Ex: Áá">
  </div>
  <div style="padding-top: 8px; width: 70%;">
    <span class="dbminputlabel">Remover espaços:</span><br>
      <select id="espacos" class="round">
        <option value="0">Sim</option>
        <option value="1" selected>Não</option>
      </select>
  </div>
  <br>
  <div style="padding-top: 8px; width: 70%;">
    <span class="dbminputlabel">Ignorar CapsLock:</span><br>
      <select id="capslock" class="round">
        <option value="0">Sim</option>
        <option value="1" selected>Não</option>
      </select>
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
      var palavra = this.evalMessage(data.palavra, cache);
      const type = parseInt(data.espacos, 10);
      const typeCapsLock = parseInt(data.capslock, 10);

      var result = "undefined";

      var acentos = [
        "á",
        "à",
        "ã",
        "â",
        "é",
        "è",
        "ê",
        "í",
        "ì",
        "î",
        "ó",
        "ò",
        "õ",
        "ô",
        "ú",
        "ù",
        "û",
        "ç",
        "ñ",
        "Á",
        "À",
        "Ã",
        "Â",
        "É",
        "È",
        "Ê",
        "Í",
        "Ì",
        "Î",
        "Ó",
        "Ò",
        "Õ",
        "Ô",
        "Ú",
        "Ù",
        "Û",
        "Ç",
        "Ñ",
      ]

     var substituir = [
        "a",
        "a",
        "a",
        "a",
        "e",
        "e",
        "e",
        "i",
        "i",
        "i",
        "o",
        "o",
        "o",
        "o",
        "u",
        "u",
        "u",
        "c",
        "n",
        "a",
        "a",
        "a",
        "a",
        "e",
        "e",
        "e",
        "i",
        "i",
        "i",
        "o",
        "o",
        "o",
        "o",
        "u",
        "u",
        "u",
        "c",
        "n",
      ]


      switch(type) {
          case 0:
              acentos.push(" ");
              substituir.push("-");
              break;
          case 1:
              break;
      }

      switch(typeCapsLock) {
          case 0:
            break;
          case 1:
            palavra = palavra.toString().toLowerCase(); 
      }

      for(var loop = 0; loop < 10; loop++) {
        for(var i = 0; i < acentos.length; i++) {
                palavra = palavra.replace(acentos[i], substituir[i])
        }
      }

      result = palavra;

      const storage = parseInt(data.storage, 10);
      const varName = this.evalMessage(data.varName, cache);


        this.storeValue(result, storage, varName, cache);

      this.callNextAction(cache);
    },
  
    mod() {},
  };