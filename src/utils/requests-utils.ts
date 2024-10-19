export enum Methods {
    GET = 'GET',
    POST ='POST',
    PUT = 'PUT',
    DELETE ='DELETE'
}

export const isValid = (id: string) => {
    if (id.match(/^([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})$/)) {
        return true;
    } else {
        return false;
    }
}