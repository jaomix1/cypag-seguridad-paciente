export class ResponseContract<T> {
    header: Header = new Header;
    data!: T;
}

export class Header {
    code: string | undefined;
    message: string | undefined;
    error: string | undefined;
}