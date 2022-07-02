export default {
    PORT: process.env.PORT || 8080,
    mongoRemote: {
        client: 'mongodb',
        cnxStr: 'mongodb+srv://hernancba:arenDaz2104@cluster0.y4ets.mongodb.net/?retryWrites=true&w=majority'
    },
    fileSystem: {
        path: './DB'
    }
}
