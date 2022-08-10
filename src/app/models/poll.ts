export interface Poll{
    id?:number;
    name:string;
    finish:string;
    options:string | string[];
    token?:number;
    author?:number;
}