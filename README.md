# Ember Confirm Box

This README outlines the details of collaborating on this Ember-Confirmbox-Addon application.
A short introduction of this app could easily go here.

Compatibility
------------------------------------------------------------------------------

* Ember.js v2.18 or above
* Ember CLI v2.13 or above

## Prerequisites


You will need the following things properly installed on your computer.

* [Node.js](https://nodejs.org/) (with npm)
* [Ember CLI](https://ember-cli.com/)

This addon is developed with Ember ```CLI 3.9```

## Installation

`ember install ember-confirmbox-addon`

### Usage

In general, we may have loop of items and each item may need confirmation before taking any final action. In such case, we will have our component in loop that's not suggested and optimize way. As we know at a time only one confirmation will come on the screen. Looping more components in DOM and keeping it may take JSHeap and occupy DetachedDOM. Rather than doing this, we have only one confirm box for the action. We transmite data to the confirmbox.

Let's have an example for better understanding.

### Example

In the example, we have list of tasks. For each task, we have a component called `TaskElement`

###### File#1: app/task/controller.hbs

```javascript
import Controller from '@ember/controller';
import { inject } from "@ember/service";

export default Controller.extend({
  confirmbox: inject(),
  actions: {
    async deleteTask() {
      if (this.confirmbox.selected) {
        this.confirmbox.selected.destroyRecord();
        this.confirmbox.reset();
      }
    },
    closeConfirmbox() {
      this.confirmbox.reset();
    }
  }
});

```
###### File#2: app/task/template.hbs

```html
{{#each model.task as |task|}}
  <TaskElement @task={{task}}>
    {{task.details}}
  </TaskElement>
{{/each}}
<Confirmbox @title="Delete Task" @text="Are you sure?" @confirmButtonText="Confirm" @cancelButtonText="Opp"
  @showCancelButton @onConfirm={{action "deleteTask"}} @onCancel={{action "closeConfirmbox"}} />
```



Here, task has two components. One is `TaskElement` and 2nd is `Confirmbox`.
`TaskElement` component has an action `{{action "setValue" task target=confirmbox}}` to pass data to `Confirmbox`.

Let's see `TaskElement`

###### File#3: app/components/task-element/template.hbs

```html
<article class="blog-post">
  <h1>{{task.title}}</h1>
  <div class="body">{{yield}}</div>
  <button type="button" class="btn btn-default" {{action "setValue" task target=confirmbox}}>Delete</button>
</article>
```
###### File#4: app/components/task-element/component.js

```javascript
import Component from '@ember/component';
import { inject } from "@ember/service";

export default Component.extend({
  confirmationItem: null,
  confirmbox: inject()
});

```
Here you could see, we have a service called `confirmbox`. This is being used in `app/components/task-element/template.hbs`. 

```html
<button type="button" class="btn btn-default" {{action "setValue" task target=confirmbox}}>Delete</button>
```
`{{action "setValue" task target=confirmbox}` will use the method declared in ember-confirmbox-add package which will set current selected object/value.

The moment `{action "setValue" task target=confirmbox}}` action is invoked, the service will update the status of Confirmbox and it will come up.

Based on the confirmbox action (confirm/cancel), it will invoke the action passed in `@onConfirm` or `@onCancel`.

```html
<Confirmbox @title="Delete Task" @text="Are you sure?" @confirmButtonText="Confirm" @cancelButtonText="Opp"
  @showCancelButton @onConfirm={{action "deleteTask"}} @onCancel={{action "closeConfirmbox"}} />
```

| Props | Description | Required | Default
| --- | --- | --- | --- |
| title | Title of the confirmbox | true
| text | Text to set after the title | false
| onConfirm | This is action handler when user choose confirm this will need an action to handle further process | true
| onCancel | This is action handler when user choose cancel this will need an action to handle further process | true
|confirmText | Set your confirm button text | false | Okay
|cancelText | Set your cancel button text | false | Cancel
| cancelClass| Set css class on cancel button | false | btn-default
| confirmClass| Set css class on confirm button | false | btn-primary
| showCancelBtn | Show Cancel button. You just need to declare prop in component, it will consider as `true` if you mentioned the prop. | false | N/A

| Action | Description |
| --- | --- |
| setValue | Current object/value in cofirmbox

Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
