const formatDate = (data: Date, delimiter: string) => {
    const today = new Date(data)

    const year = today.getFullYear()

    const month = `${today.getMonth() + 1}`.padStart(2, "0")

    const day = `${today.getDate()}`.padStart(2, "0")

    const stringDate = [day, month, year].join(delimiter)
    return stringDate;
}

const fieldDate = (data: Date, delimiter: string) => {
    const today = new Date(data)

    const year = today.getFullYear()

    const month = `${today.getMonth() + 1}`.padStart(2, "0")

    const day = `${today.getDate()}`.padStart(2, "0")

    const stringDate = [year, month, day].join(delimiter)
    return stringDate;
}



export {
    formatDate,
    fieldDate
}

