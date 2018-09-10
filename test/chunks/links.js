const { expect } = require('chai');
const { applyCommand } = require('../../src/rich');
const { createWithContent } = require('../../src/state');

describe('link enrichment', () => {
  it('should add a link', () => {
    const state = createWithContent({
      selection: 'foo'
    });
    const result = applyCommand(state, 'link', 'bar');

    expect(result.before).to.eql('[');
    expect(result.after).to.eql('][1]\n\n  [1]: http://bar');
    expect(result.selection).to.eql('foo');
  });

  it('should add a second link', () => {
    const state = createWithContent({
      before: '[foo][1] ',
      selection: 'bar',
      after: '\n\n  [1]: http://baz'
    });
    const result = applyCommand(state, 'link', 'quux');

    expect(result.before).to.eql('[foo][1] [');
    expect(result.after).to.eql(
      '][2]\n\n  [1]: http://baz\n  [2]: http://quux'
    );
    expect(result.selection).to.eql('bar');
  });

  it('should do nothing', () => {
    const state = createWithContent({
      before: '[foo][1] ',
      selection: 'bar',
      after: '\n\n  [1]: http://baz'
    });
    const result = applyCommand(state, 'link', undefined);

    expect(result).to.eql(Object.assign(state, { focus: true }));
  });
});
