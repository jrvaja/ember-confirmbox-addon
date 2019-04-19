import Component from '@ember/component';

export default Component.extend({
  actions: {
    confirmHandler(args) {
      console.log("Confirm Inline.js component", args);
    },
    cancelHandler() {
      console.log("cancel Inline.js component");
    }
  }
});
