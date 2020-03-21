/**
 * @module std
 */

import { requestAsPromise, sendRequest } from './internal/deferred';
import {
  Transform,
  ident,
  stringFromUTF16Bytes,
  valueFromUTF16Bytes,
} from './internal/data';
import { flatbuffers } from './internal/flatbuffers';
import { __std } from './internal/__std_generated';
import { Format } from './write';

export const stdin: unique symbol = Symbol('<stdin>');

/* we re-define Encoding from the generated __std.Encoding to document it */

export enum Encoding {
  Bytes= 0,
  String= 1,
  JSON= 2,
}

export interface ReadOptions {
  encoding?: Encoding;
  format?: Format;
  module?: string;
}

// valuesFormatFromPath guesses, for a path, the format that will
// return all values in a file. In other words, it prefers YAML
// streams and concatenated JSON. You may need to treat the read value
// differently depending on the format you got here, since YAMLStream
// and JSONStream will both result in an array of values.
export function valuesFormatFromPath(path: string): Format {
  const ext = path.split('.').pop();
  switch (ext) {
  case 'yaml':
  case 'yml':
    return Format.YAMLStream;
  case 'json':
    return Format.JSONStream;
  default:
    return Format.FromExtension;
  }
}

type ReadPath = string | typeof stdin;

// read requests the path and returns a promise that will be resolved
// with the contents at the path, or rejected.
export function read(path: ReadPath = stdin, opts: ReadOptions = {}): Promise<any> {
  const { encoding = Encoding.JSON, format = Format.FromExtension, module } = opts;
  const pathArg = (path === stdin) ? '' : path;

  const builder = new flatbuffers.Builder(512);
  const pathOffset = builder.createString(pathArg);
  let moduleOffset = 0;
  if (module !== undefined) {
    moduleOffset = builder.createString(module);
  }
  __std.ReadArgs.startReadArgs(builder);
  __std.ReadArgs.addPath(builder, pathOffset);
  __std.ReadArgs.addEncoding(builder, encoding);
  __std.ReadArgs.addFormat(builder, format);
  if (module !== undefined) {
    __std.ReadArgs.addModule(builder, moduleOffset);
  }
  const argsOffset = __std.ReadArgs.endReadArgs(builder);
  __std.Message.startMessage(builder);
  __std.Message.addArgsType(builder, __std.Args.ReadArgs);
  __std.Message.addArgs(builder, argsOffset);
  const messageOffset = __std.Message.endMessage(builder);
  builder.finish(messageOffset);

  let tx: Transform = ident;
  switch (encoding) {
  case Encoding.String:
    tx = stringFromUTF16Bytes;
    break;
  case Encoding.JSON:
    tx = valueFromUTF16Bytes;
    break;
  default:
    break;
  }

  return requestAsPromise((): null | ArrayBuffer => sendRequest(builder.asArrayBuffer()), tx);
}
