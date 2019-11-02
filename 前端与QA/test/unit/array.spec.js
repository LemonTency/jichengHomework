
describe("测试是否是数组", function () {
  it("isArray", function () {
      expect(isArray([2,3,4,5])).toBe(true);
      expect(isArray({a:1})).toBe(false);
  })
});