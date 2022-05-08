export default class AbstractView {
  constructor (params) {
    this.params = params
  };

  async addHandlers () {};

  async getHtml () {
    return ''
  };
}
