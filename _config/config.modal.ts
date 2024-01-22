export interface IModal {
  id: string;
  width: string;
  placement: 'top-left' | 'top-center' | 'top-right' | 'center-left' | 'center-top' | 'center-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
  content: any[];
}

const create_client_modal: IModal = {
  id: 'create_client',
  width: '30%',
  placement: 'top-right',
  content: [
    {
      type: 'text',
      className: 'text-xl text-gray-900 mb-4',
      value: 'Create Client',
    },
    {
      type: 'column',
      className: 'col-span-6',
      content: [
        {
          type: 'form',
          className: 'space-y-3',
          id: 'client_create_form',
          fields: [
            {
              name: 'firstName',
              label: 'First Name',
              type: 'string',
              required: true,
            },
            {
              name: 'lastName',
              label: 'Last Name',
              type: 'string',
              required: true,
            },
            {
              name: 'phone',
              label: 'Phone',
              type: 'number',
              required: true,
            },
          ],
          actions: [
            {
              type: 'button',
              htmlType: 'submit',
              label: 'Submit',
              className:
                'btn btn-primary btn btn-primary px-3 py-2 text-sm text-white duration-150 cursor-pointer bg-blue-700 rounded hover:bg-blue-900 active:shadow-lg',
              serverHandler: 'client_create_modal_submit',
            },
            {
              type: 'button',
              label: 'Cancel',
              className:
                'btn btn-primary px-3 py-2 text-sm text-gray-700 duration-100 cursor-pointer border rounded hover:border-indigo-600 active:shadow-lg',
              serverHandler: 'close_client_create_modal',
            },
          ],
        },
      ],
    },
  ],
};

const modals = [create_client_modal];

export default modals;
