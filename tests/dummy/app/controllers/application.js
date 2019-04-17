import Controller from '@ember/controller';
import { inject } from '@ember/service';
export default Controller.extend({
  confirmbox: inject(),
  actions: {
    async onConfirm() {
      if (this.confirmbox.selected) {
        // this.confirmationItem.destroyRecord();
        console.log("selected Object Confirmed:", this.confirmbox.selected);
        this.confirmbox.reset();
      }
    },
    closeConfirmbox() {
      this.confirmbox.reset()
    }
  }
});
