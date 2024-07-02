function setItem(key: string, data: any) {
    localStorage.setItem(key, JSON.stringify(data));
};

function getItem(key: string) {
    const dataString = localStorage.getItem(key);
    return dataString ? JSON.parse(dataString) : null;
};

function removeItem(key: string) {
    localStorage.removeItem(key);
}

export { setItem, getItem, removeItem }