import Service from '@ember/service';

export default Service.extend({
  selected: null,
  setValue(arg) {
    this.set("selected", arg);
  },
  reset() {
    this.set("selected", null);
  }
});
