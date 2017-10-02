Follow these steps[http://shripalsoni.com/blog/configure-eslint-in-visual-studio-code/] 
to enable ESLINT in VS Code.

Go to files->preferences->settings and add these two lines - 
{
    "eslint.enable": true,
    "eslint.run": "onSave",    
    "eslint.autoFixOnSave": true
}
Now when you save the file will be linted automatically.