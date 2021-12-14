export interface Group {
    name: string;
    connections:Connection[];//pvdke on nije stavio ;
}

interface Connection {
    connectionId: string;
    username: string;
}