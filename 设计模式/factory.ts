//工厂模式中，我们在创建对象时不会对客户端暴露创建逻辑，并且是通过使用一个共同的接口来指向新创建的对象，用工厂方法代替new操作的一种模式。
//定义一个创建对象的接口，让其子类自己决定实例化哪一个工厂类，工厂模式使其创建过程延迟到子类进行。
//用ts实现的思路可以参照这个链接  https://www.runoob.com/design-pattern/factory-pattern.html

abstract class INoodles {
  public abstract desc(): void
}

class LZNoodles extends INoodles {
  desc(): void {
    console.log('我是兰州拉面')
  }
}

class ZJmian extends INoodles {
  desc(): void {
    console.log('我是炸酱面')
  }
}

class BiangBiangMian extends INoodles {
  desc(): void {
    console.log('我是biangbiang面')
  }
}


class NoodlesFactory {
  public static create(type: number): INoodles {
    switch (type) {
      case 1:
        return new LZNoodles()
      case 2:
        return new ZJmian()
      case 3:
      default:
        return new BiangBiangMian()
    }
  }
}

const noodles: INoodles = NoodlesFactory.create(1)
noodles.desc()