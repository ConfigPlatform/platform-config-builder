import { IParallelAction } from "_config/config.handler";
import { TCreateActionHandler } from "./index";

const parallelActionHandler: TCreateActionHandler<IParallelAction> = (actions: {
    type: 'select',
    entityName: 'product' | 'client' | 'invoice' ,
    where: [string, string],
    assignVar: string,
  }[]) => {
    return {
        type: 'parallel',
        actions
    }
}

export default parallelActionHandler;