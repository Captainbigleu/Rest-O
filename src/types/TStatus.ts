
/**
 * typage du status des réponses
 */
export type TStatus = 'OK' | 'FAILED'

/**
 * énumération du status
 */
export enum EStatus {
    OK = 'OK',
    FAILED = 'FAILED'
}

/**
 * typage des réponses
 */
export type TApiResponse = {
    status: EStatus,
    message: string,
    data: any
}