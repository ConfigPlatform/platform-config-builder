import { IActionPayload } from '.';

const returnActionHandler = ({ data, config }: IActionPayload): string => {
  const stringifiedConfig = config ? JSON.stringify(config, null, 2) : 'null';
  const stringifiedData = data ? data.replaceAll('$', '') : 'null';

  const entries = `  return {\n  config: ${stringifiedConfig},\n  data: ${stringifiedData}}`;

  return entries;
};

export default returnActionHandler;
