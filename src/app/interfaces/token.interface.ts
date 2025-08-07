export interface TokenDecode {
    header: {
        alg: string;
        typ: string;
    };
    payload: {
        authorities: string[];
        departamento: string;
        exp: number;
        iat: number;
        iss: string;
        legajo: string;
        sucursal: string;
        usuario: string;
    };
    signature: string;
}