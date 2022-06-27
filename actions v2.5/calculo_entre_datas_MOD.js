module.exports = {

    name: 'Calculo Entre Datas',
    section: 'Other Stuff',
    meta: {
      version: '2.1.5',
      preciseCheck: false,
      author: '[Tempest - 321400509326032897]',
      authorUrl: 'https://github.com/DBM-Brazil/mods',
      downloadURL: 'https://github.com/DBM-Brazil/mods',
    },

    subtitle(data) {
      return `Calculando ${data.date}`;
    },
  
    variableStorage(data, varType) {
      if (parseInt(data.storage, 10) !== varType) return;
      return [data.varName, 'Date'];
    },
  
    fields: ['date', 'add', 'addtype', 'calculo', 'storage', 'varName'],
  
    html(_isEvent, data) {
      return `
      <div style="float: left; width: 40%; padding-top: 10px; padding-bottom: 15px;">
      <span class="dbminputlabel" id="txt">Somar</span>
      <select id="addtype" class="round">
          <option value="seculos">Séculos</option>
          <option value="decadas">Décadas</option>
          <option value="y">Anos</option>
          <option value="M">Meses</option>
          <option value="w">Semanas</option>
          <option value="d" selected>Dias</option>
          <option value="h">Horas</option>
          <option value="m">Minutos</option>
          <option value="s">Segundos</option>
      </select>
      </div>
      <div style="float: right; width: 40%; padding-top: 10px; padding-bottom: 15px;">
      <span class="dbminputlabel">Calculo:</span>
      <select id="calculo" class="round" onchange="glob.change(this)">
          <option value="0" selected>Soma</option>
          <option value="1">Subtração</option>
      </select>
      </div>
    <div style="float: left; width: 70%; padding-top: 10px; padding-bottom: 15px;">
    <span class="dbminputlabel">Data</span>
    <input id="date" class="round" type="text" placeholder='22/02/2022 22:22:22 ou "new" para uma nova data.'>
  </div>
  <div style="float: left; width: 70%; padding-top: 10px; padding-bottom: 15px;">
  <span class="dbminputlabel" id="txt2">Valor a somar</span>
    <input id="add" class="round" type="text" placeholder="Ex: 5">
  </div>
  <div style="float: left; width: 35%; padding-top: 8px;">
  <span class="dbminputlabel">Armazenar em</span><br>
    <select id="storage" class="round" onchange="glob.variableChange(this, 'varNameContainer')">
    ${data.variables[1]}
    </select>
  </div>
  <div id="varNameContainer" style="float: right; display: none; width: 60%; padding-top: 8px;">
  <span class="dbminputlabel">Nome da variavel</span><br>
    <input id="varName" class="round" type="text">
  </div>`;
    },
  
    init() {
      const { glob, document } = this;

      glob.change = function() {
          const calculo = parseInt(document.getElementById("calculo").value);

          switch(calculo) {
              case 0:
                  document.getElementById("txt").innerHTML = "Somar";
                  document.getElementById("txt2").innerHTML = "Valor a somar";
                  break;
              case 1:
                  document.getElementById("txt").innerHTML = "Subtrair";
                  document.getElementById("txt2").innerHTML = "Valor a subtrair";
                  break;

          }
      };

      glob.change();
      glob.variableChange(document.getElementById('storage'), 'varNameContainer');
    },
  
    async action(cache) {
        const data = cache.actions[cache.index];
        const moment = require('moment');

        var date = this.evalMessage(data.date, cache);
        console.log(date);
        if(date === "new") {
            date = new Date();
        } else {
            date = moment(date, "DD-MM-YYYY HH:mm:ss");
            console.log(date);
        }
        const calculo = parseInt(this.evalMessage(data.calculo, 10));
        var add = parseInt(this.evalMessage(data.add, cache));
        if(isNaN(parseFloat(add))) {
          console.error("Valor inválido!");
        }
        var opcao = this.evalMessage(data.addtype, cache);

        switch(opcao) {
            case "seculos":
              opcao = "y";
              add = add * 100;
              break;
            case "decadas":
              opcao = "y";
              add = add * 10;
              break;
        }

        switch(calculo) {
            case 0:
              result = moment(date).add(add, opcao);
              break;
            case 1:
              result = moment(date).subtract(add, opcao);
              break;
        }

        const storage = parseInt(data.storage, 10);
        const varName = this.evalMessage(data.varName, cache);
        this.storeValue(result, storage, varName, cache);

      this.callNextAction(cache);
    },
  
    mod() {},
  };
  