import { expect } from 'chai';
import '../../src/index';

describe('HTML Normalizer tests', () => {
  it.skip('text & <', () => {
    let dom = new DOMParser().parseFromString('<div>&amp;&lt;123&456<789;&&</div>', 'text/html');
    expect(dom.toString()).to.eq('<div>&amp;&lt;123&amp;456&lt;789;&amp;&amp;</div>');

    dom = new DOMParser().parseFromString('<div><123e>&<a<br/></div>', 'text/html');
    expect(dom.toString()).to.eq('<div>&lt;123e>&amp;&lt;a<br/></div>');

    dom = new DOMParser().parseFromString('<div>&nbsp;&copy;&nbsp&copy</div>', 'text/html');
    expect(dom.toString()).to.eq('<div>\u00a0\u00a9&amp;nbsp&amp;copy</div>');

    dom = new DOMParser().parseFromString('<html xmlns:x="1"><body/></html>', 'text/html');
    expect(dom.toString()).to.eq('<html xmlns:x="1"><body></body></html>');
  });

  it('attr', () => {
    let dom = new DOMParser().parseFromString('<html test="a<b && a>b && \'&amp;&&\'"/>', 'text/html');
    expect(dom.toString()).to.eq(
      '<html test="a&lt;b &amp;&amp; a>b &amp;&amp; \'&amp;&amp;&amp;\'" xmlns="http://www.w3.org/1999/xhtml"></html>',
    );

    dom = new DOMParser().parseFromString('<div test="alert(\'<br/>\')"/>', 'text/html');
    expect(dom.toString()).to.eq('<div test="alert(\'&lt;br/>\')" xmlns="http://www.w3.org/1999/xhtml"></div>');

    dom = new DOMParser().parseFromString('<div test="a<b&&a< c && a>d"></div>', 'text/html');
    expect(dom.toString()).to.eq(
      '<div test="a&lt;b&amp;&amp;a&lt; c &amp;&amp; a>d" xmlns="http://www.w3.org/1999/xhtml"></div>',
    );

    dom = new DOMParser().parseFromString('<div a=& bb c d=123&&456/>', 'text/html');
    expect(dom.toString()).to.eq(
      '<div a="&amp;" bb="bb" c="c" d="123&amp;&amp;456" xmlns="http://www.w3.org/1999/xhtml"></div>',
    );

    dom = new DOMParser().parseFromString('<div a=& a="&\'\'" b/>', 'text/html');
    expect(dom.toString()).to.eq('<div a="&amp;\'\'" b="b" xmlns="http://www.w3.org/1999/xhtml"></div>');
  });

  it('attrQute', () => {
    let dom = new DOMParser().parseFromString('<html test="123"/>', 'text/html');
    expect(dom.toString()).to.eq('<html test="123" xmlns="http://www.w3.org/1999/xhtml"></html>');

    dom = new DOMParser().parseFromString('<Label onClick=doClick..">Hello, World</Label>', 'text/html');
    expect(dom.toString()).to.eq(
      '<Label onClick="doClick.." xmlns="http://www.w3.org/1999/xhtml">Hello, World</Label>',
    );
  });

  it('unclosed', () => {
    let dom = new DOMParser().parseFromString('<html><meta><link><img><br><hr><input></html>', 'text/html');
    expect(dom.toString()).to.eq(
      '<html xmlns="http://www.w3.org/1999/xhtml"><meta/><link/><img/><br/><hr/><input/></html>',
    );

    dom = new DOMParser().parseFromString('<html title =1/2></html>', 'text/html');
    expect(dom.toString()).to.eq('<html title="1/2" xmlns="http://www.w3.org/1999/xhtml"></html>');

    dom = new DOMParser().parseFromString('<html title= 1/>', 'text/html');
    expect(dom.toString()).to.eq('<html title="1" xmlns="http://www.w3.org/1999/xhtml"></html>');

    dom = new DOMParser().parseFromString('<html title = 1/>', 'text/html');
    expect(dom.toString()).to.eq('<html title="1" xmlns="http://www.w3.org/1999/xhtml"></html>');

    dom = new DOMParser().parseFromString('<html title/>', 'text/html');
    expect(dom.toString()).to.eq('<html title="title" xmlns="http://www.w3.org/1999/xhtml"></html>');

    dom = new DOMParser().parseFromString('<html><meta><link><img><br><hr><input></html>', 'text/html');
    expect(dom.toString()).to.eq(
      '<html xmlns="http://www.w3.org/1999/xhtml"><meta/><link/><img/><br/><hr/><input/></html>',
    );
  });

  it.skip('script', () => {
    let dom = new DOMParser().parseFromString('<script>alert(a<b&&c?"<br>":">>");</script>', 'text/html');
    expect(dom.toString()).to.eq('<script xmlns="http://www.w3.org/1999/xhtml">alert(a<b&&c?"<br>":">>");</script>');

    dom = new DOMParser().parseFromString('<script>alert(a<b&&c?"<br>":">>");</script>', 'text/xml');
    expect(dom.toString()).to.eq(
      '<script xmlns="http://www.w3.org/1999/xhtml">alert(a&lt;b&amp;&amp;c?"<br/>":">>");</script>',
    );

    dom = new DOMParser().parseFromString('<script>alert(a<b&&c?"<br/>":">>");</script>', 'text/html');
    expect(dom.toString()).to.eq('<script xmlns="http://www.w3.org/1999/xhtml">alert(a<b&&c?"<br/>":">>");</script>');

    dom = new DOMParser().parseFromString('<script src="./test.js"/>', 'text/html');
    expect(dom.toString()).to.eq('<script src="./test.js" xmlns="http://www.w3.org/1999/xhtml"></script>');
  });

  it.skip('textarea', () => {
    let dom = new DOMParser().parseFromString('<textarea>alert(a<b&&c?"<br>":">>");</textarea>', 'text/html');
    expect(dom.toString()).to.eq(
      '<textarea xmlns="http://www.w3.org/1999/xhtml">alert(a&lt;b&amp;&amp;c?"&lt;br>":">>");</textarea>',
    );

    dom = new DOMParser().parseFromString('<textarea>alert(a<b&&c?"<br>":">>");</textarea>', 'text/xml');
    expect(dom.toString()).to.eq(
      '<textarea xmlns="http://www.w3.org/1999/xhtml">alert(a&lt;b&amp;&amp;c?"<br/>":">>");</textarea>',
    );
  });
});
