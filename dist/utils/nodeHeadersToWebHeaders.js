export function nodeHeadersToWebHeaders(headers) {
    const webHeaders = new Headers();
    for (const [key, value] of Object.entries(headers)) {
        if (!value)
            continue;
        if (Array.isArray(value)) {
            value.forEach(v => webHeaders.append(key, v));
        }
        else {
            webHeaders.set(key, value);
        }
    }
    return webHeaders;
}
//# sourceMappingURL=nodeHeadersToWebHeaders.js.map