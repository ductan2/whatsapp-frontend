export type ErrorResponse = {
   message: string,
   status: number,
   path: string
}
export type initialStateType = {
   loading: boolean,
   error: ErrorResponse[],
   success: boolean
}
export type ListUserOnline = {
   user_id: string, socket_id: string
}
export type FileType = {
   file: File,
   type: string
   dataUrl: string
}
export type CallVideoType = {
   socket_id: string,
   receivingCall: boolean,
   callEnded: boolean,
   name: string,
   signal: string,
   avatar: string,
}