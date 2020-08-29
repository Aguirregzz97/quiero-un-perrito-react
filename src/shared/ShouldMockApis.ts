export function shouldMockApis(): boolean {
    return window.location.host === 'localhost:8080'
}