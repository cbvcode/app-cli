#!/usr/bin/env node
const { program } = require('commander');
const { execSync } = require('child_process');

program
  .command('init')
  .option('-t, --template <template>', 'Template to use')
  .option('-p, --password <password>', 'Password for use')
  .action((options) => {
    const template = options.template;
    const pass = options.password;

    if (!pass || pass !== 'pass123') {
      console.error('Authentication error: Invalid password or password not specified');
      return;
    }

    if (template === 'apps') {
      // execSync('npx create-next-app@latest my-app --example @your-username/your-package-name', { stdio: 'inherit' });
      execSync('npx create-next-app@latest app', { stdio: 'inherit' });
    } else {
      console.error('Invalid template');
    }
  });

program.parse(process.argv);