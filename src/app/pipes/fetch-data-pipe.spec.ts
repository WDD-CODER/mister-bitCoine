import { FetchData } from './fetch-data-pipe';

describe('FetchDataPipe', () => {
  it('create an instance', () => {
    const pipe = new FetchData();
    expect(pipe).toBeTruthy();
  });
});
