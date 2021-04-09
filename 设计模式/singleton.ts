//单例模式
//一个类仅有一个实例
//单例模式的主要思想就是，实例如果已经创建，则直接返回这个已经创建好的按钮
//当我们点击登陆按钮的时候，会弹出浮窗让我们填信息，此时就算再点多几次登陆按钮，这个浮窗还是只会有一个
class Singleton {
  private static instance: Singleton = null
  constructor() { }
  public static getInstance(): Singleton {
    if (this.instance === null) {
      this.instance = new Singleton()
    }
    return this.instance
  }
}