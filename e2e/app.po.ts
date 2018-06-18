import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getCollapseComponentButton() {
    return element(by.cssContainingText('button', 'Open Text'));
  }

  getCollapseComponentButtonClose() {
    return element(by.cssContainingText('button', 'Collapse Box'));
  }

  getCollapseComponent() {
    return element(by.tagName('collapse'));
  }

  getInformationPanel() {
    return element(by.css('button.link-btn'));
  }

  getOpenInformationPanel() {
    return element(by.css('div.information-panel'));
  }

  getButtonByText(myText: string) {
    return element(by.cssContainingText('button', myText));
  }

  getModalPanel() {
    return element(by.css('modal-panel'));
  }

  getExpandedModalPanel() {
    return element(by.css('div.modal-detail-container'));
  }

  getH2ByText(myText: string) {
    return element(by.cssContainingText('h2', myText));
  }

}
