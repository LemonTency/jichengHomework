//意图：避免请求发送者与接收者耦合在一起，让多个对象都有可能接收请求，将这些对象连接成一条链，并且沿着这条链传递请求，直到有对象处理它为止。

//主要解决：职责链上的处理者负责处理请求，客户只需要将请求发送到职责链上即可，无须关心请求的处理细节和请求的传递，所以职责链将请求的发送者和请求的处理者解耦了。

//何时使用：在处理消息的时候以过滤很多道。

//如何解决：拦截的类都实现统一接口。

//关键代码：Handler 里面聚合它自己，在 HandlerRequest 里判断是否合适，如果没达到条件则向下传递，向谁传递之前 set 进去。

//应用实例： 1、红楼梦中的"击鼓传花"。 2、JS 中的事件冒泡。 3、JAVA WEB 中 Apache Tomcat 对 Encoding 的处理，Struts2 的拦截器，jsp servlet 的 Filter。
//中间件
abstract class Handler {
  //责任链中的下一个元素
  public nextHandler: Handler

  public abstract handlerResquest(user: string, days: number): void

  public setNextHandler(nextLogger: Handler): void {
    this.nextHandler = nextLogger;
  }

  public getNextHandler(): Handler {
    return this.nextHandler
  }
}

//校长
class Leader extends Handler {
  public handlerResquest(user: string, days: number) {
    if (days >= 30) {
      console.log('校长同意请假')
    } else {
      const nextHandler = this.getNextHandler()
      nextHandler.handlerResquest(user, days)
      //...
    }
  }
}

//主任
class Department extends Handler {
  public handlerResquest(user: string, days: number) {
    if (days > 15) {
      console.log('主任同意请假')
    } else {
      const nextHandler = this.getNextHandler()
      nextHandler.handlerResquest(user, days)
      //...
    }
  }
}

//主任
class Teacher extends Handler {
  public handlerResquest(user: string, days: number) {
    if (days < 15) {
      console.log('老师同意请假')
    } else {
      const nextHandler = this.getNextHandler()
      nextHandler.handlerResquest(user, days)
      //...
    }
  }
}


//工厂函数
class HandleFactory {
  public static create(type: number): Handler {
    switch (type) {
      case 1:
        return new Leader()
      case 2:
        return new Department()
      case 3:
      default:
        return new Teacher()
    }
  }
}



//获取三个不同的处理者对象
const h1: Handler = HandleFactory.create(1)
const h2: Handler = HandleFactory.create(2)
const h3: Handler = HandleFactory.create(3)

h1.setNextHandler(h2)
h2.setNextHandler(h3)

h1.handlerResquest('xiaohao', 999)