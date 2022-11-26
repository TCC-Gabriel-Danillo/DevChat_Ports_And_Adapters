export enum ORDER {
    ASC = "asc", 
    DESC = "desc"
}
export enum OP {
    EQ = "==", 
    CONTAINS = "array-contains",
    IN = "in"
}
export interface FilterArgs {
    field: string; 
    op: OP; 
    value: any
}