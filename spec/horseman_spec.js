describe('horseman', function() {
  var horseman;
  beforeEach(function() {
    horseman = require('horseman');
  });

  it('creates a user agent', function() {
    expect(window.navigator.userAgent).toBeDefined();
  });

  it('creates a document', function() {
    expect(window.document.body).toBeDefined();
  });

  it('creates a fake history', function() {
    window.history.pushState({}, '', 'foo/bar.html');
    expect(window.location.pathname).toEqual('foo/bar.html');
  });

  it('can load markup from a file', function() {
    horseman.buildWindow('markup/index.html')
    expect(window.document.getElementById('content').innerHTML).toEqual('content');
  });

  it('autoloads files or functions', function() {
    horseman.autoReload('jquery-1.6.2.js', function() {
      global.wasCalled = true;
    });
    horseman.buildWindow();
    horseman.buildWindow();
    expect(window.$).toBeDefined();
    expect(global.wasCalled).toEqual(true);
  });
});
