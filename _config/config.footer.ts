export interface IFooter {
  className: string;
  content: any[];
}

// footer config
const footer: IFooter = {
  className: 'fixed bottom-0 left-0 z-20 w-full max-w-screen flex flex-wrap flex-row p-2 bg-gray-50 border-gray-200',
  content: [ 
    {
      type: 'link',
      path: '/client',
      content: [
        {
          type: 'text',
          value: 'Clients',
          className:
            'block text-lg text-grey-900 py-2 px-3 hover:bg-gray-300 rounded',
        },
      ],
    },
  ],
};

export default footer;
