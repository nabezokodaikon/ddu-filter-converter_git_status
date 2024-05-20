import {
  dirname,
  join,
} from 'https://deno.land/std/path/mod.ts';
import {
  BaseFilter,
  DduItem,
  SourceOptions,
} from "https://deno.land/x/ddu_vim@v3.6.0/types.ts";
import {
  Denops
} from "https://deno.land/x/ddu_vim@v3.6.0/deps.ts";

const cwd = Deno.cwd();
const command = new Deno.Command(
  "git", {
    args: ["status", "-s"]
  }
);
const textDecoder = new TextDecoder();

export class Filter extends BaseFilter<Params> {
  override filter(args: {
    denops: Denops;
    sourceOptions: SourceOptions;
    input: string;
    items: DduItem[];
  }): Promise<DduItem[]> {

    const { code, stdout } = command.outputSync();
    if (code === 0) {
      Promise.resolve(args.items);  
    }

    const text = textDecoder.decode(stdout);
    const dataArray = text.split(/\n/).map(line => {
      const path = line.substring(3);
      const status = line.substring(0, 2);
      const pathArray: string[] = [join(cwd, path)];

      let dir = path;
      while (true) {
        dir = dirname(dir);
        if (dir != ".") {
          pathArray.push(join(cwd, dir));
        } else {
          break;
        }
      }

      return {
        Status: status,
        PathArray: pathArray,
      };
    });

    return Promise.resolve(args.items.map(item => {
      for (let i = 0; i < dataArray.length; i++) {
        const data = dataArray[i];

        for (let j = 0; j < data.PathArray.length; j++) {
          const dataPath = data.PathArray[j];

          // if (dataPath == item.action.path) {
          //   item.display = item.display.replace(item.word, `[${data.Status}] ${item.word}`);
          //
          //   item.highlights.push(
          //     {
          //       name: "gitStatus",
          //       hl_group: "Special",
          //       col: item.__level + 3,
          //       width: 4,
          //     }
          //   );
          //
          //   item.highlights.forEach(hl => {
          //     if (hl.name == "column-filename-directory-name") {
          //       hl.col += 5
          //       return;
          //     }
          //   });
          //
          //   return item;
          // }

          if (dataPath == item.action.path) {
            item.display = item.display
              .replace(item.word, `${item.word} [${data.Status}]`);

            item.highlights.push(
              {
                name: "gitStatus",
                hl_group: "Special",
                col: item.display.trimEnd().length - 3,
                width: 4,
              }
            );

            return item;
          }
        }
      }

      return item;
    })); 
  }

  override params(): Params {
    return {};
  }
}

