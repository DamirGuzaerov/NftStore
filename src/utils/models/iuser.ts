export interface IUser {
    name: string | undefined,
    wallet: string,
    token: string,
    isLoading?: boolean,
    error?: string
}