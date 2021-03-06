const { expect } = require('chai');
const { applyCommand } = require('../../src/rich');
const { createWithContent } = require('../../src/state');

describe('code enrichment', () => {
  it('should apply code', () => {
    const state = createWithContent({
      before: 'foo ',
      selection: 'bar',
      after: ' baz'
    });
    const result = applyCommand(state, 'code');

    expect(result.before).to.eql('foo `');
    expect(result.selection).to.eql('bar');
    expect(result.after).to.eql('` baz');
  });

  it('should remove code', () => {
    const state = createWithContent({
      before: 'foo `',
      selection: 'bar',
      after: '` baz'
    });
    const result = applyCommand(state, 'code');

    expect(result.before).to.eql('foo ');
    expect(result.selection).to.eql('bar');
    expect(result.after).to.eql(' baz');
  });

  it('should apply code block', () => {
    const state = createWithContent({
      before: 'foo\n',
      selection: '',
      after: '\nbaz'
    });
    const result = applyCommand(state, 'code');

    expect(result.before).to.eql('foo\n\n```\n');
    expect(result.selection).to.eql('');
    expect(result.after).to.eql('\n```\n\nbaz');
  });

  it('should remove code block', () => {
    const state = createWithContent({
      before: 'foo\n```\n',
      selection: '',
      after: '\n```\nquux'
    });
    const result = applyCommand(state, 'code');

    expect(result.startTag).to.eql('');
    expect(result.endTag).to.eql('');
    expect(result.before).to.eql('foo\n');
    expect(result.selection).to.eql('');
    expect(result.after).to.eql('\nquux');
  });
});
