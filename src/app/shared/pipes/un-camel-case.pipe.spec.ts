import { UnCamelCasePipe } from './un-camel-case.pipe';

describe('UnCamelCasePipe', () => {
  it('create an instance', () => {
    const pipe = new UnCamelCasePipe();
    expect(pipe).toBeTruthy();
  });
});
