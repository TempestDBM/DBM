module.exports = {
  name: 'Send Message to Console',
  section: 'Other Stuff',
  meta: {
    version: '2.1.3',
    preciseCheck: false,
  },

  subtitle(data) {
    if (data.tosend.length > 0) {
      return `<font color="${data.color}">${data.tosend}</font>`;
    }
    return 'Please enter a message!';
  },

  fields: ['tosend', 'color'],

  html() {
    return `
<div style="padding-top: 8px;">
  Message to send:<br>
  <textarea id="tosend" rows="4" style="width: 99%; font-family: monospace; white-space: nowrap; resize: none;"></textarea>
</div>`;
  },

  init() {},

  async action(cache) {
    const data = cache.actions[cache.index];
    const send = this.evalMessage(data.tosend, cache);

    console.log(send);
    this.callNextAction(cache);
  },

  mod(DBM) {
    DBM.Actions['Send Message to Console (Logs)'] = DBM.Actions['Send Message to Console'];
  },
};
