describe('horseman', function() {
  beforeEach(function() {
    require('horseman');
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
});
