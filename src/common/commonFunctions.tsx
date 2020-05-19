const formatDate = (data: string, delimiter: string) => {
    let date = new Date(data);
    return date.getDate() + delimiter + date.getMonth() + 1 + delimiter + date.getFullYear()
}

export {
    formatDate
}

