export function pipeString(str: string) {
    if (str!=undefined)
        if (str.length > 35) {
            return str.substring(0, 20) + '...' + str.substring(str.length-10, str.length);
        }
    return str;
}
