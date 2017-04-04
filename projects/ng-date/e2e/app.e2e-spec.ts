import { NgDateDevoxx2017Page } from './app.po';

describe('ng-date-devoxx2017 App', function() {
  let page: NgDateDevoxx2017Page;

  beforeEach(() => {
    page = new NgDateDevoxx2017Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
