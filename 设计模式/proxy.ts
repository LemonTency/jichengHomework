//代理模式就是为了给对象提供一个代用品或者占位符，以便控制对他对访问
//对真正对用户来说，代理内部的逻辑我不需要知道，我只需要知道要把我想操作的对象/目标传递进去，然后就能做相对应的操作了或者说用户可能并不知道的是本体还是代理对象
//本体对象和代理对象拥有相同的方法

interface IUserDao {
  save(): void
}


class UserDao implements IUserDao {
  public save() {
    console.log('savle')
  }
}

class ProxyUserDao implements IUserDao {
  private target: IUserDao
  constructor(target) {
    this.target = target
  }
  save(): void {
    console.log('代理对象save')
    this.target.save()
  }
}

const target = new UserDao()
const proxy = new ProxyUserDao(target)
proxy.save()