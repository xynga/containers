import { AppPage } from './app.po';

describe('testing App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should open the collapse component when the button is clicked', () => {
    page.navigateTo();
    page.getCollapseComponent().getAttribute('ng-reflect-is-active').then(data => {
      expect(data).toEqual('false');
    });
    page.getCollapseComponentButton().click();
    page.getCollapseComponent().getAttribute('ng-reflect-is-active').then(data => {
      expect(data).toEqual('true');
    });
    page.getCollapseComponentButtonClose().click();
    page.getCollapseComponent().getAttribute('ng-reflect-is-active').then(data => {
      expect(data).toEqual('false');
    });
  });
  it('should open the information panel when clicked', () => {
    page.navigateTo();
    page.getOpenInformationPanel().getAttribute('class').then(data => {
      expect(data).not.toContain('active');
    });
    page.getInformationPanel().click();
    page.getOpenInformationPanel().getAttribute('class').then(data => {
      expect(data).toContain('active');
    });
  });
  it('should open model panel and extended modal panel', () => {
    page.navigateTo();
    page.getButtonByText('Toggle Modal On').click();
    page.getModalPanel().getAttribute('ng-reflect-open').then(data => {
      expect(data).toEqual('true');
    });
    page.getButtonByText('Expand Modal').click();
    page.getExpandedModalPanel();
    // If All these buttons are found and successfully clicked in order the test passes
  });
  it('Open Tooltip 1', () => {
    page.navigateTo();
    page.getButtonByText('Show Tooltip 1').click();
    page.getH2ByText('Tooltip 1 - Top Left');
  });

  it('Open Tooltip 2', () => {
    page.navigateTo();
    page.getButtonByText('Show Tooltip 2').click();
    page.getH2ByText('Tooltip 2 - Top Right');
  });

  it('Open Tooltip 3', () => {
    page.navigateTo();
    page.getButtonByText('Show Tooltip 3').click();
    page.getH2ByText('Tooltip 3 - Bottom Left');
  });

  it('Open Tooltip 4', () => {
    page.navigateTo();
    page.getButtonByText('Show Tooltip 4').click();
    page.getH2ByText('Tooltip 4 - Bottom Right');
  });

});
