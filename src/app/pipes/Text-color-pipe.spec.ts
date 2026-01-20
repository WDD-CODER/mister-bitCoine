import { TextColorPipe } from './Text-color-pipe';

describe('GetConTextColorPipe', () => {
  it('create an instance', () => {
    const pipe = new TextColorPipe();
    expect(pipe).toBeTruthy();
  });
});
