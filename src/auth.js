export function LogOutUser() {
    localStorage.removeItem('authuser')
    window.location.reload(false);
}