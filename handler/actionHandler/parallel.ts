import { IParallelAction } from "_config/config.handler";
import { TCreateActionHandler } from "./index";

const parallelActionHandler: any = (actions: {
    type: 'select',
    entityName: 'product' | 'client' | 'invoice' ,
    where: [string, string],
    assignVar: string,
  }[]) => {
    return `
    async function(){
    const result = await Promise.all(${actions}.map(async (action) => {
      const data = await dataSource
          .createQueryBuilder()
          .select('*')
          .from(action.entityName)
          .where(action.where[0] = :value, { value: action.where[1] })
          .getOne();
          console.log(data, 'data')
      return data;
  }));
}`
}

export default parallelActionHandler;