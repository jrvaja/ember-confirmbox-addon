import Service from '@ember/service';

export default Service.extend({
  selected: null,
  activator: null,
  setValue(arg, activator) {
    this.set("activator", activator);
    this.set("selected", arg);
    document.querySelector('body').style.overflow = 'hidden';
  },
  reset() {
    this.set("selected", null);
    this.set("activator", null);
    document.querySelector('body').style.overflow = 'initial';
  }
});
