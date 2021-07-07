1. 变量提升效果

在jest文件中，如果逻辑没有被before* 或者 after* 或者 it 包裹
那么jest会按照从上往下的顺序执行，即使他们在不同的describe块中

```js
describe('outer', () => {
  console.log('describe outer-a');

  beforeAll(() => {
      console.log("3333333333");
  });

  describe('describe inner 1', () => {
    console.log('describe inner 1');
    test('test 1', () => {
      console.log('test for describe inner 1');
      expect(true).toEqual(true);
    });
  });

  console.log('describe outer-b');

  test('test 1', () => {
    console.log('test for describe outer');
    expect(true).toEqual(true);
  });

  describe('describe inner 2', () => {
    console.log('describe inner 2');
    test('test for describe inner 2', () => {
      console.log('test for describe inner 2');
      expect(false).toEqual(false);
    });
  });

  console.log('describe outer-c');
});

// describe outer-a
// describe inner 1
// describe outer-b
// describe inner 2
// describe outer-c
// 3333333333
// test for describe inner 1
// test for describe outer
// test for describe inner 2
```

2. mock操作要放到最外层，不能放在describe内部
```js
jest.mock方法必须放在最外层，不被describe或者it包裹
```
