export const mockData = {
  board: {
    _id: 'board-id-02',
    title: 'FrontendDev React Board',
    description: 'React Development Project Board',
    type: 'private',
    ownerIds: ['user-id-01', 'user-id-02'],
    memberIds: ['user-id-01', 'user-id-02', 'user-id-03'],
    columnOrderIds: ['column-id-01', 'column-id-03', 'column-id-02'],
    columns: [
      {
        _id: 'column-id-01',
        boardId: 'board-id-02',
        title: 'Backlog Column 01',
        cardOrderIds: ['card-id-01', 'card-id-04', 'card-id-02', 'card-id-03'],
        cards: [
          {
            _id: 'card-id-01',
            boardId: 'board-id-02',
            columnId: 'column-id-01',
            title: 'Set up project structure',
            description: 'Create the basic React app structure and set up routing.',
            cover: 'https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D',
            memberIds: ['user-id-01'],
            comments: ['Looking forward to starting this!', 'Make sure to use the latest version of React.'],
            attachments: ['file-structure-setup.zip']
          },
          {
            _id: 'card-id-02',
            boardId: 'board-id-02',
            columnId: 'column-id-01',
            title: 'Design the UI',
            description: 'Work on the user interface design for the landing page.',
            cover: 'https://images.unsplash.com/photo-1542640244-7e672d6cef4e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Nnx8fGVufDB8fHx8fA%3D%3D',
            memberIds: ['user-id-02'],
            comments: [],
            attachments: ['ui-design.png']
          },
          {
            _id: 'card-id-03',
            boardId: 'board-id-02',
            columnId: 'column-id-01',
            title: 'Setup Redux',
            description: 'Integrate Redux for state management in the app.',
            cover: null,
            memberIds: ['user-id-03'],
            comments: ['Start with Redux toolkit for better scalability.'],
            attachments: ['redux-setup-guide.pdf']
          },
          {
            _id: 'card-id-04',
            boardId: 'board-id-02',
            columnId: 'column-id-01',
            title: 'Write unit tests',
            description: 'Write unit tests for the components using Jest.',
            cover: null,
            memberIds: ['user-id-01'],
            comments: ['Ensure to cover edge cases.'],
            attachments: []
          }
        ]
      },
      {
        _id: 'column-id-02',
        boardId: 'board-id-02',
        title: 'In Progress Column 02',
        cardOrderIds: ['card-id-05', 'card-id-06'],
        cards: [
          {
            _id: 'card-id-05',
            boardId: 'board-id-02',
            columnId: 'column-id-02',
            title: 'Connect to API',
            description: 'Set up API calls to fetch data from the server.',
            cover: 'https://images.unsplash.com/photo-1541753236788-b0ac1fc5009d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8N3x8fGVufDB8fHx8fA%3D%3D',
            memberIds: ['user-id-02'],
            comments: ['Check if the API uses authentication.'],
            attachments: ['api-connection-guide.pdf']
          },
          {
            _id: 'card-id-06',
            boardId: 'board-id-02',
            columnId: 'column-id-02',
            title: 'Fix mobile responsiveness',
            description: 'Ensure the app looks good on mobile devices.',
            cover: null,
            memberIds: [],
            comments: [],
            attachments: []
          }
        ]
      },
      {
        _id: 'column-id-03',
        boardId: 'board-id-02',
        title: 'Completed Column 03',
        cardOrderIds: ['card-id-07', 'card-id-08'],
        cards: [
          {
            _id: 'card-id-07',
            boardId: 'board-id-02',
            columnId: 'column-id-03',
            title: 'Deploy to production',
            description: 'Deploy the application to a production server.',
            cover: 'https://images.unsplash.com/photo-1542690970-7310221dbe09?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTN8fHxlbnwwfHx8fHw%3D',
            memberIds: ['user-id-01'],
            comments: ['Make sure to run a final QA before deployment.'],
            attachments: ['deployment-guide.pdf']
          },
          {
            _id: 'card-id-08',
            boardId: 'board-id-02',
            columnId: 'column-id-03',
            title: 'Documentation',
            description: 'Write documentation for the project.',
            cover: null,
            memberIds: ['user-id-02'],
            comments: [],
            attachments: ['documentation.zip']
          }
        ]
      }
    ]
  }
}