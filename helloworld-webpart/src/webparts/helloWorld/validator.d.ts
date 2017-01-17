declare module "validator" {
    export function isEmail(email: string): boolean;
    export function isAscii(text: string): boolean;
}