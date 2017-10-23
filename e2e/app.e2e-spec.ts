import { PortalqimobadminPage } from './app.po';

describe('portalqimobadmin App', function() {
  let page: PortalqimobadminPage;

  beforeEach(() => {
    page = new PortalqimobadminPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
