module.exports = {
  //---------------------------------------------------------------------
  // Ação modificada por Tempest#8741
  // Ação modificada por Tempest#8741
  // Ação modificada por Tempest#8741
  //---------------------------------------------------------------------

  name: "Store Time Info TimeZone",

  //---------------------------------------------------------------------
  // Ação modificada por Tempest#8741
  // Ação modificada por Tempest#8741
  // Ação modificada por Tempest#8741
  //---------------------------------------------------------------------

  section: "Other Stuff",

  //---------------------------------------------------------------------
  // Ação modificada por Tempest#8741
  // Ação modificada por Tempest#8741
  // Ação modificada por Tempest#8741
  //---------------------------------------------------------------------

  subtitle(data, presets) {
    const time = ["Ano", "Mês", "Dia do Mês", "Hora", "Minuto", "Segundo", "Milisegundo", "Mês Texto"];
    return `${time[parseInt(data.type, 10)]}`;
  },

  //---------------------------------------------------------------------
  // Ação modificada por Tempest#8741
  // Ação modificada por Tempest#8741
  // Ação modificada por Tempest#8741
  //---------------------------------------------------------------------

  variableStorage(data, varType) {
    const type = parseInt(data.storage, 10);
    if (type !== varType) return;
    let result = "Number";
    if (data.type === "7") {
      result = "Text";
    }
    return [data.varName, result];
  },

  //---------------------------------------------------------------------
  // Ação modificada por Tempest#8741
  // Ação modificada por Tempest#8741
  // Ação modificada por Tempest#8741
  // Ação modificada por Tempest#8741
  // Ação modificada por Tempest#8741
  // Ação modificada por Tempest#8741
  //---------------------------------------------------------------------

  meta: { version: "2.1.3", preciseCheck: true, author: null, authorUrl: null, downloadUrl: null },

  //---------------------------------------------------------------------
  // Ação modificada por Tempest#8741
  // Ação modificada por Tempest#8741
  // Ação modificada por Tempest#8741
  //---------------------------------------------------------------------

  fields: ["timezone", "sigla", "type", "storage", "varName"],

  //---------------------------------------------------------------------
  // Ação modificada por Tempest#8741
  // Ação modificada por Tempest#8741
  // Ação modificada por Tempest#8741
  // Ação modificada por Tempest#8741
  // Ação modificada por Tempest#8741
  // Ação modificada por Tempest#8741
  //---------------------------------------------------------------------

  html(isEvent, data) {
    return `
<div>
  <div style="padding-top: 8px; padding-bottom: 8px; width: 70%;">
    <span>Ação modificada por: Tempest#8741</span><br>
  </div>
  <div style="float: left; width: 70%">
	  <span class="dbminputlabel">Timezone</span><a style="margin-left: 5px;" href="https://en.wikipedia.org/wiki/List_of_tz_database_time_zones">Timezones</a><a style="margin-left: 5px;" href="https://www.andiamo.co.uk/resources/iso-language-codes/">Data Languages</a><br>
	  <input id="timezone" class="round" type="text" value="America/Sao_Paulo">
  </div> 
  <div style="float: right; width: 25%">
    <span class="dbminputlabel">Date Language:</span>
    <input id="sigla" class="round" type="text" value="pt-BR">
  </div>
  <br><br><br>
	<div style="padding-top: 8px; width: 70%;">
		<span class="dbminputlabel">Time Info</span><br>
		<select id="type" class="round">
			<option value="0" selected>Ano</option>
			<option value="1">Mês (Número)</option>
			<option value="7">Mês (Texto)</option>
			<option value="2">Dia do mês</option>
			<option value="3">Hora</option>
			<option value="4">Minuto</option>
			<option value="5">Segundo</option>
			<option value="6">Milisegundo</option>
		</select>
	</div>
</div>

<br>

<store-in-variable dropdownLabel="Store In" selectId="storage" variableContainerId="varNameContainer" variableInputId="varName"></store-in-variable>`;
  },

  //---------------------------------------------------------------------
  // Ação modificada por Tempest#8741
  // Ação modificada por Tempest#8741
  // Ação modificada por Tempest#8741
  //---------------------------------------------------------------------

  init() {},

  //---------------------------------------------------------------------
  // Ação modificada por Tempest#8741
  // Ação modificada por Tempest#8741
  // Ação modificada por Tempest#8741
  //---------------------------------------------------------------------

  action(cache) {
    const data = cache.actions[cache.index];
    const type = parseInt(data.type, 10);
    const date = new Date();
    const timezone = this.evalMessage(data.timezone, cache)
    const sigla = this.evalMessage(data.sigla, cache)
    let result;
    switch (type) {
      case 0:
        result = new Intl.DateTimeFormat(sigla, {
          timeZone: timezone
        }).format(date).slice(6, 10);
        break;
      case 1:
        result = new Intl.DateTimeFormat(sigla, {
          timeZone: timezone
        }).format(date).slice(3, 10).slice(0, -5);
        break;
      case 2:
        result = new Intl.DateTimeFormat(sigla, {
          timeZone: timezone
        }).format(date).slice(0, -8);
        break;
      case 3:
        result = new Intl.DateTimeFormat(sigla, {
          timeZone: timezone,
          timeStyle: 'short',
        }).format(date).slice(0, -3);
        break;
      case 4:
        result = new Intl.DateTimeFormat(sigla, {
          timeZone: timezone,
          timeStyle: 'short'
        }).format(date).slice(3, 5);
        break;
      case 5:
        result = date.getSeconds();
        break;
      case 6:
        result = date.getMilliseconds();
        break;
      case 7:
        result = [
          "Janeiro",
          "Fevereiro",
          "Março",
          "Abril",
          "Maio",
          "Junho",
          "Julho",
          "Agosto",
          "Setembro",
          "Outubro",
          "Novembro",
          "Dezembro",
        ][date.getMonth()];
        break;
      default:
        break;
    }
    if (result !== undefined) {
      const storage = parseInt(data.storage, 10);
      const varName = this.evalMessage(data.varName, cache);
      this.storeValue(result, storage, varName, cache);
    }
    this.callNextAction(cache);
  },

  //---------------------------------------------------------------------
  // Ação modificada por Tempest#8741
  // Ação modificada por Tempest#8741
  // Ação modificada por Tempest#8741
  //---------------------------------------------------------------------

  mod() {},
};

//Ação modificada por Tempest#8741