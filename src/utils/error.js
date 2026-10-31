export class conflictError extends Error{
    constructor(status, messages){
        super()
        this.status=status
        this.message=messages
    }
}
export class NotFoundError extends Error{
    constructor(status, messages){
        super()
        this.status=status
        this.message=messages
    }
}
export class ValidationError extends Error{
    constructor(status, messages){
        super()
        this.status=status
        this.message=messages
    }
}
 export class IntervalServerError extends Error{
    constructor(status, messages){
        super()
        this.status=status
        this.message=messages
    }
}