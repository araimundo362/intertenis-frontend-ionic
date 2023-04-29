export type AlertProps = {
    isOpen: boolean,
    closeAlert: () => void,
    header: string,
    subHeader?: string,
    message: string,
    buttons: string[]
}