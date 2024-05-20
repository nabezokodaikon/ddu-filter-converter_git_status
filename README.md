# ddu-source-git_status

Convert display to git status for ddu.vim.

## Required

### denops.vim

https://github.com/vim-denops/denops.vim

### ddu.vim

https://github.com/Shougo/ddu.vim

### ddu-ui-filer

https://github.com/Shougo/ddu-ui-filer

### ddu-source-file

https://github.com/Shougo/ddu-source-file

### ddu-column-filename

https://github.com/Shougo/ddu-column-filename

## Configuration

```vim
call ddu#start(#{
\   ui: 'filer',
\   sources: [#{ name: 'file' }],
\   sourceOptions: [
\       #{ columns: 'filename' },
\       #{ converters: 'converter_git_status' },
\   ]
\})
```

