var inquirer = require('inquirer');
var chalk = require('chalk');
const ora = require('ora');

inquirer
  .prompt([
    /* Pass your questions in here */
    {
      type: 'confirm',
      message: '你想要口罩嘛',
      name: 'ok'
    },
    {
      type: 'input',
      message: '你想要多少个口罩',
      name: 'many'
    },
  ])
  .then(answers => {
    // Use user feedback for... whatever!!
    if (answers.ok) {
      console.log(chalk.green('给你一百个'))
    } else {
      console.log(chalk.green('不要就算了'))
    }
    if (answers.many) {
      console.log(chalk.green(`你要个${answers.many}口罩`))
    }

    const spinner = ora('Loading unicorns').start();

    setTimeout(() => {
      spinner.stop()
    }, 5000);
  })
  .catch(error => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });