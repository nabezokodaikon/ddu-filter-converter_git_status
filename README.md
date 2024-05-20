# ddu-source-git_status

Convert display to git status for ddu.vim.

## Required

### denops.vim

https://github.com/vim-denops/denops.vim

### ddu.vim

https://github.com/Shougo/ddu.vim

### ddu-ui-filer

https://github.com/Shougo/ddu-ui-filer

## Configuration

```vim
call ddu#start(#{
\   ui: 'filer',
\   sources: [#{ name: 'git_status' }],
\   sourceOptions: [#{ converters: 'converter_git_status' }]
\ })
```

