const { ApolloServer,gql} = require('apollo-server')

const typeDefs = gql`
    type Query {
    allBooks: [Book]
    getBook(isbn: String!): Book
    }
    type Book {
        title: String
        author: String
        year: Int!
        isbn:String!
    }
`;

const books = [
    {
        title: 'Webを支える技術 -HTTP、URI、HTML、そしてREST (WEB+DB PRESS plus)',
        author: "山本 陽平",
        year: 2010,
        isbn: "978-4774142043",
    },
    {
        title: '失敗から学ぶRDBの正しい歩き方 Software Design plus',
        author: "曽根 壮大",
        year: 2019,
        isbn: "978-4297104085",
    },
    {
        title: 'Vue.js入門 基礎から実践アプリケーション開発まで',
        author: "川口 和也, 喜多 啓介, 野田 陽平, 手島 拓也, 片山 真也",
        year: 2018,
        isbn: "978-4297100919",
    },
];

const resolvers = {
    Query: {
        allBooks: () => books,
        getBook: (_,args) => books.find(b => b.isbn == args.isbn),
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers
});

server.listen().then(({url}) => {
    console.log(`Server ready at ${url}`);
});