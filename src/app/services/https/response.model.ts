interface Res {
    data: object;
}
export interface Response {
    data: Res | [Res];
    message: string;
}
