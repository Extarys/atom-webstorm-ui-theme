'use babel';

import AtomWebstormUiThemeView from './atom-webstorm-ui-theme-view';
import { CompositeDisposable } from 'atom';

export default {

  atomWebstormUiThemeView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.atomWebstormUiThemeView = new AtomWebstormUiThemeView(state.atomWebstormUiThemeViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.atomWebstormUiThemeView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-webstorm-ui-theme:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.atomWebstormUiThemeView.destroy();
  },

  serialize() {
    return {
      atomWebstormUiThemeViewState: this.atomWebstormUiThemeView.serialize()
    };
  },

  toggle() {
    console.log('AtomWebstormUiTheme was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
