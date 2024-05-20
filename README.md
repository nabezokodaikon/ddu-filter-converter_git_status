# ddu-column-gitstatus

Git status column for ddu.vim

## Required

### denops.vim

https://github.com/vim-denops/denops.vim

### ddu.vim

https://github.com/Shougo/ddu.vim

### ddu-column-filename

https://github.com/Shougo/ddu-column-filename

## Configuration

```vim
call ddu#custom#patch_global(#{
    \   columns: ['filename', 'git_status'],
    \ })
```

