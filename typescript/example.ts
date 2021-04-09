class Student {
    fullName: string;
    constructor(public firstName: string, public middleInitial: string, public lastName: string) {
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
}

interface Person {
    firstName: string;
    lastName: string;
}

function greeter(person: Person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}

let user = new Student("Jane", "M.", "User");
let a: number = 23;//十进制
let b: number = 0x23;//十六进制
let c: number = 0b10100;//二进制
let d: number = 0o24;//八进制
let myName: string = 'tency';
let age: number = 23;
enum Color {Red, Green, Blue}
let green: Color = Color.Green
let sentences = `my name is ${myName} ,


my age is ${age}`;


interface Square {
    color: string,
    area: number
  }
  
  interface SquareConfig {
    color?: string
    width?: number
  }
  
  function createSquare (config: SquareConfig): Square {
    let newSquare = {color: 'white', area: 100}
    if (config.color) {
      newSquare.color = config.color
    }
    if (config.width) {
      newSquare.area = config.width * config.width
    }
    return newSquare
  }
  
  let mySquare = createSquare({color: 'black'})



console.log(sentences)
console.log(Color,'green')
console.log(a,b,c,d)
console.log(greeter(user));
console.log('kkkk',mySquare)