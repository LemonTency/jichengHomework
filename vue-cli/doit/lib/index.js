module.exports = function mainDoIt() {
  const { program } = require('commander')

  program.command('init', '初始化')
    .version(require('../package').version)
  // program
  //   .option('-d, --debug', 'output extra debugging')
  //   .option('-s, --small', 'small pizza size')
  //   .option('-p, --pizza-type <type>', 'flavour of pizza', 'blue')
  //   .version('0.0.1')

  program.parse();

  // const options = program.opts();
  // // console.log(`${options.cheese}`)
  // if (options.debug) console.log(options);
  // console.log('pizza details:');
  // if (options.small) console.log('- small pizza size');
  // if (options.pizzaType) console.log(`- ${options.pizzaType}`)
}